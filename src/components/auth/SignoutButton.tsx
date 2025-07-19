"use client";

import { signOut } from "next-auth/react";

export function SignoutButton() {
	return (
		<button
			onClick={() => signOut({ callbackUrl: "/signin" })}
			className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
		>
			Sign out
		</button>
	);
}
