export const site = {
	name: "Mahir Bilen Can",
	description:
		"Professor of Mathematics at Tulane University. Research in algebraic groups and monoids, representation theory, algebraic geometry, and secure communication.",
	email: "mcan@tulane.edu",
	location: "New Orleans, LA",
	affiliation: "Tulane University",
	profileImage: "/images/Mahir.jpg",
	social: {
		orcid: "https://orcid.org/0000-0002-0175-4897",
		arxiv:
			"https://arxiv.org/search/math?query=mahir+bilen+can&searchtype=author&abstracts=show&order=-announced_date_first&size=50",
		googleScholar: "https://scholar.google.com/citations?user=jbvQXE4AAAAJ&hl=en&oi=ao",
		github: "",
		linkedin: "",
		youtube: "",
	},
} as const;

export const organizations = [
	{
		name: "Xanadu",
		role: "Contracting work",
		href: "https://www.xanadu.ai/",
		description: "Industry collaboration and contracting work in quantum computing, coding theory, and secure communication.",
		logo: {
			src: "/images/Xanadu_Logo_Black.webp",
			width: 512,
			height: 512,
			className: "h-14 w-14",
		},
	},
	{
		name: "QSPARC Labs",
		role: "Startup",
		href: "https://www.qsparclabs.com/",
		description: "Startup work focused on post-quantum cryptography, secure communication, and research-driven cryptographic systems.",
		logo: {
			src: "/images/qsparc-logo.png",
			width: 512,
			height: 512,
			className: "h-12 w-12",
		},
	},
] as const;
