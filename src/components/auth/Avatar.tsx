import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function Avatar() {
	const session = await getServerSession(authOptions);

	if (session?.user) {
		return (
			<Link
				href={`/profile/${session?.user?.id}`}
				className="flex items-center gap-2"
			>
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
