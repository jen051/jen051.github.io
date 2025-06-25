import React, { useState, useEffect } from 'react';

const maxGuesses = 6;
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
  const [maxGuesses, setMaxGuesses] = useState(6); // default 6
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
        const cleaned = text.replace(/^\uFEFF/, ''); // remove BOM if present
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
      // Must reuse green letters in exact positions
      for (const [pos, letter] of Object.entries(revealedHints.green)) {
        if (guess[+pos] !== letter) {
          setError(`Hard Mode: Must keep "${letter}" in position ${+pos + 1}`);
          return;
        }
      }

      // Must include all yellow letters somewhere
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

    if (guess === targetWord) {
      setStatus('won');
    } else if (newGuesses.length >= maxGuesses) {
      setStatus('lost');
    }

    const updatedGreen = { ...revealedHints.green };
    const updatedYellow = new Set(revealedHints.yellow);

    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const fb = feedback[i];
      if (fb === 'green') {
        updatedGreen[i] = letter; // exact position
      } else if (fb === 'yellow') {
        updatedYellow.add(letter); // somewhere in guess
      }
    }

    setRevealedHints({ green: updatedGreen, yellow: updatedYellow });

  };


  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>{error}</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Wordle Clone</h2>

      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <label htmlFor="guessLimit" style={{ marginRight: '8px', fontWeight: 'bold' }}>
          Number of Guesses:
        </label>
        <select
          id="guessLimit"
          value={maxGuesses}
          onChange={e => {
            const newMax = parseInt(e.target.value);
            setMaxGuesses(newMax);
            startNewGame(newMax);
          }}
          style={{ padding: '6px 10px' }}
        >
          {[4, 5, 6, 7, 8, 9, 10].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <label htmlFor="hardModeToggle" style={{ fontWeight: 'bold' }}>
          <input
            id="hardModeToggle"
            type="checkbox"
            checked={hardMode}
            onChange={(e) => setHardMode(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Hard Mode (must reuse green/yellow letters)
        </label>
      </div>



      <div style={{ marginTop: '20px' }}>
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
            <div
              key={rowIdx}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '6px'
              }}
            >
              {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => {
                const char = rowLetters[colIdx] || '';
                const status = rowFeedback[colIdx];

                let bgColor = '#fff';
                let borderColor = '#aaa';
                let textColor = 'black';

                if (status === 'green') {
                  bgColor = 'green';
                  textColor = 'white';
                  borderColor = 'green';
                } else if (status === 'yellow') {
                  bgColor = 'goldenrod';
                  textColor = 'white';
                  borderColor = 'goldenrod';
                } else if (status === 'gray') {
                  bgColor = '#444';
                  textColor = 'white';
                  borderColor = '#444';
                } else if (isCurrentRow && char !== '') {
                  bgColor = '#eee';
                }

                return (
                  <div
                    key={colIdx}
                    style={{
                      width: '48px',
                      height: '48px',
                      margin: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      backgroundColor: bgColor,
                      color: textColor,
                      border: `2px solid ${borderColor}`,
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px' }}>
        {['QWERTYUIOP', 'ASDFGHJKL'].map((row, r) => (
          <div key={r} style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
            {row.split('').map(letter => (
              <button
                key={letter}
                onClick={() => {
                  if (status !== 'playing') return;
                  if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess(prev => prev + letter);
                  }
                }}
                style={{
                  width: '32px',
                  height: '40px',
                  margin: '2px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  backgroundColor:
                    letterStatuses[letter] === 'green'
                      ? 'green'
                      : letterStatuses[letter] === 'yellow'
                        ? 'goldenrod'
                        : letterStatuses[letter] === 'gray'
                          ? '#444'
                          : '#ccc',
                  color: letterStatuses[letter] ? 'white' : 'black',
                  border: 'none',
                  cursor: status === 'playing' ? 'pointer' : 'not-allowed'
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}

        {/* Final row: Z to M + ⌫ + Enter */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          {'ZXCVBNM'.split('').map(letter => (
            <button
              key={letter}
              onClick={() => {
                if (status !== 'playing') return;
                if (currentGuess.length < WORD_LENGTH) {
                  setCurrentGuess(prev => prev + letter);
                }
              }}
              style={{
                width: '32px',
                height: '40px',
                margin: '2px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderRadius: '4px',
                backgroundColor:
                  letterStatuses[letter] === 'green'
                    ? 'green'
                    : letterStatuses[letter] === 'yellow'
                      ? 'goldenrod'
                      : letterStatuses[letter] === 'gray'
                        ? '#444'
                        : '#ccc',
                color: letterStatuses[letter] ? 'white' : 'black',
                border: 'none',
                cursor: status === 'playing' ? 'pointer' : 'not-allowed'
              }}
            >
              {letter}
            </button>
          ))}

          {/* Backspace */}
          <button
            onClick={() => {
              if (status !== 'playing') return;
              setCurrentGuess(prev => prev.slice(0, -1));
            }}
            style={{
              width: '60px',
              height: '40px',
              margin: '2px',
              fontWeight: 'bold',
              borderRadius: '4px',
              backgroundColor: '#999',
              color: 'white',
              border: 'none',
              cursor: status === 'playing' ? 'pointer' : 'not-allowed'
            }}
          >
            ⌫
          </button>
        </div>
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
          <button
            onClick={handleGuess}
            style={{ marginLeft: '8px', padding: '8px 16px', cursor: 'pointer' }}
          >
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
          <button
            onClick={() => startNewGame()}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
