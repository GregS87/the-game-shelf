import { db } from "./firebase";
import { 
    collection, 
    getDocs, 
    addDoc,
    query, 
    deleteDoc, 
    doc } from "firebase/firestore";

    export async function getGames(userId){
        const itemsref = collection(
            db,
            "users",
            userId,
            "items"
        );
        const q = query(itemsref);

        const snapshot = await getDocs(q);
        const items = [];

        snapshot.forEach((d) => {
            items.push({
                id: d.id,
                ...d.data(),
            });
        });

        return items;
    }

    export async function addGame(userId, game){
        const itemsRef = collection(
            db,
            "users",
            userId,
            "items"
        )
        const docRef = await addDoc(itemsRef, game);
        return docRef.id;
    }

    export async function deleteGame(userId, gameId){
        const docRef = doc(
            db,
            "users",
            userId,
            "items",
            gameId
        );
        await deleteDoc(docRef);
    }