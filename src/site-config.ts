export interface NavGroup {
	title: string;
	links: Array<{
		title: string;
		href: string;
	}>;
}

export const socials = {
	discord: "https://discord.rainnny.club",
	github: "https://github.com/Rainnny7",
};

export const navigation: Array<NavGroup> = [
	{
		title: "Introduction",
		links: [{ title: "Introduction", href: "/" }],
	},
	{
		title: "Getting Started",
		links: [{ title: "Next.js App Router", href: "/getting-started/appdir" }],
	},
];
