'use client'

import { hexOpacity } from "@/utils/hexOpacity"
import theme from "@styles/theme"
import { ChangeEventHandler, Dispatch, FocusEventHandler, HTMLInputAutoCompleteAttribute, ReactNode, SetStateAction, useEffect, useRef, useState } from "react"

type InputProps = {
    className?: string;
    onClick?: () => void;
    placeholder?: string;
    type?: "text" | "number" | "password";
    PreIcon?: ReactNode;
    PostIcon?: ReactNode;
    required? : boolean
    borderColor? : string
    inputClassName?: string
    autofocus? : boolean
    onChange? : ChangeEventHandler<HTMLInputElement>
    onBlur? : FocusEventHandler<HTMLInputElement>
    name? : string,
    autoSelect? : boolean
    autoComplete? : HTMLInputAutoCompleteAttribute
  } & (
    | { value: string; setValue?: Dispatch<SetStateAction<string>> }
    | { value: number; setValue?: Dispatch<SetStateAction<number>> }
  );
  
  const Input = ({
    className,
    inputClassName,
    placeholder,
    type,
    value,
    autofocus,
    setValue,
    PreIcon,
    PostIcon,
    name,
    onClick,
    onChange,
    onBlur,
    required,
    borderColor,
    autoSelect,
    autoComplete
  }: InputProps) => {
    const [inputFocus, setInputFocus] = useState<boolean>(autofocus ?? false);
    const [hover, setHover] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
      if (autoSelect && inputRef.current)
        inputRef.current.select();
    },[autoSelect])
  
    return (
      <div
        className={`flex w-full flex-1 gap-2 px-[15px] py-[10px] h-[40px] items-center rounded-xl bg-bg-secondary border-border-tetiary border-[1px] border-solid duration-200 ${className}`}
        onClick={onClick}
        style={{
          borderColor : (inputFocus || hover ) ? theme.colors.main.primary : borderColor || theme.colors.border.secondary
        }}
      >
        {PreIcon && PreIcon}
        <input
          ref={inputRef}
          placeholder={placeholder ?? "Input text"}
          type={type ?? "text"}
          required={required}
          className={`flex w-full flex-1 bg-transparent outline-none placeholder:text-[12px] placeholder:text-text-tetiary text-text-primary md:text-[12px] text-[16px] ${inputClassName}`}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          value={value}
          autoFocus={autofocus}
          name={name}
          onChange={(e) => {onChange ? onChange(e) : setValue && setValue(e.target.value as any)}}
          autoComplete={autoComplete}
        />
        {PostIcon && PostIcon}
      </div>
    );
  };
  
  export default Input;
  
