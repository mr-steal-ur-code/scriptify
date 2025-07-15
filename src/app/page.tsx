import Image from "next/image";

export default function Home() {
	return (
		<div className="flex justify-center  items-center sm:items-start font-[family-name:var(--font-geist-sans)]">
			<Image
				className="dark:invert"
				src="/next.svg"
				alt="Next.js logo"
				width={180}
				height={38}
				priority
			/>
		</div>
	);
}
