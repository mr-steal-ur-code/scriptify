import { SigninButtons } from "@/components/auth/SigninButtons";

export default async function SignInPage() {
	return (
		<div className="flex flex-col items-center my-auto">
			<section className="w-full max-w-md rounded-xl shadow p-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Welcome to Scriptify
				</h1>
				<p className="text-center mb-8 text-gray-400">
					Sign in to continue learning and mastering JavaScript
				</p>
				<SigninButtons />
			</section>
		</div>
	);
}
