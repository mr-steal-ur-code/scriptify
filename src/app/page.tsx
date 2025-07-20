import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
	const tracks = await prisma.track.findMany({
		orderBy: { order: "asc" },
	});

	return (
		<main className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">All Tracks</h1>
			<div className="grid md:grid-cols-2 gap-6">
				{tracks.map((track) => (
					<div
						key={track?.id}
						className="p-6 border rounded shadow hover:shadow-lg transition"
					>
						<h2 className="text-xl font-semibold mb-2">{track?.name}</h2>
						<p className="mb-4">{track?.description}</p>
						<Link
							href={`/track/${track?.id}`}
							className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						>
							View Lessons
						</Link>
					</div>
				))}
			</div>
		</main>
	);
}
