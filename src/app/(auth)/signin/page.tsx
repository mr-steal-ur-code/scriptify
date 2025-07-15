import { getProviders } from "next-auth/react";
import { LoginButtons } from "@/components/auth/LoginButtons";

export default async function SignInPage() {
	const providers = (await getProviders()) || {};

	return (
		<div className="flex flex-col items-center my-auto">
			<section className="w-full max-w-md rounded-xl shadow p-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Welcome to Scriptify
				</h1>
				<p className="text-center mb-8 text-gray-600">
					Sign in to continue learning and mastering JavaScript
				</p>
				<LoginButtons providers={providers} />
			</section>
		</div>
	);
}
