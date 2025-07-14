"use client";

import { signIn } from "next-auth/react";

export function LoginButtons() {
	return (
		<div className="flex flex-col gap-2">
			<button
				onClick={() => signIn("github")}
				className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
			>
				Sign in with GitHub
			</button>
			<button
				onClick={() => signIn("google")}
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Sign in with Google
			</button>
		</div>
	);
}
