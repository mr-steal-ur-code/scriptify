"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignupPage() {
	const [providers, setProviders] = useState<any>(null);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		fetchProviders();
	}, []);

	if (!providers) {
		return <p>Loading...</p>;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6">
			<h1 className="text-2xl mb-4 font-bold">Create your account</h1>
			<p className="mb-6 text-gray-600">Choose a provider to get started:</p>

			{Object.values(providers).map((provider: any) => (
				<button
					key={provider.name}
					onClick={() => signIn(provider.id)}
					className="w-full max-w-xs mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					Sign up with {provider.name}
				</button>
			))}
		</div>
	);
}
