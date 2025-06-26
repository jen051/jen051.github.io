import { db } from '../../firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

export async function createRoom(targetWord, settings = { maxGuesses: 6, hardMode: false }) {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  const roomRef = doc(collection(db, 'rooms'), roomId);

  await setDoc(roomRef, {
    targetWord,
    maxGuesses: settings.maxGuesses,
    hardMode: settings.hardMode,
    players: {
      player1: { guesses: 0, finished: false }
    }
  });

  return roomId;
}

export async function joinRoom(roomId) {
  const roomRef = doc(db, 'rooms', roomId);
  const snap = await getDoc(roomRef);
  if (!snap.exists()) throw new Error('Room does not exist');
  return { roomCode: roomId, data: snap.data() };
}