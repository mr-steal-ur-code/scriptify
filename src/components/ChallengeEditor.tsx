"use client";

import { Challenge, TestCase } from "@prisma/client";
import { useState } from "react";

interface ChallengeEditorProps {
	challenge: Challenge & { testCases: TestCase[] };
}
export default function ChallengeEditor({ challenge }: ChallengeEditorProps) {
	const [code, setCode] = useState(challenge.starterCode || "");

	const handleRun = () => {
		alert("Run code feature not implemented");
	};

	return (
		<main className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
			<p className="mb-6 whitespace-pre-line">{challenge.prompt}</p>

			<textarea
				className="w-full h-64 p-4 border rounded font-mono text-sm mb-4"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>

			<button
				className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
				onClick={handleRun}
			>
				Run Code
			</button>
		</main>
	);
}
