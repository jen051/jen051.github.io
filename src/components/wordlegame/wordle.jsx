import React, { useState, useEffect } from 'react';
import './wordle.css';

const WORD_LENGTH = 5;

function getFeedback(guess, target) {
  const result = Array(WORD_LENGTH).fill('gray');
  const letterCount = {};

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = target[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
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

export default function WordleGame() {
  const [wordList, setWordList] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [letterStatuses, setLetterStatuses] = useState({});
  const [maxGuesses, setMaxGuesses] = useState(6);
  const [hardMode, setHardMode] = useState(false);
  const [revealedHints, setRevealedHints] = useState({ green: {}, yellow: new Set() });

  const startNewGame = (customMax = maxGuesses) => {
    if (wordList.length === 0) return;
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setError('');
    setStatus('playing');
    setMaxGuesses(customMax);
    setRevealedHints({ green: {}, yellow: new Set() });
    setLetterStatuses({});
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Enter' && status === 'playing') handleGuess();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, status]);

  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        const cleaned = text.replace(/^﻿/, '');
        const words = cleaned
          .split('\n')
          .map(w => w.trim().toUpperCase())
          .filter(w => w.length === 5 && /^[A-Z]+$/.test(w));
        setWordList(words);
        setTargetWord(words[Math.floor(Math.random() * words.length)]);
        setStatus('playing');
      })
      .catch(() => {
        setError('Failed to load word list.');
        setStatus('error');
      });
  }, []);

  const handleGuess = () => {
    const guess = currentGuess.toUpperCase();
    if (guess.length !== WORD_LENGTH || status !== 'playing') return;

    if (!wordList.includes(guess)) {
      setError('Not a valid word.');
      return;
    }

    if (hardMode) {
      for (const [pos, letter] of Object.entries(revealedHints.green)) {
        if (guess[+pos] !== letter) {
          setError(`Hard Mode: Must keep "${letter}" in position ${+pos + 1}`);
          return;
        }
      }
      for (const letter of revealedHints.yellow) {
        if (!guess.includes(letter)) {
          setError(`Hard Mode: Must reuse letter "${letter}"`);
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
      const letter = guess[i];
      const fb = feedback[i];
      if (fb === 'green') updatedGreen[i] = letter;
      else if (fb === 'yellow') updatedYellow.add(letter);
    }
    setRevealedHints({ green: updatedGreen, yellow: updatedYellow });
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>{error}</p>;

  return (
    <div className="wordle-container">
      <div className="controls">
        <label>
          Number of Guesses:
          <select
            value={maxGuesses}
            onChange={e => {
              const newMax = parseInt(e.target.value);
              setMaxGuesses(newMax);
              startNewGame(newMax);
            }}
          >
            {[4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={hardMode}
            onChange={e => setHardMode(e.target.checked)}
          />
          Hard Mode
        </label>
      </div>

      <div className="grid">
        {Array.from({ length: maxGuesses }).map((_, rowIdx) => {
          let rowLetters = Array(WORD_LENGTH).fill('');
          let rowFeedback = Array(WORD_LENGTH).fill(null);
          let isCurrentRow = rowIdx === guesses.length;
          let isPastRow = rowIdx < guesses.length;

          if (isPastRow) {
            rowLetters = guesses[rowIdx].guess.split('');
            rowFeedback = guesses[rowIdx].feedback;
          } else if (isCurrentRow) {
            rowLetters = currentGuess.padEnd(WORD_LENGTH).split('');
          }

          return (
            <div className="row" key={rowIdx}>
              {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => {
                const char = rowLetters[colIdx] || '';
                const status = rowFeedback[colIdx];

                let cellClass = 'tile';
                if (status) cellClass += ` ${status}`;
                else if (isCurrentRow && char !== '') cellClass += ' active';

                return (
                  <div key={colIdx} className={cellClass}>{char}</div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="keyboard">
        {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, r) => (
          <div className="keyboard-row" key={r}>
            {row.split('').map(letter => (
              <button
                key={letter}
                className={`key ${letterStatuses[letter] || ''}`}
                onClick={() => {
                  if (status !== 'playing') return;
                  if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess(prev => prev + letter);
                  }
                }}
              >
                {letter}
              </button>
            ))}
            {r === 2 && (
              <>
                <button className="key back" onClick={() => {
                  if (status !== 'playing') return;
                  setCurrentGuess(prev => prev.slice(0, -1));
                }}>⌫</button>
              </>
            )}
          </div>
        ))}
      </div>

      {status === 'playing' && (
        <div className="manual-input">
          <input
            type="text"
            value={currentGuess}
            onChange={e => setCurrentGuess(e.target.value.toUpperCase())}
            maxLength={WORD_LENGTH}
            placeholder="Enter guess"
          />
          <button onClick={handleGuess}>Submit</button>
          {error && <div className="error">{error}</div>}
        </div>
      )}

      {status !== 'playing' && (
        <div className="game-end">
          <p>{status === 'won' ? '🎉 You won!' : `💀 Game Over! Word was: ${targetWord}`}</p>
          <button onClick={() => startNewGame()}>New Game</button>
        </div>
      )}
    </div>
  );
}
