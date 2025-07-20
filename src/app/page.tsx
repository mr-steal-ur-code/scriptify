import { TrackCard } from "@/components/TrackCard";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	const userId = session?.user.id;

	const tracks = await prisma.track.findMany({
		orderBy: { order: "asc" },
		include: {
			_count: {
				select: {
					lessons: true,
					challenges: true,
				},
			},
			users: {
				where: {
					id: userId,
				},
			},
		},
	});

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">All Tracks</h1>
			<div className="grid md:grid-cols-2 gap-6">
				{tracks.map((track) => (
					<TrackCard
						track={{
							...track,
							count: {
								lessons: track?._count?.lessons,
								challenges: track?._count?.challenges,
							},
							users: track?.users,
						}}
						key={track?.id}
					/>
				))}
			</div>
		</div>
	);
}
