import { Providers } from "@/app/providers";
import { type Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
	title: {
		template: "%s - Protocol Docs",
		default: "Protocol Docs",
	},
};

export default function RootLayout(
	props: Readonly<{
		children: React.ReactNode;
	}>
) {
	return (
		<ViewTransitions>
			<html lang="en" className="h-full" suppressHydrationWarning>
				<body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
					<Providers>{props.children}</Providers>
				</body>
			</html>
		</ViewTransitions>
	);
}
