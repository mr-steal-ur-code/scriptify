import Link from "next/link";

export default function AdminDashboardPage() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="border rounded-lg p-6 shadow hover:shadow-md transition">
					<h2 className="text-xl font-semibold mb-2">Manage Users</h2>
					<p className="mb-4 text-gray-600">
						View and manage all application users.
					</p>
					<Link
						href="/admin/users"
						className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					>
						Go to Users
					</Link>
				</div>

				<div className="border rounded-lg p-6 shadow opacity-50 cursor-not-allowed">
					<h2 className="text-xl font-semibold mb-2">Analytics</h2>
					<p className="text-gray-600">Coming soon...</p>
				</div>

				<div className="border rounded-lg p-6 shadow opacity-50 cursor-not-allowed">
					<h2 className="text-xl font-semibold mb-2">Settings</h2>
					<p className="text-gray-600">Coming soon...</p>
				</div>
			</div>
		</div>
	);
}
