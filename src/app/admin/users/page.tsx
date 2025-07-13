import UsersList from "./UsersList";

async function fetchUsers(page = 1, limit = 5) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?page=${page}&limit=${limit}`,
		{ cache: "no-store" }
	);
	if (!res.ok) throw new Error("Failed to fetch users");
	return res.json();
}

export default async function AdminUsersPage() {
	const data = await fetchUsers();

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Manage Users</h1>
			<UsersList
				initialUsers={data.users}
				initialPagination={data.pagination}
			/>
		</div>
	);
}
