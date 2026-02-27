/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js";
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        fontFamily: {
            sans: [
                "Open Sans",
                "ui-sans-serif",
                "system-ui",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
            avenir: ["Nunito Sans", "sans-serif"],
            space: ["Space Grotesk", "sans-serif"],
            poppins: ["Poppins", "sans-serif"],
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "main-gradient": "linear-gradient(to right, #885acb, #261249)",
                "gradient-rose": "linear-gradient(105deg, #f79ac0, #ec598d)",
                "gradient-three":
                    "linear-gradient(135deg, #805dc4, #7b58c1, #513480)",
                "orange-gradient":
                    "linear-gradient(165deg, #fbc661 35%, #f69f09 65%)",
                "secondary-gradient":
                    "linear-gradient(135deg, #714caa, #41296a)",
            },
            backgroundColor: {
                "morph-back": "#391c68",
            },
            fontFamily: {
                title: [
                    "Lato",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
                body: [
                    "Open Sans",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            fontSize: {
                xxs: ["10px", { lineHeight: "19.200000000000003px" }],
                xs: ["12px", { lineHeight: "19.200000000000003px" }],
                sm: [".875rem", { lineHeight: "1.25rem" }],
                base: ["16px", { lineHeight: "25.6px" }],
                lg: ["18px", { lineHeight: "27px" }],
                xl: ["20px", { lineHeight: "28px" }],
                "2xl": ["24px", { lineHeight: "31.200000000000003px" }],
                "3xl": ["30px", { lineHeight: "36px" }],
                "4xl": ["36px", { lineHeight: "41.4px" }],
                "5xl": ["48px", { lineHeight: "52.800000000000004px" }],
                "6xl": ["60px", { lineHeight: "66px" }],
                "7xl": ["72px", { lineHeight: "75.60000000000001px" }],
                "8xl": ["96px", { lineHeight: "100.80000000000001px" }],
                "9xl": ["128px", { lineHeight: "134.4px" }],
            },
            borderRadius: {
                DEFAULT: "12px",
                "4xl": "32px",
                "5xl": "40px",
            },
            colors: {
                tradyx: {
                    50: "#efeeff",
                    100: "#e4e1fe",
                    200: "#cdc8fd",
                    300: "#b2a7fa",
                    400: "#9c84f5",
                    500: "#8d67ed",
                    600: "#814ae1",
                    700: "#703cc6",
                    800: "#5b33a0",
                    900: "#40296c",
                    950: "#2d1c4a",
                },
                blush: {
                    50: "#fbf4f7",
                    100: "#f8ebf1",
                    200: "#f3d7e5",
                    300: "#ebb6cf",
                    400: "#dd89ae",
                    500: "#cf6590",
                    600: "#b7436d",
                    700: "#a13559",
                    800: "#862e4b",
                    900: "#702b41",
                    950: "#431423",
                },

                meteorite: {
                    50: "#f6f4fe",
                    100: "#eeebfc",
                    200: "#e1dafa",
                    300: "#cabcf6",
                    400: "#af97ee",
                    500: "#946ce6",
                    600: "#854dda",
                    700: "#753ac7",
                    800: "#6130a7",
                    900: "#522989",
                    950: "#391c68",
                },

                "royal-purple": {
                    50: "#faf7fd",
                    100: "#f3edfa",
                    200: "#e9ddf7",
                    300: "#d8c3ef",
                    400: "#c09ce4",
                    500: "#a775d7",
                    600: "#9157c6",
                    700: "#7440a2",
                    800: "#683c8d",
                    900: "#553172",
                    950: "#391952",
                },
                studio: {
                    50: "#f9f7fd",
                    100: "#f1edfa",
                    200: "#e6dff5",
                    300: "#d3c5ed",
                    400: "#b8a0e0",
                    500: "#9c7bd1",
                    600: "#845ebf",
                    700: "#724caa",
                    800: "#5f4188",
                    900: "#4e356e",
                    950: "#321d4e",
                },
                "cream-can": {
                    50: "#fff9eb",
                    100: "#fdeec8",
                    200: "#fbdc8c",
                    300: "#f9c85f",
                    400: "#f7ac28",
                    500: "#f08a10",
                    600: "#d5660a",
                    700: "#b1450c",
                    800: "#8f3611",
                    900: "#762e11",
                    950: "#441504",
                },

                "green-haze": {
                    50: "#f1fcf5",
                    100: "#ddfbea",
                    200: "#bef4d6",
                    300: "#8aebb5",
                    400: "#50d88e",
                    500: "#29be6d",
                    600: "#1b9854",
                    700: "#197c47",
                    800: "#19623b",
                    900: "#175033",
                    950: "#072c19",
                },
                "ebony-clay": {
                    50: "#f2f6fc",
                    100: "#e1ecf8",
                    200: "#caddf3",
                    300: "#a5c8eb",
                    400: "#7babdf",
                    500: "#5b8ed6",
                    600: "#4774c9",
                    700: "#3d61b8",
                    800: "#375096",
                    900: "#314577",
                    950: "#1a2239",
                },

                silver: {
                    50: "#f7f7f7",
                    100: "#ededed",
                    200: "#dfdfdf",
                    300: "#c4c4c4",
                    400: "#adadad",
                    500: "#999999",
                    600: "#888888",
                    700: "#7b7b7b",
                    800: "#676767",
                    900: "#545454",
                    950: "#363636",
                },

                "harvest-gold": {
                    50: "#fdf9ef",
                    100: "#f9f0db",
                    200: "#f2deb6",
                    300: "#e7be75",
                    400: "#e1a756",
                    500: "#da8e35",
                    600: "#cb772b",
                    700: "#a95c25",
                    800: "#874a25",
                    900: "#6d3e21",
                    950: "#3b1f0f",
                },

                juniper: {
                    50: "#f5f8f7",
                    100: "#dee9e7",
                    200: "#bed1d0",
                    300: "#95b3b2",
                    400: "#648585",
                    500: "#547778",
                    600: "#425e5f",
                    700: "#374d4e",
                    800: "#2f3f40",
                    900: "#2a3637",
                    950: "#151d1e",
                },

                matisse: {
                    50: "#f2f8fd",
                    100: "#e4effa",
                    200: "#c2def5",
                    300: "#8cc4ed",
                    400: "#4fa4e1",
                    500: "#2889cf",
                    600: "#1a6caf",
                    700: "#185e9a",
                    800: "#164a76",
                    900: "#183f62",
                    950: "#102841",
                },

                "green-vogue": {
                    50: "#f1f8fe",
                    100: "#e2effc",
                    200: "#bfddf8",
                    300: "#86c3f3",
                    400: "#46a5ea",
                    500: "#1e89d9",
                    600: "#106cb9",
                    700: "#0e5696",
                    800: "#104a7c",
                    900: "#133e67",
                    950: "#0f2f51",
                },

                "blue-zodiac": {
                    50: "#f0f6fe",
                    100: "#deebfb",
                    200: "#c4ddf9",
                    300: "#9cc8f4",
                    400: "#6da9ed",
                    500: "#4b8ae6",
                    600: "#366dda",
                    700: "#2d5ac8",
                    800: "#2a4aa3",
                    900: "#274081",
                    950: "#182343",
                },

                "pickled-bluewood": {
                    50: "#f5f7fa",
                    100: "#eaeef4",
                    200: "#d1dce6",
                    300: "#a8bed1",
                    400: "#799bb7",
                    500: "#597e9f",
                    600: "#456684",
                    700: "#39516b",
                    800: "#34495e",
                    900: "#2d3c4d",
                    950: "#1e2833",
                },
                "pacific-blue": {
                    50: "#ebfef4",
                    100: "#cffce3",
                    200: "#a3f7cb",
                    300: "#68edb1",
                    400: "#2ddb92",
                    500: "#08c17a",
                    600: "#009d63",
                    700: "#007e52",
                    800: "#026343",
                    900: "#025239",
                    950: "#002e20",
                },
                brand: {
                    DEFAULT: "#FBC661",
                    50: "#FFF9EB",
                    100: "#FDEEC8",
                    200: "#FBDC8C",
                    300: "#F9C85F",
                    400: "#F7AC28",
                    500: "#FBC661",
                    600: "#D5660A",
                    700: "#B1450C",
                    800: "#8F3611",
                    900: "#762E11",
                    950: "#441504",
                },
                "eastern-blue": {
                    50: "#ebfef4",
                    100: "#cffce3",
                    200: "#a3f7cb",
                    300: "#68edb1",
                    400: "#2ddb92",
                    500: "#08c17a",
                    600: "#009d63",
                    700: "#007e52",
                    800: "#026343",
                    900: "#025239",
                    950: "#002e20",
                },

                mirage: {
                    50: "#f3f6fc",
                    100: "#e7edf7",
                    200: "#cad8ed",
                    300: "#9bb7de",
                    400: "#6591cb",
                    500: "#4173b6",
                    600: "#305999",
                    700: "#28487c",
                    800: "#243e68",
                    900: "#233657",
                    950: "#101828",
                },
                cinder: {
                    50: "#f5f5fa",
                    100: "#eaeaf4",
                    200: "#d0d1e7",
                    300: "#a7aad2",
                    400: "#787eb8",
                    500: "#575da0",
                    600: "#444885",
                    700: "#383b6c",
                    800: "#31335b",
                    900: "#2d2e4d",
                    950: "#0f0f1a",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                agrocash: {
                    primary: "#60a548",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            textShadow: {
                sm: "-1px 1px 1px",
                DEFAULT: "2px 2px 4px",
                md: "3px 3px 6px",
                lg: "4px 4px 10px",
                xl: "6px 6px 16px",
                none: "none",
            },
            boxShadow: {
                button: "0 3px 6px #00000029;",
                "bottom-xl": "0 5px 17px -2px #00000029;",
                center: "0 2px 4px #00000033",
                top: "0 0 1.6vw rgba(0,0,0,.12)",
                "top-inset": "inset 0 1px 0 0 rgba(0,0,0,.12)",
                "top-inset-tl": "inset 1px 1px 0 0 rgba(0,0,0,.12)",
                "bottom-inset-xl": "inset 0 -5px 0 0 rgba(0,0,0,.12)",
                "bottom-inset-tr": "inset -2px -1px 0 0 rgba(0,0,0,.12)",
                right: "1px 1px 0 rgba(0,0,0,.12)",
            },
            spacing: {
                0: "0px",
                1: "4px",
                2: "8px",
                3: "12px",
                4: "16px",
                5: "20px",
                6: "24px",
                7: "28px",
                8: "32px",
                9: "36px",
                10: "40px",
                11: "44px",
                12: "48px",
                14: "56px",
                16: "64px",
                20: "80px",
                24: "96px",
                28: "112px",
                32: "128px",
                36: "144px",
                40: "160px",
                44: "176px",
                48: "192px",
                52: "208px",
                56: "224px",
                60: "240px",
                64: "256px",
                72: "288px",
                80: "320px",
                96: "384px",
                px: "1px",
                0.5: "2px",
                1.5: "6px",
                2.5: "10px",
                3.5: "14px",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        plugin(function ({ matchUtilities, theme }) {
            // Cria uma utilidade dinâmica: shadow-gradient-from-{color1}-to-{color2}
            matchUtilities(
                {
                    "shadow-gradient": (value) => {
                        const [from, to] = value.split(",");
                        return {
                            position: "relative",
                            zIndex: "0",
                            borderRadius: "inherit",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: "0",
                                borderRadius: "inherit",
                                padding: "2px",
                                background: `linear-gradient(130deg, ${from}, ${to})`,
                                WebkitMask:
                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                                zIndex: "-1",
                            },
                        };
                    },
                },
                {
                    // Permite o uso de cores hex, rgb ou Tailwind (ex: theme('colors.indigo.500'))
                    values: Object.fromEntries(
                        Object.entries(theme("colors")).map(([key, val]) => [
                            key,
                            val,
                        ])
                    ),
                    type: "any",
                }
            );
        }),
        plugin(function ({ matchUtilities, theme, e, addUtilities }) {
            const shadows = theme("textShadow");
            const colors = flattenColorPalette(theme("colors"));

            // 💡 PASSO 1: Classe Base ÚNICA para aplicar o text-shadow
            // Isso garante que você só precise usar uma classe (ex: 'text-shadow')
            // para aplicar o text-shadow, e as outras classes definem apenas as variáveis.
            addUtilities({
                ".text-shadow": {
                    textShadow:
                        "var(--tw-text-shadow-size, 2px 2px 4px) var(--tw-text-shadow-color, rgba(0, 0, 0, 0.25))",
                },
            });

            // 💡 PASSO 2: Classes de Tamanho (AGORA DEFINEM APENAS A VARIÁVEL DE TAMANHO)
            matchUtilities(
                {
                    // O nome da classe deve ser diferente ou mais específico para não colidir com o de cor
                    "text-shadow-size": (value) => ({
                        "--tw-text-shadow-size": value,
                    }),
                },
                { values: shadows }
            );

            // 💡 PASSO 3: Classes de Cor (AGORA DEFINEM APENAS A VARIÁVEL DE COR)
            matchUtilities(
                {
                    // O nome da classe deve ser diferente para não colidir com o de tamanho
                    "text-shadow-color": (value) => ({
                        "--tw-text-shadow-color": value,
                    }),
                },
                { values: colors, type: "color" }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            // 1. Definição das Cores
            const colors = flattenColorPalette(theme("colors"));

            // 2. Classes para a COR (ex: from-red-500, to-blue-500)
            // Estas classes apenas definem as variáveis CSS.
            matchUtilities(
                {
                    // Gera classes como 'from-red-500'
                    from: (value) => ({
                        "--tw-gradient-from": value,
                    }),
                    // Gera classes como 'to-blue-500'
                    to: (value) => ({
                        "--tw-gradient-to": value,
                    }),
                    // Gera classes como 'via-green-500'
                    via: (value) => ({
                        "--tw-gradient-via": value,
                    }),
                },
                { values: colors, type: "color" }
            );

            // 3. Classes para a DIREÇÃO e Aplicação Final (ex: text-gradient-to-r)
            // Esta classe aplica as propriedades Webkit.
            matchUtilities(
                {
                    "text-gradient": (angle) => ({
                        // Propriedades Webkit essenciais para o efeito de texto gradiente
                        "-webkit-background-clip": "text",
                        "-webkit-text-fill-color": "transparent",
                        "background-clip": "text", // Fallback padrão

                        // Aplica o gradiente usando as variáveis
                        "background-image": `linear-gradient(${angle}, var(--tw-gradient-from, transparent), var(--tw-gradient-via, transparent) 0%, var(--tw-gradient-to, transparent))`,
                    }),
                },
                // Mapeamento das direções e seus ângulos CSS
                {
                    values: {
                        "to-t": "to top",
                        "to-tr": "to top right",
                        "to-r": "to right",
                        "to-br": "to bottom right",
                        "to-b": "to bottom",
                        "to-bl": "to bottom left",
                        "to-l": "to left",
                        "to-tl": "to top left",
                    },
                }
            );
        }),
    ],
};
