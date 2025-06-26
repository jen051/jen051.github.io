// MultiplayerPage.jsx (real-time opponent guess sync)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import WordleGame from './wordle';

export default function MultiplayerPage() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [myGuesses, setMyGuesses] = useState([]);
  const [opponentGuessCount, setOpponentGuessCount] = useState(0);

  const userId = window.localStorage.getItem('wordle-user-id') || crypto.randomUUID();

  useEffect(() => {
    window.localStorage.setItem('wordle-user-id', userId);
  }, [userId]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'rooms', roomId), (docSnap) => {
      const data = docSnap.data();
      if (!data) return;

      setRoomData(data);
      const myGuesses = data[userId]?.guesses || [];
      setMyGuesses(myGuesses);

      const otherPlayerId = Object.keys(data).find(k => k !== userId && data[k]?.guesses);
      const otherGuesses = otherPlayerId ? data[otherPlayerId].guesses : [];
      setOpponentGuessCount(otherGuesses.length);
    });

    return () => unsub();
  }, [roomId, userId]);

  const handleGuessUpdate = async (count) => {
    const roomRef = doc(db, 'rooms', roomId);
    const guessArray = Array(count).fill('PLACEHOLDER'); // Replace with real guesses if desired
    await updateDoc(roomRef, {
      [`${userId}.guesses`]: guessArray
    });
  };

  if (!roomData) return <p>Loading room...</p>;

  return (
    <WordleGame
      multiplayer={true}
      roomId={roomId}
      role="player"
      targetWord={roomData.targetWord}
      maxGuesses={roomData.maxGuesses || 6}
      opponentGuessCount={opponentGuessCount}
      onGuessCountUpdate={handleGuessUpdate}
    />
  );
}
