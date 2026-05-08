export const site = {
	name: "Mahir Bilen Can",
	description:
		"Senior Quantum Architecture Scientist at Xanadu, on leave from Tulane University. Research in algebra, representation theory, algebraic geometry, coding theory, secure communication, and quantum technologies.",
	email: "mcan@tulane.edu",
	location: "",
	affiliation: "Xanadu",
	role: "Senior Quantum Architecture Scientist",
	leaveAffiliation: "Tulane University",
	leaveRole: "Professor of Mathematics",
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
