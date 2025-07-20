import Link from "next/link";
import React from "react";
import { BadgeCheck, BookOpen, Puzzle } from "lucide-react";
import { Track } from "@prisma/client";

type Paradigm =
	| "declarative"
	| "functional"
	| "imperative"
	| "logic"
	| "object_oriented"
	| "procedural";

type TrackWithCountsAndUser = Track & {
	count: {
		lessons: number;
		challenges: number;
	};
	users: { id: string }[];
};

type TrackCardProps = {
	track: TrackWithCountsAndUser;
};

const paradigmLabels: Record<Paradigm, string> = {
	declarative: "Declarative",
	functional: "Functional",
	imperative: "Imperative",
	logic: "Logic",
	object_oriented: "Object-Oriented",
	procedural: "Procedural",
};

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
	const isInUserProfile = track?.users?.length > 0;

	return (
		<Link
			href={`/track/${track.id}`}
			className="
        block rounded-2xl shadow-md p-5 bg-white dark:bg-gray-900
        hover:shadow-lg transition
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        "
			aria-label={`View track: ${track.name}`}
		>
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">{track.name}</h2>
				{isInUserProfile && (
					<div className="flex items-center gap-1 text-green-600 text-sm font-medium">
						<BadgeCheck size={16} />
						<span>In your profile</span>
					</div>
				)}
			</div>

			{track.description && (
				<p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
					{track.description}
				</p>
			)}

			<div className="flex flex-wrap gap-2 mt-4">
				{track.paradigms.map((p) => (
					<span
						key={p}
						className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 text-xs rounded-full"
					>
						{paradigmLabels[p]}
					</span>
				))}
			</div>

			<div className="flex gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
				<div className="flex items-center gap-1">
					<BookOpen size={16} /> {track.count.lessons} lessons
				</div>
				<div className="flex items-center gap-1">
					<Puzzle size={16} /> {track.count.challenges} challenges
				</div>
			</div>
		</Link>
	);
};
