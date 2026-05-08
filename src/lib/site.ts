export const site = {
	name: "Mahir Bilen Can",
	description:
		"Mathematician specializing in algebraic geometry, coding theory, and quantum error correction. Professor of Mathematics at Tulane University (on leave), joining Xanadu Quantum Technologies full-time in June 2026.",
	email: "mcan@tulane.edu",
	location: "",
	affiliation: "Tulane University",
	role: "Professor of Mathematics",
	academicStatus: "On leave",
	industryAffiliation: "Xanadu Quantum Technologies",
	industryRole: "Senior Quantum Architecture Scientist",
	industryStartDate: "June 2026",
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
