"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type User = {
	id: string;
	name: string | null;
	email: string;
	image?: string | null;
	createdAt: string;
};

type Pagination = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

export default function AdminUsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [pagination, setPagination] = useState<Pagination | null>(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/users?page=${page}&limit=5`);
				const data = await res.json();
				setUsers(data.users);
				setPagination(data.pagination);
			} catch (error) {
				console.error("Failed to fetch users", error);
			}
			setLoading(false);
		};

		fetchUsers();
	}, [page]);

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Manage Users</h1>

			{loading ? (
				<p>Loading users...</p>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{users.map((user) => (
							<div
								key={user.id}
								className="border rounded-lg p-4 shadow hover:shadow-md transition"
							>
								<h2 className="text-xl font-semibold">
									{user.name ?? "Unnamed User"}
								</h2>
								<p className="text-gray-600">{user.email}</p>
								<p className="text-sm text-gray-500">
									Created: {new Date(user.createdAt).toLocaleDateString()}
								</p>
								{user.image && (
									<Image
										src={user.image}
										alt={user.name ?? "User"}
										className="w-16 h-16 rounded-full mt-2"
									/>
								)}
								<Link
									href={`/admin/users/${user.id}`}
									className="inline-block mt-3 text-blue-600 hover:underline"
								>
									View Details
								</Link>
							</div>
						))}
					</div>

					{/* Pagination controls */}
					{pagination && (
						<div className="flex justify-between items-center mt-8">
							<button
								disabled={pagination.page <= 1}
								onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
								className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
							>
								Previous
							</button>
							<p>
								Page {pagination.page} of {pagination.totalPages}
							</p>
							<button
								disabled={pagination.page >= pagination.totalPages}
								onClick={() => setPage((prev) => prev + 1)}
								className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
