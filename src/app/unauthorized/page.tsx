import Link from "next/link";

export default function Unauthorized() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
			<h1 className="text-6xl font-extrabold text-red-600 dark:text-red-400 mb-6">
				403
			</h1>
			<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
				Unauthorized Access
			</h2>
			<p className="mb-8 max-w-md text-gray-700 dark:text-gray-300">
				Sorry, you don’t have permission to view this page. Please sign in with
				an account that has access.
			</p>
			<div className="flex gap-4">
				<Link
					href="/"
					className="rounded-md bg-gray-200 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
				>
					Go to Home
				</Link>
			</div>
		</main>
	);
}
