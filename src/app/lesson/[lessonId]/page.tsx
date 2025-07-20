import ChallengeEditor from "@/components/ChallengeEditor";
import { prisma } from "@/lib/prisma";

export default async function LessonDetailPage({
	params,
}: {
	params: Promise<{ lessonId: string }>;
}) {
	const { lessonId } = await params;

	const lesson = await prisma.lesson.findUnique({
		where: { id: lessonId },
		include: {
			challenges: {
				orderBy: { order: "asc" },
				include: {
					testCases: true,
				},
			},
			track: true,
		},
	});

	if (!lesson) {
		return <p>Lesson not found</p>;
	}

	return (
		<main className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">{lesson?.title}</h1>
			<p className="mb-6">{lesson?.description}</p>

			{lesson.challenges.map((challenge) => (
				<ChallengeEditor key={challenge?.id} challenge={challenge} />
			))}
		</main>
	);
}
