'use client'
import { useState } from "react"
import { Montserrat } from "next/font/google"
import theme from "@styles/theme"
import { AppTypographyProps, TypographyBold, TypographySize } from "@styles/style.types"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-montserrat",
});

/**
 * Base Text component for typography needs
 */
const Text = ({
    children,
    className = "",
    bold = TypographyBold.sm2,
    size = TypographySize.body,
    textColor = theme.colors.text.secondary,
    wrap = false,
    underline = false,
    clickable = false,
    clickableLink = false,
    italic = false,
    textAlign,
    display,
    ellipsis = false,
    fontfamily = 'montserrat',
    maxLines,
    lineHeight,
    whiteSpace,
    onClick
} : AppTypographyProps) => {
    const [onHover, setOnHover] = useState<boolean>(false);
    
    const getFontFamily = () => {
        if (fontfamily === 'montserrat') return montserrat.style.fontFamily;
        if (fontfamily === 'greater-theory') return 'greater-theory';
        return montserrat.style.fontFamily;
    };

    const getDisplay = () => {
        if (display) return display;
        if (maxLines) return '-webkit-box';
        return 'inline-block';
    };

    const getWhiteSpace = () => {
        if (maxLines) return 'normal';
        if (ellipsis) return 'nowrap';
        return 'normal';
    };

    return (
        <span
            className={`w-fit ${className} ${fontfamily === 'montserrat' ? montserrat.variable : ''}`}
            style={{
                fontFamily: getFontFamily(),
                fontWeight: bold,
                fontSize: size,
                color: textColor,
                flexWrap: wrap ? 'wrap' : 'nowrap',
                textDecoration: (underline || (onHover && clickableLink)) ? 'underline' : 'none',
                opacity: onHover && (clickable || clickableLink) ? 0.7 : 1,
                fontStyle: italic ? 'italic' : 'normal',
                textAlign,
                display: getDisplay(),
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: maxLines ? 'vertical' : undefined,
                textOverflow: ellipsis ? 'ellipsis' : 'clip',
                cursor: (clickableLink || clickable) ? 'pointer' : 'inherit',
                whiteSpace: getWhiteSpace(),
                overflow: ellipsis ? 'hidden' : 'visible',
                lineHeight
            }}
            onMouseOver={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Text;