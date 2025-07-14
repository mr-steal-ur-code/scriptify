import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Avatar } from "@/components/auth/Avatar";
import { Providers } from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Scriptify — Learn JavaScript interactively",
	description:
		"Interactive JavaScript learning platform to master modern JS with hands-on exercises and challenges.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
			>
				<Providers>
					<header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center flex-shrink-0">
						<Link href="/" className="text-xl font-bold text-gray-800">
							Scriptify
						</Link>
						<nav>
							<Link
								href="/admin"
								className="text-gray-600 hover:text-black mr-4"
							>
								Admin Page
							</Link>
							<Avatar />
						</nav>
					</header>
					<main className="flex-1 flex flex-col">{children}</main>
					<footer className="py-4 text-center text-gray-500 flex-shrink-0">
						A Kutsolutions project
					</footer>
				</Providers>
			</body>
		</html>
	);
}
