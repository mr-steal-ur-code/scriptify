import ChallengeEditor from "@/components/ChallengeEditor";
import { prisma } from "@/lib/prisma";

export default async function ChallengePage({
	params,
}: {
	params: Promise<{ challengeId: string }>;
}) {
	const { challengeId } = await params;
	const challenge = await prisma.challenge.findUnique({
		where: { id: challengeId },
		include: { testCases: true },
	});

	if (!challenge) {
		return <div className="p-6">Challenge not found.</div>;
	}

	return <ChallengeEditor challenge={challenge} />;
}
