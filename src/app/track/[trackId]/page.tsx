import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export const revalidate = 0;

export default async function LessonPage({
	params,
}: {
	params: Promise<{ trackId: string }>;
}) {
	const { trackId } = await params;

	const track = await prisma.track.findUnique({
		where: { id: trackId },
		include: {
			lessons: {
				orderBy: { order: "asc" },
				include: {
					challenges: {
						orderBy: { order: "asc" },
					},
				},
			},
		},
	});

	if (!track) {
		return <p className="container mx-auto p-6">Track not found.</p>;
	}

	return (
		<main className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">{track?.name}</h1>

			<ul className="space-y-6">
				{track?.lessons?.map?.((lesson) => (
					<li key={lesson.id} className="border p-4 rounded shadow">
						<h2 className="text-xl font-semibold mb-2">{lesson?.title}</h2>
						<p className="mb-2">{lesson?.description}</p>

						<Link
							href={`/lesson/${lesson?.id}`}
							className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						>
							View Lesson
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
