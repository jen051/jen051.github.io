// WordleGame.jsx (cleaned + multiplayer support + opponent grid)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from './multiplayer'
const WORD_LENGTH = 5;

function getFeedback(guess, target) {
  const result = Array(WORD_LENGTH).fill('gray');
  const letterCount = {};

  for (let i = 0; i < WORD_LENGTH; i++) {
    letterCount[target[i]] = (letterCount[target[i]] || 0) + 1;
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === target[i]) {
      result[i] = 'green';
      letterCount[guess[i]]--;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'gray' && letterCount[guess[i]] > 0) {
      result[i] = 'yellow';
      letterCount[guess[i]]--;
    }
  }

  return result;
}

export default function WordleGame({
  multiplayer = false,
  roomId = null,
  role = null,
  targetWord: externalTargetWord = '',
  maxGuesses: externalMaxGuesses = 6,
  hardMode = false,
  onGuessCountUpdate = () => { },
  opponentGuessCount = 0
}) {

  const [wordList, setWordList] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [letterStatuses, setLetterStatuses] = useState({});
  const [maxGuesses, setMaxGuesses] = useState(externalMaxGuesses);
  const [revealedHints, setRevealedHints] = useState({ green: {}, yellow: new Set() });
  const navigate = useNavigate();
  const startNewGame = (word) => {
    setTargetWord(word);
    setGuesses([]);
    setCurrentGuess('');
    setError('');
    setStatus('playing');
    setRevealedHints({ green: {}, yellow: new Set() });
    setLetterStatuses({});
  };

  useEffect(() => {
    if (multiplayer) {
      startNewGame(externalTargetWord);
      setMaxGuesses(externalMaxGuesses);
      setStatus('playing');
    } else {
      fetch('/words.txt')
        .then(res => res.text())
        .then(text => {
          const words = text
            .replace(/^﻿/, '')
            .split('\n')
            .map(w => w.trim().toUpperCase())
            .filter(w => w.length === 5 && /^[A-Z]+$/.test(w));
          setWordList(words);
          const randomWord = words[Math.floor(Math.random() * words.length)];
          startNewGame(randomWord);
        })
        .catch(() => {
          setError('Failed to load word list.');
          setStatus('error');
        });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && status === 'playing') handleGuess();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, status]);

  const handleGuess = () => {
    const guess = currentGuess.toUpperCase();
    if (guess.length !== WORD_LENGTH || status !== 'playing') return;
    if (!multiplayer && !wordList.includes(guess)) {
      setError('Not a valid word.');
      return;
    }

    if (hardMode) {
      for (const [pos, letter] of Object.entries(revealedHints.green)) {
        if (guess[+pos] !== letter) {
          setError(`Must keep "${letter}" in position ${+pos + 1}`);
          return;
        }
      }
      for (const letter of revealedHints.yellow) {
        if (!guess.includes(letter)) {
          setError(`Must reuse letter "${letter}"`);
          return;
        }
      }
    }

    setError('');
    const feedback = getFeedback(guess, targetWord);
    const updatedStatuses = { ...letterStatuses };

    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const color = feedback[i];
      const current = updatedStatuses[letter];
      if (
        color === 'green' ||
        (color === 'yellow' && current !== 'green') ||
        (color === 'gray' && !current)
      ) {
        updatedStatuses[letter] = color;
      }
    }

    setLetterStatuses(updatedStatuses);
    const newGuesses = [...guesses, { guess, feedback }];
    setGuesses(newGuesses);
    setCurrentGuess('');
    if (guess === targetWord) setStatus('won');
    else if (newGuesses.length >= maxGuesses) setStatus('lost');

    const updatedGreen = { ...revealedHints.green };
    const updatedYellow = new Set(revealedHints.yellow);
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (feedback[i] === 'green') updatedGreen[i] = guess[i];
      else if (feedback[i] === 'yellow') updatedYellow.add(guess[i]);
    }
    setRevealedHints({ green: updatedGreen, yellow: updatedYellow });
    onGuessCountUpdate(newGuesses.length);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>{error}</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Wordle Clone</h2>
      <p style={{ opacity: 0.6 }}>{multiplayer ? `Room: ${roomId}` : ''}</p>

      <div style={{ display: multiplayer ? 'flex' : 'block', justifyContent: 'center', gap: '48px' }}>
        {/* Main player grid */}
        <div>
          {Array.from({ length: maxGuesses }).map((_, rowIdx) => {
            let rowLetters = Array(WORD_LENGTH).fill('');
            let rowFeedback = Array(WORD_LENGTH).fill(null);
            const isCurrentRow = rowIdx === guesses.length;
            const isPastRow = rowIdx < guesses.length;

            if (isPastRow) {
              rowLetters = guesses[rowIdx].guess.split('');
              rowFeedback = guesses[rowIdx].feedback;
            } else if (isCurrentRow) {
              rowLetters = currentGuess.padEnd(WORD_LENGTH).split('');
            }

            return (
              <div key={rowIdx} style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                {rowLetters.map((char, colIdx) => {
                  const status = rowFeedback[colIdx];
                  let bgColor = '#fff', borderColor = '#aaa', textColor = 'black';
                  if (status === 'green') [bgColor, textColor, borderColor] = ['green', 'white', 'green'];
                  else if (status === 'yellow') [bgColor, textColor, borderColor] = ['goldenrod', 'white', 'goldenrod'];
                  else if (status === 'gray') [bgColor, textColor, borderColor] = ['#444', 'white', '#444'];
                  else if (isCurrentRow && char !== '') bgColor = '#eee';

                  return (
                    <div key={colIdx} style={{
                      width: '48px', height: '48px', margin: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '24px', fontWeight: 'bold', backgroundColor: bgColor, color: textColor,
                      border: `2px solid ${borderColor}`, borderRadius: '4px', textTransform: 'uppercase'
                    }}>{char}</div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Opponent grid (shadow only) */}
        {multiplayer && (
          <div>
            <h4 style={{ marginBottom: '4px', opacity: 0.7 }}>Opponent</h4>
            {Array.from({ length: maxGuesses }).map((_, rowIdx) => (
              <div key={rowIdx} style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', opacity: rowIdx < opponentGuessCount ? 1 : 0.2 }}>
                {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => (
                  <div key={colIdx} style={{
                    width: '32px', height: '32px', margin: '2px', borderRadius: '4px',
                    border: '2px solid #bbb', backgroundColor: rowIdx < opponentGuessCount ? '#999' : 'transparent'
                  }}></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>


      {status === 'playing' && (
        <div style={{ marginTop: '12px' }}>
          <input
            type="text"
            value={currentGuess}
            onChange={e => setCurrentGuess(e.target.value.toUpperCase())}
            maxLength={WORD_LENGTH}
            placeholder="Enter guess"
            style={{ textTransform: 'uppercase', padding: '8px', width: '120px' }}
          />
          <button onClick={handleGuess} style={{ marginLeft: '8px', padding: '8px 16px', cursor: 'pointer' }}>
            Submit
          </button>
          {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
        </div>
      )}

      {status !== 'playing' && (
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontWeight: 'bold' }}>
            {status === 'won' ? '🎉 You won!' : `💀 Game Over! Word was: ${targetWord}`}
          </p>
          {!multiplayer && (
            <button onClick={() => startNewGame(wordList[Math.floor(Math.random() * wordList.length)])} style={{
              marginTop: '12px', padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'
            }}>
              New Game
            </button>
          )}
        </div>
      )}

      {!multiplayer && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={async () => {
              const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
              const roomId = await createRoom(randomWord);
              navigate(`/multiplayer/${roomId}`);
            }}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Enable Multiplayer Mode
          </button>
        </div>
      )}
    </div>
  );
}
