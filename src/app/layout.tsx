import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
			>
				<Header />
				<main className="flex-1 flex flex-col">{children}</main>
				<footer className="py-4 text-center text-gray-500 flex-shrink-0">
					&copy; {new Date().getFullYear()} Scriptify
				</footer>
			</body>
		</html>
	);
}
