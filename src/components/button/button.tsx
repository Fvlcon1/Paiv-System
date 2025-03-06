'use client'
import theme, { colors } from "@styles/theme";
import { ButtonProps } from "@/utils/@types";
import Text from "@styles/components/text";
import { useState } from "react";
import Flex from "@styles/components/flex";
import { TypographyBold } from "@styles/style.types";

const Button = ({
  className,
  children,
  id,
  color,
  colorTheme,
  background,
  border,
  type,
  PreIcon,
  PostIcon,
  onClick,
  radius,
  maxWidth,
  size,
  textSize,
  textBold,
  padding,
  shadow,
  loading,
  opacity,
  disabled,
  showLoader,
  variant,
  disableElevation,
  hover,
  text,
  icon
}: ButtonProps) => {

  const [onHover, setOnHover] = useState<boolean>(false)
  const [onPress, setOnPress] = useState<boolean>(false)

  return (
    <button
      style={{
        background : (onHover && !disabled)
                      ? hover?.background 
                      ?? background 
                      ?? theme.colors.bg.quantinary
                      : theme.colors.bg.tetiary,
        padding : padding ?? '7px 15px',
        border : border,
        borderRadius : radius ? `${radius}px` : '7px',
        maxWidth,
        width : size?.width ?? 'fit-content',
        height : size?.height ?? '35px',
        opacity : (onHover && !disabled)
                  ? hover?.opacity 
                  ?? 0.8
                  : disabled 
                  ? 0.5 : 1,
        transform : `scale(${onPress ? 0.97 : 1})`,
      }}
      onClick={onClick}
      onMouseOver={()=>setOnHover(true)}
      onMouseLeave={()=>setOnHover(false)}
      onMouseDown={()=>setOnPress(true)}
      onMouseUp={()=>setOnPress(false)}
      className={`${className} duration-200 border-[1px] border-solid border-border-tetiary ${disabled && 'cursor-not-allowed'}`}
      disabled={disabled ?? loading}
      type={type ?? 'submit'}
    >
      <div className="w-full justify-center items-center flex gap-[8px]">
        {
          loading ?
          <div className="normal-loader !w-[20px]"></div>
          :
          <Text
            size={textSize}
            bold={textBold ?? TypographyBold.md}
            textColor={
              onHover ? hover?.color
                ? hover.color
                : color ?? theme.colors.text.primary
                : theme.colors.text.primary
            }
            maxLines={1}
            ellipsis
            whiteSpace="nowrap"
          >
            <Flex 
                width="fit-content"
                align="center"
                gap={8}
            >
                {icon}
                {text ?? 'Button'}
            </Flex>
          </Text>
        }
      </div>
    </button>
  )
}

type customPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export default Button