"use client";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const providerLogos: Record<string, string> = {
	github: "/icons/github.svg",
	google: "/icons/google.svg",
};

export function SigninButtons() {
	const [providers, setProviders] = useState<Record<
		string,
		ClientSafeProvider
	> | null>(null);

	useEffect(() => {
		getProviders().then(setProviders);
	}, []);

	if (!providers)
		return (
			<div className="flex justify-center items-center py-8">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
			</div>
		);
	return (
		<div className="flex flex-col gap-4">
			{Object.values(providers).map((provider) => (
				<button
					key={provider?.id}
					onClick={() => signIn(provider?.id, { callbackUrl: "/" })}
					type="button"
					aria-label={`Sign in with ${provider?.name}`}
					className={`cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 rounded-md font-semibold transition-colors duration-200 ${
						provider?.id === "github"
							? "bg-slate-800 hover:bg-slate-700 text-white"
							: provider?.id === "google"
							? "bg-blue-600 hover:bg-blue-500 text-white"
							: "bg-gray-300 hover:bg-gray-400 text-gray-900"
					}`}
				>
					<Image
						src={providerLogos[provider?.id] || "/icons/default.svg"}
						alt={`${provider?.name} logo`}
						width={24}
						height={24}
						className="inline-block"
					/>
					<span>Sign in with {provider?.name}</span>
				</button>
			))}
		</div>
	);
}
