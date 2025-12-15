"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900 text-slate-100 rounded-2xl px-10 py-8 shadow-xl text-center max-w-xl w-[480px]">
        <h1 className="text-3xl font-bold mb-3">The Game Shelf</h1>

        {!user && (
          <>
            <p className="mb-6 text-slate-300">
              Sign in and keep a simple list of the games you own.
            </p>
            <button
              type="button"
              onClick={handleLogin}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-semibold text-white hover:bg-orange-500 transition w-full"
            >
              Sign in with GitHub
            </button>
          </>
        )}

        {user && (
          <>
            <p className="mt-2 text-sm text-slate-300">
              Signed in as {user.displayName || user.email}
            </p>

            <div className="mt-6 flex flex-col gap-3 items-center">
              <Link
                href="/games"
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-semibold text-white hover:bg-orange-500 transition w-full"
              >
                Go to my game shelf
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md border border-slate-500 px-5 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 transition w-full"
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}