import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    onChange: (value: any) => void;
    onBlur: () => void;
    Logo?: React.ElementType;
    value: string;
}

export function AnimatedInput({
    label,
    type = "text",
    name,
    onChange,
    onBlur,
    Logo,
    value,
    placeholder,
    className,
    ...rest
}: AnimatedInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const animatedTextRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const inputElement = inputRef.current;
        if (!inputElement) return;

        const handleScroll = () => {
            setScrollLeft(inputElement.scrollLeft);
        };

        inputElement.addEventListener("scroll", handleScroll);
        return () => {
            inputElement.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const transformStyle = {
        transform: `translate(-${scrollLeft}px, -50%)`,
    };

    const displayValue = value || "";

    return (
        <div className="w-full flex flex-col gap-2">
            <label
                htmlFor={name}
                className="text-sm font-bold text-gray-900 ml-1"
            >
                {label}
            </label>
            <div
                className={cn(
                    "relative flex h-14 items-center rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                    isFocused
                        ? "border-brand bg-white shadow-md shadow-brand/5"
                        : "border-transparent bg-gray-50",
                    Logo ? "pl-14" : "pl-6",
                    className
                )}
            >
                {Logo && (
                    <div className={cn(
                        "absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-200",
                        isFocused ? "text-brand" : "text-gray-400"
                    )}>
                        <Logo className="w-6 h-6" />
                    </div>
                )}

                {/* Animated Display Text */}
                <div
                    ref={animatedTextRef}
                    style={transformStyle}
                    className={cn(
                        "absolute top-1/2 flex gap-[0.5px] whitespace-nowrap pointer-events-none transition-transform duration-100 ease-linear",
                        Logo ? "left-14" : "left-6"
                    )}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {displayValue.split("").map((char, i) => (
                            <motion.span
                                key={`${i}-${char}`}
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="text-gray-900 text-base font-bold inline-block"
                            >
                                {char === " " ? <>&nbsp;</> : char}
                            </motion.span>
                        ))}
                    </AnimatePresence>

                    {displayValue.length === 0 && placeholder && (
                        <span className="text-gray-300 font-medium">
                            {placeholder}
                        </span>
                    )}
                </div>

                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type={type}
                    value={displayValue}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    className="w-full h-full bg-transparent text-transparent caret-brand outline-none px-0 text-base font-bold overflow-x-scroll z-10 scrollbar-hide"
                    autoComplete="off"
                    {...rest}
                />
            </div>
        </div>
    );
}
