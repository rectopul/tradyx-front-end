import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

// 2. Tipagem para as props do AnimatedInput (incluindo as props injetadas pelo RHF Controller)
interface AnimatedInputProps {
    label: string;
    type?: string;
    name: keyof FormData; // Garante que o nome é uma das chaves de FormData
    // Propriedades do RHF Controller
    onChange: (value: string) => void;
    onBlur: () => void;
    Logo?: React.ElementType;
    placeholder?: string;
    value: string;
    // ... e outras props que um input HTML possa ter
}

// Componente AnimatedInput atualizado para uso com React Hook Form e correção de rolagem/cursor
export function AnimatedInput({
    label,
    type = "text",
    name,
    onChange, // Propriedades do React Hook Form Controller
    onBlur,
    Logo,
    value,
    placeholder,
    ...rest
}: AnimatedInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const animatedTextRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState<number>(0);

    // Efeito para sincronizar a rolagem horizontal
    useEffect(() => {
        const inputElement = inputRef.current;
        if (!inputElement) return;

        const handleScroll = () => {
            // Monitora a rolagem do input nativo e atualiza o estado
            setScrollLeft(inputElement.scrollLeft);
        };

        // Adiciona o listener de rolagem
        inputElement.addEventListener("scroll", handleScroll);

        // Limpa o listener ao desmontar
        return () => {
            inputElement.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Atualiza a rolagem do contêiner animado sempre que o scrollLeft mudar
    // Usa transform para melhor performance e compatibilidade com framer-motion
    const transformStyle = {
        transform: `translate(-${scrollLeft}px, -50%)`,
    };

    const displayValue = value || ""; // Garante que value não é null/undefined para split

    return (
        <div className="w-full flex flex-col">
            <label
                htmlFor={String(name)}
                className="text-sm mb-1 text-tradyx-300 font-medium"
            >
                {label}
            </label>
            <div
                className={`relative flex h-10 ${
                    Logo ? "pl-8 px-4" : " px-4"
                } items-center bg-morph-back text-tradyx-500 shadow-right border-2 border-tradyx-950 shadow-royal-purple-700 rounded-lg focus-within:ring-1 focus-within:ring-tradyx-600 transition duration-200 overflow-hidden`}
            >
                {/* Div que contém o texto animado. Ela é absoluta e aplica a compensação de rolagem.
                    O left-4 e o padding-x-4 do input são importantes para o alinhamento.
                */}
                {Logo && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 text-tradyx-500">
                        {<Logo className="w-5 h-5" />}
                    </div>
                )}
                <div
                    ref={animatedTextRef}
                    style={transformStyle}
                    className={`absolute ${
                        Logo ? "left-8" : "left-4"
                    }  top-1/2 flex gap-[1px] whitespace-nowrap transition-transform duration-100 ease-linear will-change-transform`}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {displayValue.split("").map((char, i) => (
                            <motion.span
                                // Usar um ID único (como i) na key é crucial para o AnimatePresence
                                // detectar adições/remoções de caracteres.
                                key={i}
                                initial={{ y: 12, opacity: 0, scale: 0.8 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -12, opacity: 0, scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                                className="text-tradyx-500 text-xl font-mono tracking-wider inline-block"
                            >
                                {/* Renderiza um espaço em branco com um caractere especial
                                    para garantir que ele tenha uma largura visual
                                */}
                                {char === " " ? <>&nbsp;</> : char}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input nativo:
                    1. É transparente (bg-transparent).
                    2. Sua cor de texto é a mesma do fundo (text-gray-700) para ser invisível,
                       MAS o caret-white garante que o cursor nativo é branco e visível.
                    3. Overflow-x-scroll (comportamento normal de input que rola).
                    4. O padding lateral é ajustado para bater com o 'left-4' da div animada.
                */}
                <input
                    ref={inputRef}
                    id={String(name)}
                    name={String(name)}
                    type={type}
                    value={displayValue}
                    placeholder={placeholder}
                    onChange={(e) => {
                        // Passa o valor para o React Hook Form
                        onChange(e.target.value);
                    }}
                    onBlur={onBlur} // Passa o onBlur para o React Hook Form
                    className="w-full h-full bg-transparent text-transparent caret-white outline-none px-0 text-xl font-mono tracking-[2px] overflow-x-scroll z-10 scrollbar-hide placeholder:text-tradyx-500"
                    autoComplete="off"
                    {...rest}
                />
            </div>
        </div>
    );
}
