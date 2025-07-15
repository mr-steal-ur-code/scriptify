"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function Avatar() {
	const { data: session } = useSession();

	if (session?.user) {
		return (
			<Link href="/profile" className="flex items-center gap-2">
				<Image
					width={48}
					height={48}
					src={session.user.image ?? "/default-avatar.png"}
					alt={session.user.name ?? "User"}
					className="w-12 h-12 rounded-full"
				/>
			</Link>
		);
	}

	return (
		<Link
			href="/signin"
			className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
		>
			Sign in
		</Link>
	);
}
