export const site = {
	name: "Mahir Bilen Can",
	description:
		"Professor of Mathematics at Tulane University and Senior Quantum Architecture Scientist at Xanadu. Research in algebra, representation theory, algebraic geometry, coding theory, secure communication, and quantum technologies.",
	email: "mcan@tulane.edu",
	location: "",
	affiliation: "Tulane University",
	role: "Professor of Mathematics",
	industryAffiliation: "Xanadu",
	industryRole: "Senior Quantum Architecture Scientist",
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
		role: "Senior Quantum Architecture Scientist",
		href: "https://www.xanadu.ai/",
		logo: {
			src: "/images/Xanadu_Logo_Black.webp",
			width: 512,
			height: 512,
			className: "h-14 w-14",
		},
	},
	{
		name: "QSPARC Labs",
		role: "Startup venture",
		href: "https://www.qsparclabs.com/",
		logo: {
			src: "/images/qsparc-logo.png",
			width: 512,
			height: 512,
			className: "h-12 w-12",
		},
	},
] as const;
