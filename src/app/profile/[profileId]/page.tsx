import { SignoutButton } from "@/components/auth/SignoutButton";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage({
	params,
}: {
	params: Promise<{ profileId: string }>;
}) {
	const { profileId } = await params;
	{
		const profile = await prisma.user.findUnique({
			where: { id: profileId },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		return (
			<div>
				<SignoutButton />
				<h1>{profile?.name}</h1>
			</div>
		);
	}
}
