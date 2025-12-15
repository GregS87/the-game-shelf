"use client";

import Link from "next/link";
import { useUserAuth } from "../_utils/hooks/useUserAuth";

export default function Page() {
    const {
        user,
        loading,
        gitHubSignIn,
        firebaseSignOut
    } = useUserAuth();

    const handleLogin = async () => {
        await gitHubSignIn();
    };

    const handleSignout = async () => {
        await firebaseSignOut();
    }

    if (loading) {
        return(
            <main className="min-h-screen flex items-center justify-center bg-black text-slate-100">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-slate-100 p-4">
            <div className="w-full max-w-md bg-slate-900 rounded-xl p-6 shadow-lg flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center mb-2">Welcome to The Game Shelf</h1>
                {user && (
                    <>
                    <p className="text-sm text-slate-300 text-center">
                        Sign in with your Github account to start tracking your game collection :D.
                    </p>
                    <button
                        type="button"
                        onClick ={handleLogin}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-md transition"
                        >Sign in with GitHub
                        </button>
                        </>
                )}

                {user && (
                    <>
                    <p className="text-sm text-slate-300 text-center">
                        Welcome, {user.email}!
                    </p>
                    <Link
                        href="/shelf"
                        className="w-full text-center bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-md transition"
                    >
                        Go to Your Shelf
                    </Link>
                    <button
                        type="button"
                        onClick ={handleSignout}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-md transition"
                        >Sign Out
                        </button>
                    </>
                )}

                {user && (
                    <>
                    <p className="text-sm text-slate-300 text-center">
                        Logout.
                    </p>
                    <button
                        type="button"
                        onClick ={handleSignout}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-md transition"
                        >Sign Out of GitHub
                        </button>
                        </>
                )}
            </div>
        
        </main>
    )
};