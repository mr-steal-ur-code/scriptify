"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
	const [providers, setProviders] = useState<any>(null);

	useEffect(() => {
		const setUpProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setUpProviders();
	}, []);

	if (!providers) {
		return <p>Loading...</p>;
	}

	return (
		<div className="p-8 text-center">
			<h1 className="text-2xl mb-4">Sign in to your account</h1>
			{Object.values(providers).map((provider: any) => (
				<div key={provider.name} className="mb-2">
					<button
						onClick={() => signIn(provider.id)}
						className="px-4 py-2 bg-black text-white rounded"
					>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}
