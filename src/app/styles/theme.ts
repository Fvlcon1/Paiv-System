import { TypographyBold, TypographySize } from "./style.types"

export const colors = {
	text: {
		primary: '#284452',
		secondary: '#3F6D84',
		tetiary: '#95AAB6',
	},
	bg: {
		primary: '#FFFFFF',
		secondary: '#F7F7FA',
		tetiary: '#EDEDF2',
		quantinary: '#DADAE0',
	},
	border: {
		primary: '#E4E4E4',
		secondary: '#F2F2F2',
		tetiary: '#DDDDDD',
		quantinary: '#C6C6D0',
	},
	main: {
		primary: '#3F6D84',
	},
};

export const cssColors = {
	text: {
		primary: 'var(--text-primary)',
		secondary: 'var(--text-secondary)',
		tetiary: 'var(--text-tetiary)',
	},
	bg: {
		primary: 'var(--bg-primary)',
		secondary: 'var(--bg-secondary)',
		tetiary: 'var(--bg-tetiary)',
		quantinary: 'var(--bg-quantinary)',
	},
	border: {
		primary: "var(--border-primary)",
		secondary: "var(--border-primary)",
		tetiary: "var(--border-primary)",
		quantinary: "var(--border-quantinary)"
	},
	main: {
		primary: 'var(--main-primary)'
	}
}

export const theme = {
	colors,
	typography: {
		size: {
			body: TypographySize.body,
			HL: TypographySize.HL,
			HM: TypographySize.HM,
			body2 : TypographySize.body2,
			xs2 : TypographySize.xs2,
			xs : TypographySize.xs,
		},
		bold: {
			md : TypographyBold.md,
			md2 : TypographyBold.md2,
			sm : TypographyBold.sm,
			sm2 : TypographyBold.sm2,
			lg : TypographyBold.lg,
		},
	},
}

export default theme