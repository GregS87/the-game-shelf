import { db } from "./firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// Each document in "users/{userId}/items" is one game on that user's shelf.
function userItemsCollection(userId) {
  return collection(db, "users", userId, "items");
}

export async function getGames(userId) {
  const snapshot = await getDocs(userItemsCollection(userId));
  const games = [];
  snapshot.forEach((docSnap) => {
    games.push({ id: docSnap.id, ...docSnap.data() });
  });
  return games;
}

export async function addGame(userId, game) {
  const docRef = await addDoc(userItemsCollection(userId), game);
  return docRef.id;
}

export async function removeGame(userId, gameId) {
  const gameDocRef = doc(db, "users", userId, "items", gameId);
  await deleteDoc(gameDocRef);
}