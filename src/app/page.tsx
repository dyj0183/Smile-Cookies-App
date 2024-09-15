"use client";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-2">
			<h1 className="mt-20">Welcome to NextJS's Main Page</h1>
			<Link href="cookies">
				<p className="bg-slate-400 p-2 mt-6 rounded-md">Go to Cookies Page</p>
			</Link>
		</main>
	);
}
