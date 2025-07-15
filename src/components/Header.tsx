import Link from "next/link";
import { Avatar } from "./auth/Avatar";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-white shadow-md p-3 flex flex-row items-center justify-between">
			<Link href="/" className="text-xl font-bold text-gray-800">
				Scriptify
			</Link>
			<nav className="flex items-center">
				<Link href="/admin" className="text-gray-600 hover:text-black mr-4">
					Admin Page
				</Link>
				<Avatar />
			</nav>
		</header>
	);
};

export default Header;
