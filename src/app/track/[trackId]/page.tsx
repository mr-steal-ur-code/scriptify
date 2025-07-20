import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export const revalidate = 0;

export default async function TrackPage({
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
		<div className="container mx-auto p-6">
			<h1 className="text-4xl font-bold mb-6">{track.name}</h1>

			{track.description && (
				<p className="mb-8 text-gray-700 dark:text-gray-300 max-w-3xl">
					{track.description}
				</p>
			)}

			<div className="space-y-8">
				{track.lessons.map((lesson) => (
					<section
						key={lesson.id}
						className="bg-white dark:bg-gray-900 rounded-lg shadow p-6"
					>
						<h2 className="text-2xl font-semibold mb-3">{lesson.title}</h2>
						{lesson.description && (
							<p className="mb-4 text-gray-600 dark:text-gray-400">
								{lesson.description}
							</p>
						)}

						<p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
							{lesson.challenges.length} challenge
							{lesson.challenges.length !== 1 ? "s" : ""}
						</p>

						<ul className="space-y-3">
							{lesson.challenges.map((challenge) => (
								<li key={challenge.id}>
									<Link
										href={`/challenge/${challenge.id}`}
										className="block px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                    hover:bg-blue-50 dark:hover:bg-blue-800
                    transition
                    "
									>
										<div className="flex justify-between items-center">
											<span className="font-medium">{challenge.title}</span>
											<span
												className={`
                          text-xs font-semibold px-2 py-1 rounded-full
                          ${
														challenge.difficulty === "easy"
															? "bg-green-100 text-green-800"
															: challenge.difficulty === "medium"
															? "bg-yellow-100 text-yellow-800"
															: "bg-red-100 text-red-800"
													}
                        `}
											>
												{challenge.difficulty}
											</span>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	);
}
