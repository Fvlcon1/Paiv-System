import { TypographyBold, TypographySize } from "./style.types"

export const lightColors = {
    text: {
        primary: '#284452',
        secondary: '#3F6D84',
        tetiary: '#95AAB6',
        danger: '#b93b36',
        success: '#29a333',
    },
    bg: {
        primary: '#FFFFFF',
        primaryLighter : '#FBFBFB',
        secondary: '#F4F4F4',
        tetiary: '#EBEBEB',
        quantinary: "#D0D0D0",
		sidebar : "#32586B"
    },
    border: {
        primary: "#E4E4E4",
        secondary: '#F2F2F2',
        tetiary: '#DDDDDD',
        quantinary: '#C6C6D0',
    },
    main: {
        primary: '#3F6D84'
    }
}

export const darkColors = {
    text: {
        primary: '#F1FCFD',
        secondary: '#CDD6D7',
        tetiary: '#798586',
        danger: '#b93b36',
        success: '#29a333',
    },
    bg: {
        primary: '#0B0A0A',
        primaryLighter : '#141515',
        secondary: '#1B1E1E',
        tetiary: '#323737',
        quantinary: "#373D3E",
		sidebar : "#1B1E1E"
    },
    border: {
        primary: "#1D1D1D",
        secondary: '#2F2F2F',
        tetiary: '#4D4D4D',
        quantinary: '#909090',
    },
    main: {
        primary: '#3F6D84'
    }
}

export const getColors = (): typeof lightColors => {
    if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' ? darkColors : lightColors;
    }
    return lightColors; // default fallback
};

export const theme = {
    colors: getColors(),
    text: {
        size: {
            xs: TypographySize.xs,
            xs2: TypographySize.xs2,
            SM: TypographySize.SM,
            body: TypographySize.body,
            body2: TypographySize.body2,
            HL: TypographySize.HL,
            HM: TypographySize.HM,
        },
        bold: {
            sm: TypographyBold.sm,
            sm2: TypographyBold.sm2,
            md: TypographyBold.md,
            lg: TypographyBold.lg,
            md2: TypographyBold.md2,
        },
    },
}

export default theme