"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

interface Props {
	initialUsers: User[];
	initialPagination: Pagination;
}

export default function UsersList({ initialUsers, initialPagination }: Props) {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [pagination, setPagination] = useState<Pagination>(initialPagination);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(pagination.page);

	const fetchUsers = async (newPage: number) => {
		setLoading(true);
		try {
			const res = await fetch(
				`/api/users?page=${newPage}&limit=${pagination.limit}`
			);
			const data = await res.json();
			setUsers(data.users);
			setPagination(data.pagination);
			setPage(newPage);
		} catch (error) {
			console.error("Failed to fetch users", error);
		}
		setLoading(false);
	};

	return (
		<>
			{loading && <p>Loading users...</p>}

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
								width={64}
								height={64}
								className="rounded-full mt-2"
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

			<div className="flex justify-between items-center mt-8">
				<button
					disabled={pagination.page <= 1 || loading}
					onClick={() => fetchUsers(page - 1)}
					className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
				>
					Previous
				</button>
				<p>
					Page {pagination.page} of {pagination.totalPages}
				</p>
				<button
					disabled={pagination.page >= pagination.totalPages || loading}
					onClick={() => fetchUsers(page + 1)}
					className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</>
	);
}
