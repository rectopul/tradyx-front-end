interface IconsProps {
    size?: number;
    fill?: string;
    fillSecondary?: string;
    className?: string;
}

const Receive = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M21.65 9.265a.75.75 0 0 0-.585.885A9.251 9.251 0 1 1 12 2.75a9.208 9.208 0 0 1 2.774.425.75.75 0 0 0 .452-1.43 10.734 10.734 0 1 0 7.309 8.105.751.751 0 0 0-.885-.585zm-9.672 8.485a.75.75 0 0 0 .75-.75v-.4a2.617 2.617 0 0 0 .258-5.13l-1.608-.4a1.12 1.12 0 0 1-.617-.405 1.1 1.1 0 0 1-.233-.685 1.123 1.123 0 0 1 1.122-1.119h.7a1.125 1.125 0 0 1 1.116 1 .75.75 0 1 0 1.49-.167 2.617 2.617 0 0 0-2.228-2.3V7a.75.75 0 0 0-1.5 0v.4a2.618 2.618 0 0 0-.214 5.124l1.608.4a1.123 1.123 0 0 1-.272 2.212h-.7a1.125 1.125 0 0 1-1.116-1 .75.75 0 1 0-1.49.167 2.619 2.619 0 0 0 2.184 2.297v.4a.75.75 0 0 0 .75.75zM19.47 7.53a.751.751 0 0 0 1.06 0l2-2a.75.75 0 0 0-1.06-1.06l-.72.719V2a.75.75 0 0 0-1.5 0v3.189l-.72-.719a.75.75 0 0 0-1.06 1.06z"
                    fill="currentColor"
                    opacity="1"
                    data-original="currentColor"
                    className=""
                ></path>
            </g>
        </svg>
    );
};
const Question = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient
                    id="a"
                    x1="256.787"
                    x2="253.727"
                    y1="520.97"
                    y2="3.18"
                    gradientTransform="matrix(1 0 0 -1 0 512)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        stop-opacity="1"
                        stop-color="#e0d5ef"
                        offset="0"
                    ></stop>
                    <stop
                        stop-opacity="1"
                        stop-color="#b29fce"
                        offset="1"
                    ></stop>
                </linearGradient>
                <path
                    fill="url(#a)"
                    d="M295.5 414.5a54.99 54.99 0 0 0-39.5-16.7h-1c-31.6 0-57.1 25.6-57.1 57.1S223.4 512 255 512h1c31.6-.5 56.7-26.5 56.2-58.1-.3-14.8-6.3-28.9-16.7-39.4zm67.1-375.2C337.4 13.4 301.5.2 256 0h-1c-36 0-66.7 9.8-91.3 29.2-11.7 9.2-22.1 19.9-31 31.8-8.6 11.6-15.6 24.4-20.6 38-2.2 6.1.6 12.8 6.5 15.4l53.9 23.7c6.2 2.7 13.4 0 16.1-6.2.1-.1.1-.3.2-.4 5-12.2 13-24.2 23.8-35.6 9.6-10.2 23.5-15.1 42.4-15.1h1c19.4.2 33.9 5.3 44.3 15.7 10.5 10.6 15.6 23.4 15.6 39.4 0 13.4-4 25.7-12.2 37.6-9 13.1-22.3 27.6-39.5 43.1-2.8 2.6-5.6 5.1-8.1 7.6-15.3 15-25.9 28.9-32.2 42.4-3.7 7.9-6.5 17.8-8.5 29.8-2.1 14.1-3.2 28.3-3.2 42.6-.1 6.8 5.3 12.3 12 12.5h64.5c6.7 0 12.1-5.3 12.2-12 .5-27.3 3.6-40.6 6.2-47 2.5-6.2 10.6-18.5 34.9-41.9 20.1-19.2 35.1-38 44.4-55.8 9.6-18.4 14.5-39.1 14.5-61.5-.2-36.3-13-68-38.3-94z"
                    opacity="1"
                    data-original="url(#a)"
                    className=""
                ></path>
            </g>
        </svg>
    );
};
const Transfer = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <g fill="currentColor">
                    <path
                        d="M21 11H7c-.6 0-1-.4-1-1s.4-1 1-1h11.6l-2.3-2.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4 4c.3.3.4.7.2 1.1-.1.4-.5.6-.9.6zM7 19c-.3 0-.5-.1-.7-.3l-4-4c-.3-.3-.4-.7-.2-1.1s.5-.6.9-.6h14c.6 0 1 .4 1 1s-.4 1-1 1H5.4l2.3 2.3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"
                        fill="currentColor"
                        opacity="1"
                        data-original="currentColor"
                        className=""
                    ></path>
                </g>
            </g>
        </svg>
    );
};
const CashIn = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <circle
                    cx="47.7"
                    cy="43.8"
                    r="4.7"
                    fill="currentColor"
                    opacity="1"
                    data-original="currentColor"
                ></circle>
                <path
                    fill="currentColor"
                    d="M30.4.4C23.6.4 18 5.9 18 12.8c0 3.8 1.7 7.2 4.4 9.5h7v-1.5c-.6-.1-1.1-.1-1.7-.3-.7-.1-1.4-.4-2-.8-.2-.1-.2-.2-.1-.3.2-.5.3-.9.5-1.4.1.1.3.1.4.2 1.1.6 2.2.9 3.5.9.5 0 .9-.1 1.4-.3 1.9-.8 2.1-3 .5-4.3-.6-.5-1.4-.8-2.1-1.1-.9-.4-1.8-.8-2.6-1.5-1.9-1.5-1.7-4.5.2-5.9.6-.5 1.3-.8 2.1-1 .1 0 .2 0 .3-.1V3.1h1.6v1.6l1.8.3c.5.1.9.4 1.4.6.1 0 .1.2.1.2l-.6 1.5c-.6-.4-1.3-.6-2-.7-.8-.1-1.6-.2-2.5.1-.8.3-1.4.8-1.5 1.7s.1 1.6.9 2.1c.6.4 1.3.7 2 1 .9.4 1.7.8 2.5 1.3 1.4 1 2 2.4 1.8 4.1-.2 1.6-1.2 2.7-2.7 3.3-.4.2-.9.3-1.3.4v1.6h7.2c2.7-2.3 4.4-5.7 4.4-9.5C42.8 5.9 37.2.4 30.4.4z"
                    opacity="1"
                    data-original="currentColor"
                ></path>
                <g fill="currentColor">
                    <path
                        d="M51.7 18.6c0-.9-.7-1.5-1.5-1.5h-5.9c-.3 1-.8 2-1.3 3h7.2c.9-.1 1.5-.7 1.5-1.5zM44.7 35.1h12.2c1.7 0 2.4-.7 2.4-2.4v-4.9c0-2.5-1.1-3.7-3.6-3.7h-48v-2.7c0-.8.6-1.4 1.5-1.5h8.6c-.5-.9-1-1.9-1.3-3H9c-2.4.1-4.2 2.1-4.2 4.5V59.6c0 2.7 1.1 3.8 3.9 3.8H55.8c2.2 0 3.4-1.3 3.5-3.3v-5.3c0-1.6-.7-2.3-2.2-2.3-4.2 0-8.3-.1-12.5 0-2.8 0-4.5-1.5-4.5-4.4v-8.5c-.1-2.9 1.5-4.5 4.6-4.5zM29.2 46.4c-1.7 2.5-3.5 4.6-5.4 6.5-.4.4-.9.7-1.4.7s-1-.2-1.4-.7c-1.9-1.9-3.6-4.1-5.4-6.5-.2-.3-.3-.7-.3-1 0-.2.1-.4.2-.7.2-.4.6-.8 1.5-.8h2.7c0-.4-.1-1-.2-1.7-.2-1.5-.4-3.4-.5-4.4-.1-1.1.3-2.1 1-2.8s1.6-1 2.5-1c2 0 3.6 1.8 3.5 3.8-.1 1-.3 2.7-.5 4.1-.1.7-.2 1.4-.2 1.9h2.6c.7 0 1.2.3 1.5.8.2.7.1 1.2-.2 1.8z"
                        fill="currentColor"
                        opacity="1"
                        data-original="currentColor"
                    ></path>
                </g>
            </g>
        </svg>
    );
};

const CheckCoin = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 96 96"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient
                    id="a"
                    x1="24"
                    x2="90"
                    y1="40.59"
                    y2="40.59"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffdc00"></stop>
                    <stop offset="1" stopColor="#fd5b00"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="b"
                    x1="18.04"
                    x2="18.04"
                    y1="63.32"
                    y2="74.32"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="c"
                    x1="16.5"
                    x2="16.5"
                    y1="52.32"
                    y2="63.32"
                ></linearGradient>
                <linearGradient
                    id="d"
                    x1="27"
                    x2="69"
                    y1="65.11"
                    y2="65.11"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#9afeac"></stop>
                    <stop offset="1" stopColor="#02b69c"></stop>
                </linearGradient>
                <path
                    fill="#d2ffe7"
                    d="m59.75 60.78-11.1 11.1a4.25 4.25 0 0 1-6 0l-6.39-6.39a3.32 3.32 0 1 1 4.69-4.71l4.71 4.71 9.41-9.41a3.32 3.32 0 1 1 4.69 4.7z"
                    opacity="1"
                    data-original="#d2ffe7"
                    className={className}
                ></path>
                <path
                    fill="#fea900"
                    d="M81.51 41.32A24.5 24.5 0 0 1 69 62.7V49l-7-3-14-5.89L43.61 42l-7.36 3.11L33 46.44a24 24 0 0 1-.54-5.12 24.51 24.51 0 0 1 49 0z"
                    opacity="1"
                    data-original="#fea900"
                    className={className}
                ></path>
                <path
                    fill="url(#a)"
                    d="M90 41.32a33 33 0 0 1-23.25 31.54A20 20 0 0 0 69 63.65v-.95a24.51 24.51 0 1 0-36.51-21.38 24 24 0 0 0 .51 5.12L27 49v6.1c-.42-.9-.79-1.83-1.12-2.77a33.14 33.14 0 0 1-.2-21.42L26 30a33 33 0 0 1 64 11.32z"
                    opacity="1"
                    data-original="url(#a)"
                    className={className}
                ></path>
                <path
                    fill="url(#a)"
                    d="M30.08 74.32H10a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4h17v.33a20 20 0 0 0 3.08 10.67z"
                    opacity="1"
                    data-original="url(#a)"
                    className={className}
                ></path>
                <path
                    fill="url(#a)"
                    d="M27 55.09v8.23H10a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4h15.88c.33.94.7 1.87 1.12 2.77z"
                    opacity="1"
                    data-original="url(#a)"
                    className={className}
                ></path>
                <path
                    fill="#fea900"
                    d="M32.2 12.2 26 30l-.32.92-6.54 18.72a4 4 0 0 1-5.09 2.46l-2.83-1A4 4 0 0 1 8.76 46L21.81 8.58a4 4 0 0 1 5.1-2.46l2.83 1a4 4 0 0 1 2.46 5.08z"
                    opacity="1"
                    data-original="#fea900"
                    className={className}
                ></path>
                <path
                    fill="#fffcdc"
                    d="M57 39.32c-2.24 0-4-1.51-4-3.36s1.82-3.35 4.07-3.35 4.07 1.5 4.07 3.35a2 2 0 0 0 4 0A7.52 7.52 0 0 0 59 28.85v-2.53a2 2 0 1 0-4 0v2.53A7.52 7.52 0 0 0 48.93 36c0 4.06 3.62 7.36 8.07 7.36 2.16 0 4 1.46 4 3.23a2 2 0 0 0 2 1.93h.08A2 2 0 0 0 65 46.44c-.09-4.01-3.63-7.12-8-7.12z"
                    opacity="1"
                    data-original="#fffcdc"
                ></path>
                <path
                    fill="url(#d)"
                    d="m62 46-14-5.89L43.61 42l-7.36 3.11L33 46.44 27 49v14.65a20 20 0 0 0 7.47 15.59L48 90.11l13.53-10.87A20 20 0 0 0 69 63.65V49zm-2.25 14.78-11.1 11.1a4.25 4.25 0 0 1-6 0l-6.39-6.39a3.32 3.32 0 1 1 4.69-4.71l4.71 4.71 9.41-9.41a3.32 3.32 0 1 1 4.69 4.7z"
                    opacity="1"
                    data-original="url(#d)"
                    className={className}
                ></path>
            </g>
        </svg>
    );
};

const Coin = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <ellipse
                    cx="256"
                    cy="256"
                    fill="#e88102"
                    rx="245"
                    ry="256"
                    opacity="1"
                    data-original="#e88102"
                    className={className}
                ></ellipse>
                <circle
                    cx="256"
                    cy="242.5"
                    r="242.5"
                    fill="#fdd835"
                    opacity="1"
                    data-original="#fdd835"
                    className={className}
                ></circle>
                <g fill="#fff">
                    <path
                        d="M352.8 20.1 33.6 339.2c-10.7-24.5-17.4-51.1-19.4-79L273.7.6c27.9 2.1 54.5 8.8 79.1 19.5zM467.3 123.5 137 453.8c-20.6-11.6-39.2-26.1-55.5-43L424.4 68c16.8 16.2 31.3 34.9 42.9 55.5zM414.5 58.9l-342 342c-5.3-6.2-10.4-12.7-15.1-19.4L395.1 43.8c6.7 4.7 13.2 9.8 19.4 15.1zM490.9 182 195.5 477.4c-8.9-2.3-17.6-5.1-26.1-8.3l313.2-313.2c3.2 8.5 6 17.2 8.3 26.1z"
                        opacity="1"
                        fill="#ffffff50"
                        data-original="#ffffff50"
                        className={className}
                    ></path>
                    <path
                        d="M498.5 242.5c0 1.7 0 3.3-.1 5C495.8 115.9 388.3 10 256 10S16.2 115.9 13.6 247.5c0-1.7-.1-3.3-.1-5C13.5 108.6 122.1 0 256 0s242.5 108.6 242.5 242.5z"
                        opacity="1"
                        fill="#ffffff50"
                        data-original="#ffffff50"
                        className={className}
                    ></path>
                    <path
                        d="M453 253c0 104.9-85.1 190-190 190-58.9 0-111.6-26.9-146.5-69 34.7 37.5 84.3 61 139.5 61 104.9 0 190-85.1 190-190 0-46-16.3-88.1-43.5-121 31.3 33.9 50.5 79.2 50.5 129z"
                        opacity="1"
                        fill="#ffffff50"
                        data-original="#ffffff50"
                        className={className}
                    ></path>
                </g>
                <circle
                    cx="256"
                    cy="245"
                    r="190"
                    fill="#f39e09"
                    opacity="1"
                    data-original="#f39e09"
                ></circle>
                <path
                    fill="#e88102"
                    d="M400 121c-33.3-28.7-76.6-46-124-46-104.9 0-190 85.1-190 190 0 47.4 17.3 90.7 46 124-40.4-34.9-66-86.4-66-144 0-104.9 85.1-190 190-190 57.5 0 109.1 25.6 144 66z"
                    opacity="1"
                    data-original="#e88102"
                    className={className}
                ></path>
                <path
                    fill="#db6704"
                    d="M244.1 196.6c-3.4 3.9-5.2 9.3-5.2 16.2s2 12.6 6 16.7 10.4 8 19.2 11.8c8.8 3.7 17.1 7.6 24.9 11.6s14.5 8.6 20.2 13.7 10.1 11.1 13.3 17.9c1.2 2.6 4.8 7.5 4.8 7.5v17.1c0 16.2-5.1 29.4-15.4 39.6s-24.2 16.2-41.9 17.9V395h-22.6v-28.7c-20.6-2.2-36.4-9.2-47.5-21.2-11-12-16.5-27.7-16.5-47.3v-15l47.8 15c0 10.8 2.4 19 7.2 24.6s11.6 8.4 20.4 8.4c6.4 0 11.5-1.9 15.2-5.8s5.5-9.1 5.5-15.8c0-7.5-1.8-13.3-5.5-17.6s-10.2-8.3-19.4-12.1c-9.3-3.8-17.8-7.6-25.7-11.5s-14.6-8.4-20.3-13.5-10-11-13.1-17.7c-3-6.7-4.5-14.8-4.5-24.4v-15.9s8.9-16.7 16.2-23.6c10.8-10.4 25.2-16.4 43.1-18.1V125h22.6v30.5c17.3 2.6 30.9 9.7 40.8 21.4 6.8 8 14.8 29.5 14.8 29.5v15h-48c0-9.8-1.9-17.4-5.7-22.7s-9.2-7.9-16.2-7.9c-6.2-.1-11 1.9-14.5 5.8z"
                    opacity="1"
                    data-original="#db6704"
                    className={className}
                ></path>
                <path
                    fill="#fdd835"
                    d="M279.5 294.3c0-7.5-1.8-13.3-5.5-17.6s-10.2-8.3-19.4-12.1c-9.3-3.8-17.8-7.6-25.7-11.5s-14.6-8.4-20.3-13.5-10-11-13.1-17.7c-3-6.7-4.5-14.9-4.5-24.4 0-16 5.4-29.2 16.2-39.5s25.2-16.4 43.1-18.1V110h22.6v30.5c17.3 2.6 30.9 9.7 40.8 21.4s14.8 26.5 14.8 44.5h-48c0-9.8-1.9-17.4-5.7-22.7s-9.2-7.9-16.2-7.9c-6.2 0-11.1 2-14.5 5.9s-5.2 9.3-5.2 16.2 2 12.6 6 16.7 10.4 8 19.1 11.8c8.8 3.7 17.1 7.6 24.9 11.6s14.5 8.6 20.2 13.7 10.1 11.1 13.3 17.9 4.8 15 4.8 24.5c0 16.2-5.1 29.4-15.4 39.6s-24.2 16.2-41.9 17.9V380h-22.6v-28.7c-20.6-2.2-36.4-9.2-47.5-21.2-11-12-16.5-27.7-16.5-47.3h47.8c0 10.8 2.4 19 7.2 24.6s11.6 8.4 20.4 8.4c6.4 0 11.5-1.9 15.2-5.8s5.6-9 5.6-15.7z"
                    opacity="1"
                    data-original="#fdd835"
                    className={className}
                ></path>
                <g fill="#fff">
                    <path
                        d="M207.2 158c5.8-5.6 12.7-9.9 20.6-13l-33.9 34c2.6-8 7-14.9 13.3-21zM262.8 110l-12.5 12.5V110zM322.1 268.7l-81.7 81.7c-17.2-2.9-30.7-9.7-40.4-20.2-6.3-6.9-10.8-15-13.5-24.3l23-23h21.8c0 10.8 2.4 19 7.2 24.6s11.6 8.4 20.4 8.4c6.4 0 11.5-1.9 15.2-5.8s5.5-9.1 5.5-15.8c0-7.5-1.8-13.3-5.5-17.6s-10.2-8.3-19.4-12.1c-6.6-2.7-12.8-5.4-18.7-8.2l29.6-29.6c8.3 3.6 16.1 7.2 23.5 11 7.8 4 14.5 8.6 20.2 13.7 5.4 5 9.7 10.7 12.8 17.2zM328.5 206.3H286l34.5-34.5c5.3 9.8 8 21.3 8 34.5zM183.5 282.8h7.1l-6.8 6.8c-.2-2.2-.3-4.5-.3-6.8zM244.9 214.5c2 2.1 4.6 4.1 7.9 6.1l-29.6 29.6c-5.5-3.1-10.4-6.6-14.6-10.5-1.7-1.5-3.2-3.1-4.6-4.7l35.1-35.1c.3 6 2.3 10.9 5.8 14.6zM312.7 160.7l-33.4 33.4c-.9-4.1-2.4-7.6-4.4-10.4-3-4.2-7-6.7-12-7.6l29.9-29.9c7.7 3.5 14.3 8.3 19.9 14.5zM258.4 380l11.6-11.6V380zM324.2 314.2c-2.5 7.4-6.6 13.8-12.2 19.4s-12.3 9.9-20.1 12.9z"
                        opacity="1"
                        fill="#ffffff50"
                        data-original="#ffffff50"
                        className={className}
                    ></path>
                    <path
                        d="M414.5 140.1c-123 43.2-221.8 138.1-270.2 258.6-4.2-3.1-8.3-6.3-12.3-9.8-28.7-33.3-46-76.6-46-123.9 0-104.9 85.1-190 190-190 47.4 0 90.7 17.3 123.9 46 5.3 6.1 10.1 12.5 14.6 19.1z"
                        opacity="1"
                        fill="#ffffff25"
                        data-original="#ffffff25"
                        className={className}
                    ></path>
                </g>
            </g>
        </svg>
    );
};

const VipFlag = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient
                    id="a"
                    x1="2.502"
                    x2="61.517"
                    y1="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffde00"></stop>
                    <stop offset="1" stopColor="#fd5900"></stop>
                </linearGradient>
                <path
                    fill="url(#a)"
                    d="m61.38 24.49-6.85 26.37a3.572 3.572 0 0 1-3.45 2.67H12.92a3.572 3.572 0 0 1-3.45-2.67L2.62 24.49a3.564 3.564 0 0 1 4.73-4.23l11.35 4.37a.575.575 0 0 0 .66-.18l9.83-12.6a3.55 3.55 0 0 1 5.62 0l9.83 12.6a.575.575 0 0 0 .66.18l11.35-4.37a3.591 3.591 0 0 1 4.73 4.23z"
                    opacity="1"
                    data-original="url(#a)"
                    className={className}
                ></path>
            </g>
        </svg>
    );
};

const ModernWallet = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient id="a">
                    <stop offset="0" stopColor="#f89580"></stop>
                    <stop offset="1" stopColor="#c4573a"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="f"
                    x1="57.171"
                    x2="406.981"
                    y1="313.044"
                    y2="313.044"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="g"
                    x1="79.262"
                    x2="79.262"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="h"
                    x1="117.758"
                    x2="117.758"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="i"
                    x1="156.253"
                    x2="156.253"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="j"
                    x1="194.748"
                    x2="194.748"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="k"
                    x1="233.243"
                    x2="233.243"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="l"
                    x1="271.738"
                    x2="271.738"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="m"
                    x1="310.233"
                    x2="310.233"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="n"
                    x1="348.728"
                    x2="348.728"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="o"
                    x1="387.223"
                    x2="387.223"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="p"
                    x1="425.718"
                    x2="425.718"
                    y1="217.47"
                    y2="208.535"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="q"
                    x1="79.262"
                    x2="79.262"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="r"
                    x1="117.758"
                    x2="117.758"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="s"
                    x1="156.253"
                    x2="156.253"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="t"
                    x1="194.748"
                    x2="194.748"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="u"
                    x1="233.243"
                    x2="233.243"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="v"
                    x1="271.738"
                    x2="271.738"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="w"
                    x1="310.233"
                    x2="310.233"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="x"
                    x1="348.728"
                    x2="348.728"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="y"
                    x1="387.223"
                    x2="387.223"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="z"
                    x1="425.718"
                    x2="425.718"
                    y1="491.523"
                    y2="482.588"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="b">
                    <stop offset="0" stopColor="#c4573a" stopOpacity="0"></stop>
                    <stop
                        offset=".235"
                        stopColor="#be5539"
                        stopOpacity=".235"
                    ></stop>
                    <stop
                        offset=".539"
                        stopColor="#ae4e35"
                        stopOpacity=".539"
                    ></stop>
                    <stop
                        offset=".879"
                        stopColor="#934330"
                        stopOpacity=".879"
                    ></stop>
                    <stop offset="1" stopColor="#883f2e"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="A"
                    x1="378.351"
                    x2="448.007"
                    y1="313.044"
                    y2="313.044"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="B"
                    x1="182.918"
                    x2="264.364"
                    y1="49.334"
                    y2="235.692"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="C"
                    x1="336.938"
                    x2="390.513"
                    y1="154.419"
                    y2="154.419"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="D"
                    x1="393.075"
                    x2="363.163"
                    y1="154.419"
                    y2="154.419"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="E"
                    x1="252.49"
                    x2="252.49"
                    y1="430.757"
                    y2="510.87"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="F"
                    x1="240.235"
                    x2="240.235"
                    y1="145.775"
                    y2="192.6"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="G"
                    x1="405.182"
                    x2="389.997"
                    y1="506.871"
                    y2="391.375"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="H"
                    x1="380.963"
                    x2="392.62"
                    y1="297.889"
                    y2="400.348"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="I"
                    x1="384.179"
                    x2="384.179"
                    y1="356.828"
                    y2="391.322"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="J"
                    x1="415.162"
                    x2="461.279"
                    y1="343.944"
                    y2="343.944"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="K"
                    x1="389.528"
                    x2="362.533"
                    y1="378.962"
                    y2="352.274"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    id="L"
                    x1="338.691"
                    x2="366.817"
                    y1="328.352"
                    y2="356.478"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#5a5a5a"></stop>
                    <stop offset="1" stopColor="#444"></stop>
                </linearGradient>
                <linearGradient id="c">
                    <stop offset="0" stopColor="#433f43" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#1a1a1a"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="M"
                    x1="354.282"
                    x2="354.282"
                    y1="344.266"
                    y2="374.251"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="N"
                    x1="-613.315"
                    x2="-613.315"
                    y1="-469.459"
                    y2="-437.896"
                    gradientTransform="rotate(-45 853.025 -1230.85)"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="d">
                    <stop offset="0" stopColor="#bbec6c"></stop>
                    <stop offset=".289" stopColor="#abdc59"></stop>
                    <stop offset=".866" stopColor="#82b32a"></stop>
                    <stop offset="1" stopColor="#78a91f"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="O"
                    x1="218.86"
                    x2="333.196"
                    y1="24.873"
                    y2="201.172"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="e">
                    <stop offset="0" stopColor="#334c0f" stopOpacity="0"></stop>
                    <stop
                        offset=".32"
                        stopColor="#344c12"
                        stopOpacity=".32"
                    ></stop>
                    <stop
                        offset=".565"
                        stopColor="#374a1c"
                        stopOpacity=".565"
                    ></stop>
                    <stop
                        offset=".786"
                        stopColor="#3c482c"
                        stopOpacity=".786"
                    ></stop>
                    <stop
                        offset=".991"
                        stopColor="#444443"
                        stopOpacity=".991"
                    ></stop>
                    <stop offset="1" stopColor="#444"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="P"
                    x1="205.362"
                    x2="209.504"
                    y1="-40.207"
                    y2="109.34"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="Q"
                    x1="332.943"
                    x2="337.084"
                    y1="-43.74"
                    y2="105.807"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="R"
                    x1="137.501"
                    x2="334.711"
                    y1="-27.438"
                    y2="204.12"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="S"
                    x1="330.863"
                    x2="370.245"
                    y1="97.377"
                    y2="97.377"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="T"
                    x1="270.07"
                    x2="270.07"
                    y1="146.272"
                    y2="199.214"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="U"
                    x1="376.05"
                    x2="288.163"
                    y1="126.474"
                    y2="126.474"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="V"
                    x1="159.755"
                    x2="254.851"
                    y1="63.845"
                    y2="210.477"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="W"
                    x1="137.814"
                    x2="141.956"
                    y1="11.699"
                    y2="161.246"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="X"
                    x1="265.395"
                    x2="269.536"
                    y1="8.166"
                    y2="157.713"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="Y"
                    x1="96.898"
                    x2="253.654"
                    y1="30.154"
                    y2="214.211"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="Z"
                    x1="263.315"
                    x2="302.697"
                    y1="123.33"
                    y2="123.33"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="aa"
                    x1="202.522"
                    x2="202.522"
                    y1="165.255"
                    y2="197.468"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <path
                    fill="url(#f)"
                    d="M424.613 194.755h-25.6v-54.19c0-14.622-11.854-26.476-26.476-26.476H94.224c-22.275 0-40.333 18.058-40.333 40.333 0 .696 0 .696 0 0v317.245c0 22.275 18.058 40.333 40.333 40.333h330.389c14.622 0 26.476-11.854 26.476-26.476V221.231c.001-14.622-11.853-26.476-26.476-26.476z"
                    opacity="1"
                    data-original="url(#f)"
                    className={className}
                ></path>
                <path
                    fill="url(#g)"
                    d="M87.875 218.363H70.65a4.468 4.468 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 .001 8.936z"
                    opacity="1"
                    data-original="url(#g)"
                ></path>
                <path
                    fill="url(#h)"
                    d="M126.37 218.363h-17.224a4.468 4.468 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 0 8.936z"
                    opacity="1"
                    data-original="url(#h)"
                ></path>
                <path
                    fill="url(#i)"
                    d="M164.865 218.363H147.64a4.468 4.468 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 .001 8.936z"
                    opacity="1"
                    data-original="url(#i)"
                ></path>
                <path
                    fill="url(#j)"
                    d="M203.36 218.363h-17.224a4.468 4.468 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 0 8.936z"
                    opacity="1"
                    data-original="url(#j)"
                ></path>
                <path
                    fill="url(#k)"
                    d="M241.855 218.363h-17.224a4.468 4.468 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 0 8.936z"
                    opacity="1"
                    data-original="url(#k)"
                ></path>
                <path
                    fill="url(#l)"
                    d="M280.35 218.363h-17.224a4.468 4.468 0 0 1 0-8.936h17.224c2.467 0 4.467 2 4.467 4.468a4.466 4.466 0 0 1-4.467 4.468z"
                    opacity="1"
                    data-original="url(#l)"
                ></path>
                <path
                    fill="url(#m)"
                    d="M318.845 218.363h-17.224a4.468 4.468 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 0 8.936z"
                    opacity="1"
                    data-original="url(#m)"
                ></path>
                <path
                    fill="url(#n)"
                    d="M357.34 218.363h-17.224a4.467 4.467 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 0 8.936z"
                    opacity="1"
                    data-original="url(#n)"
                ></path>
                <path
                    fill="url(#o)"
                    d="M395.836 218.363h-17.224a4.467 4.467 0 0 1 0-8.936h17.224a4.468 4.468 0 0 1 0 8.936z"
                    opacity="1"
                    data-original="url(#o)"
                ></path>
                <path
                    fill="url(#p)"
                    d="M434.331 218.363h-17.224a4.467 4.467 0 0 1 0-8.936h17.224c2.467 0 4.467 2 4.467 4.468s-2 4.468-4.467 4.468z"
                    opacity="1"
                    data-original="url(#p)"
                ></path>
                <path
                    fill="url(#q)"
                    d="M87.875 492.416H70.65a4.468 4.468 0 0 1 0-8.935h17.224a4.468 4.468 0 0 1 .001 8.935z"
                    opacity="1"
                    data-original="url(#q)"
                ></path>
                <path
                    fill="url(#r)"
                    d="M126.37 492.416h-17.224a4.468 4.468 0 0 1 0-8.935h17.224a4.468 4.468 0 1 1 0 8.935z"
                    opacity="1"
                    data-original="url(#r)"
                ></path>
                <path
                    fill="url(#s)"
                    d="M164.865 492.416H147.64a4.468 4.468 0 0 1 0-8.935h17.224a4.468 4.468 0 0 1 .001 8.935z"
                    opacity="1"
                    data-original="url(#s)"
                ></path>
                <path
                    fill="url(#t)"
                    d="M203.36 492.416h-17.224a4.468 4.468 0 0 1 0-8.935h17.224a4.468 4.468 0 1 1 0 8.935z"
                    opacity="1"
                    data-original="url(#t)"
                ></path>
                <path
                    fill="url(#u)"
                    d="M241.855 492.416h-17.224a4.468 4.468 0 0 1 0-8.935h17.224a4.468 4.468 0 1 1 0 8.935z"
                    opacity="1"
                    data-original="url(#u)"
                ></path>
                <path
                    fill="url(#v)"
                    d="M280.35 492.416h-17.224a4.468 4.468 0 0 1 0-8.935h17.224a4.467 4.467 0 0 1 0 8.935z"
                    opacity="1"
                    data-original="url(#v)"
                ></path>
                <path
                    fill="url(#w)"
                    d="M318.845 492.416h-17.224a4.468 4.468 0 0 1 0-8.935h17.224a4.468 4.468 0 1 1 0 8.935z"
                    opacity="1"
                    data-original="url(#w)"
                ></path>
                <path
                    fill="url(#x)"
                    d="M357.34 492.416h-17.224a4.467 4.467 0 0 1 0-8.935h17.224a4.468 4.468 0 1 1 0 8.935z"
                    opacity="1"
                    data-original="url(#x)"
                ></path>
                <path
                    fill="url(#y)"
                    d="M395.836 492.416h-17.224a4.467 4.467 0 0 1 0-8.935h17.224a4.468 4.468 0 1 1 0 8.935z"
                    opacity="1"
                    data-original="url(#y)"
                ></path>
                <path
                    fill="url(#z)"
                    d="M434.331 492.416h-17.224a4.467 4.467 0 0 1 0-8.935h17.224a4.467 4.467 0 0 1 0 8.935z"
                    opacity="1"
                    data-original="url(#z)"
                ></path>
                <path
                    fill="url(#A)"
                    d="M424.613 194.755h-25.6v-54.19c0-14.622-11.854-26.476-26.476-26.476H199.355V512h225.258c14.622 0 26.476-11.854 26.476-26.476V221.231c.001-14.622-11.853-26.476-26.476-26.476z"
                    opacity="1"
                    data-original="url(#A)"
                ></path>
                <path
                    fill="url(#B)"
                    d="M399.013 194.755H94.224c-22.275 0-40.333-18.058-40.333-40.333s18.058-40.333 40.333-40.333h278.312c14.623 0 26.476 11.854 26.476 26.476v54.19z"
                    opacity="1"
                    data-original="url(#B)"
                ></path>
                <path
                    fill="url(#C)"
                    d="M399.011 140.567v54.182h-98.887V114.09h72.41c14.626 0 26.477 11.851 26.477 26.477z"
                    opacity="1"
                    data-original="url(#C)"
                ></path>
                <path
                    fill="url(#D)"
                    d="M399.011 140.567v54.182h-98.887V114.09h72.41c14.626 0 26.477 11.851 26.477 26.477z"
                    opacity="1"
                    data-original="url(#D)"
                ></path>
                <path
                    fill="url(#E)"
                    d="M53.891 373.87v97.796c0 22.275 18.058 40.333 40.333 40.333h330.389c14.622 0 26.476-11.854 26.476-26.476V373.87z"
                    opacity="1"
                    data-original="url(#E)"
                ></path>
                <path
                    fill="url(#F)"
                    d="M81.456 165.586c0 16.098 13.05 29.149 29.148 29.15l288.409.019v-54.19c0-1.408-.142-2.78-.354-4.128H110.606c-16.099-.001-29.15 13.05-29.15 29.149z"
                    opacity="1"
                    data-original="url(#F)"
                ></path>
                <path
                    fill="url(#G)"
                    d="M325.781 379.497 446.584 500.3a26.353 26.353 0 0 0 4.505-14.777V379.497z"
                    opacity="1"
                    data-original="url(#G)"
                ></path>
                <path
                    fill="url(#H)"
                    d="M447.372 392.412h-88.654c-26.768 0-48.468-21.7-48.468-48.468s21.7-48.468 48.468-48.468h88.654c5.93 0 10.737 4.807 10.737 10.737v75.464c0 5.928-4.807 10.735-10.737 10.735z"
                    opacity="1"
                    data-original="url(#H)"
                ></path>
                <path
                    fill="url(#I)"
                    d="M312.742 328.605a48.388 48.388 0 0 0-2.492 15.338c0 26.768 21.7 48.468 48.468 48.468h88.654c5.93 0 10.737-4.807 10.737-10.737v-53.07H312.742z"
                    opacity="1"
                    data-original="url(#I)"
                ></path>
                <path
                    fill="url(#J)"
                    d="M447.372 295.475H376.51v96.937h70.862c5.93 0 10.737-4.807 10.737-10.737v-75.464c0-5.929-4.807-10.736-10.737-10.736z"
                    opacity="1"
                    data-original="url(#J)"
                ></path>
                <path
                    fill="url(#K)"
                    d="M366.703 392.412h72.095l-66.492-66.492-36.047 36.047z"
                    opacity="1"
                    data-original="url(#K)"
                ></path>
                <circle
                    cx="354.282"
                    cy="343.944"
                    r="25.489"
                    fill="url(#L)"
                    opacity="1"
                    data-original="url(#L)"
                ></circle>
                <path
                    fill="url(#M)"
                    d="M328.793 343.944c0 14.077 11.412 25.489 25.489 25.489s25.489-11.412 25.489-25.489c0-3.049-.537-5.972-1.519-8.682h-47.941a25.456 25.456 0 0 0-1.518 8.682z"
                    opacity="1"
                    data-original="url(#M)"
                ></path>
                <path
                    fill="url(#N)"
                    d="M336.259 361.967c9.954 9.954 26.093 9.954 36.047 0s9.954-26.093 0-36.047a25.429 25.429 0 0 0-7.213-5.065l-33.9 33.9a25.462 25.462 0 0 0 5.066 7.212z"
                    opacity="1"
                    data-original="url(#N)"
                ></path>
                <path
                    fill="url(#O)"
                    d="M364.192 194.755H175.948V18.352C175.948 8.216 184.164 0 194.3 0h151.54c10.135 0 18.352 8.216 18.352 18.352z"
                    opacity="1"
                    data-original="url(#O)"
                ></path>
                <circle
                    cx="207.315"
                    cy="30.293"
                    r="14.955"
                    fill="url(#P)"
                    opacity="1"
                    data-original="url(#P)"
                ></circle>
                <circle
                    cx="334.993"
                    cy="30.293"
                    r="14.955"
                    fill="url(#Q)"
                    opacity="1"
                    data-original="url(#Q)"
                ></circle>
                <path
                    fill="url(#R)"
                    d="M337.618 64.904v129.845H202.532V64.903c0-4.301 3.121-7.866 7.341-8.7a28.16 28.16 0 0 0 14.515-7.768 28.235 28.235 0 0 0 7.758-14.482c.813-4.075 4.463-6.96 8.618-6.96h58.613c4.158 0 7.808 2.889 8.62 6.967a28.204 28.204 0 0 0 7.752 14.476 28.228 28.228 0 0 0 14.528 7.768c4.22.833 7.341 4.398 7.341 8.7z"
                    opacity="1"
                    data-original="url(#R)"
                ></path>
                <path
                    fill="url(#S)"
                    d="M345.84 0h-78.937v194.755h97.289V18.352C364.192 8.216 355.976 0 345.84 0z"
                    opacity="1"
                    data-original="url(#S)"
                ></path>
                <path
                    fill="url(#T)"
                    d="M175.948 62.182h188.244v132.572H175.948z"
                    opacity="1"
                    data-original="url(#T)"
                ></path>
                <path
                    fill="url(#U)"
                    d="M292.114 194.755h72.078v-64.484l-72.078-72.078z"
                    opacity="1"
                    data-original="url(#U)"
                ></path>
                <path
                    fill="url(#V)"
                    d="M296.644 194.755H108.4V70.257c0-10.135 8.216-18.352 18.352-18.352h151.541c10.135 0 18.352 8.216 18.352 18.352v124.498z"
                    opacity="1"
                    data-original="url(#V)"
                ></path>
                <circle
                    cx="139.766"
                    cy="82.199"
                    r="14.955"
                    fill="url(#W)"
                    opacity="1"
                    data-original="url(#W)"
                ></circle>
                <circle
                    cx="267.445"
                    cy="82.199"
                    r="14.955"
                    fill="url(#X)"
                    opacity="1"
                    data-original="url(#X)"
                ></circle>
                <path
                    fill="url(#Y)"
                    d="M270.07 116.809v77.939H134.984v-77.939c0-4.301 3.121-7.866 7.341-8.7a28.16 28.16 0 0 0 14.515-7.768 28.235 28.235 0 0 0 7.758-14.482c.813-4.075 4.463-6.96 8.618-6.96h58.613c4.158 0 7.808 2.889 8.619 6.967a28.204 28.204 0 0 0 7.752 14.476 28.228 28.228 0 0 0 14.528 7.768c4.221.833 7.342 4.398 7.342 8.699z"
                    opacity="1"
                    data-original="url(#Y)"
                ></path>
                <path
                    fill="url(#Z)"
                    d="M278.292 51.906h-78.937v142.849h97.289V70.257c0-10.135-8.217-18.351-18.352-18.351z"
                    opacity="1"
                    data-original="url(#Z)"
                ></path>
                <path
                    fill="url(#aa)"
                    d="M108.4 114.088h188.244v80.667H108.4z"
                    opacity="1"
                    data-original="url(#aa)"
                ></path>
            </g>
        </svg>
    );
};

const MoneyBag = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 510 510"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient id="a">
                    <stop offset="0" stopColor="#e4f2ff"></stop>
                    <stop offset="1" stopColor="#b2cbff"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="k"
                    x1="420.881"
                    x2="420.881"
                    y1="388.704"
                    y2="435.379"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="b">
                    <stop offset="0" stopColor="#3f3ced" stopOpacity="0"></stop>
                    <stop
                        offset=".28"
                        stopColor="#3c3de4"
                        stopOpacity=".28"
                    ></stop>
                    <stop
                        offset=".731"
                        stopColor="#3541cc"
                        stopOpacity=".731"
                    ></stop>
                    <stop offset="1" stopColor="#2f43bb"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="l"
                    x1="420.881"
                    x2="420.881"
                    y1="389.38"
                    y2="467.878"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="c">
                    <stop offset="0" stopColor="#fff" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#fff"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="m"
                    x1="420.688"
                    x2="402.076"
                    y1="401.956"
                    y2="356.949"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="n"
                    x1="420.881"
                    x2="420.881"
                    y1="352.704"
                    y2="399.379"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="o"
                    x1="420.881"
                    x2="420.881"
                    y1="353.381"
                    y2="431.878"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="p"
                    x1="420.688"
                    x2="402.076"
                    y1="365.956"
                    y2="320.949"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="q"
                    x1="420.881"
                    x2="420.881"
                    y1="316.704"
                    y2="363.379"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="r"
                    x1="420.881"
                    x2="420.881"
                    y1="317.381"
                    y2="395.878"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="s"
                    x1="420.688"
                    x2="402.076"
                    y1="329.956"
                    y2="284.949"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="t"
                    x1="420.881"
                    x2="420.881"
                    y1="280.704"
                    y2="327.379"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="u"
                    x1="420.881"
                    x2="420.881"
                    y1="281.381"
                    y2="359.878"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="v"
                    x1="420.688"
                    x2="402.076"
                    y1="293.956"
                    y2="248.95"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="w"
                    x1="420.881"
                    x2="420.881"
                    y1="244.704"
                    y2="291.379"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="x"
                    x1="420.881"
                    x2="420.881"
                    y1="245.381"
                    y2="323.878"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="y"
                    x1="420.688"
                    x2="402.076"
                    y1="257.956"
                    y2="212.95"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="z"
                    x1="420.881"
                    x2="420.881"
                    y1="208.704"
                    y2="255.38"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="A"
                    x1="420.881"
                    x2="420.881"
                    y1="209.381"
                    y2="287.879"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="B"
                    x1="420.688"
                    x2="402.076"
                    y1="221.956"
                    y2="176.95"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="C"
                    x1="420.881"
                    x2="420.881"
                    y1="172.705"
                    y2="219.38"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="D"
                    x1="420.881"
                    x2="420.881"
                    y1="173.381"
                    y2="251.879"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="E"
                    x1="420.688"
                    x2="402.076"
                    y1="185.957"
                    y2="140.95"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="F"
                    x1="420.881"
                    x2="420.881"
                    y1="136.705"
                    y2="183.38"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="G"
                    x1="420.881"
                    x2="420.881"
                    y1="137.382"
                    y2="215.879"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="H"
                    x1="420.688"
                    x2="402.076"
                    y1="149.957"
                    y2="104.95"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="d">
                    <stop offset="0" stopColor="#4ab272"></stop>
                    <stop offset=".339" stopColor="#47b071"></stop>
                    <stop offset=".55" stopColor="#3fa870"></stop>
                    <stop offset=".727" stopColor="#309b6d"></stop>
                    <stop offset=".884" stopColor="#1c8869"></stop>
                    <stop offset="1" stopColor="#077565"></stop>
                </linearGradient>
                <radialGradient
                    xlinkHref="#d"
                    id="I"
                    cx="198.573"
                    cy="207.029"
                    r="337.577"
                    gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <linearGradient id="e">
                    <stop offset="0" stopColor="#005a01" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#005a01"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="J"
                    x1="134.63"
                    x2="123.816"
                    y1="363.216"
                    y2="700.27"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="K"
                    x1="233.072"
                    x2="281.14"
                    y1="429.623"
                    y2="613.08"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="L"
                    x1="381.797"
                    x2="364.173"
                    y1="426.02"
                    y2="651.936"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="f">
                    <stop offset="0" stopColor="#91f27f" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#ffed82"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#f"
                    id="M"
                    x1="235.205"
                    x2="9.29"
                    y1="294.097"
                    y2="-109.666"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="N"
                    x1="392.795"
                    x2="106.518"
                    y1="372.285"
                    y2="210.302"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="g">
                    <stop offset="0" stopColor="#ffc738"></stop>
                    <stop offset=".188" stopColor="#fdbf3c"></stop>
                    <stop offset=".484" stopColor="#f7a848"></stop>
                    <stop offset=".849" stopColor="#ed835b"></stop>
                    <stop offset="1" stopColor="#e97264"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#g"
                    id="O"
                    x1="225.851"
                    x2="382.661"
                    y1="245.548"
                    y2="380.729"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="P"
                    x1="240.563"
                    x2="293.437"
                    y1="-15.177"
                    y2="96.579"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="Q"
                    x1="257.93"
                    x2="329.229"
                    y1="43.815"
                    y2="154.369"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="R"
                    x1="261.424"
                    x2="265.029"
                    y1="3.731"
                    y2="39.18"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#f"
                    id="S"
                    x1="245.783"
                    x2="109.392"
                    y1="47.352"
                    y2="44.949"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#g"
                    id="T"
                    x1="258.657"
                    x2="258.657"
                    y1="87.663"
                    y2="104.657"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#e"
                    id="U"
                    x1="245.471"
                    x2="139.724"
                    y1="403.068"
                    y2="394.256"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="h">
                    <stop offset="0" stopColor="#ffd945"></stop>
                    <stop offset=".304" stopColor="#ffcd3e"></stop>
                    <stop offset=".856" stopColor="#ffad2b"></stop>
                    <stop offset="1" stopColor="#ffa325"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="V"
                    x1="89.119"
                    x2="89.119"
                    y1="474.742"
                    y2="521.417"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="i">
                    <stop offset="0" stopColor="#e87264" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#ff7044"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="W"
                    x1="89.119"
                    x2="89.119"
                    y1="475.419"
                    y2="553.916"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="j">
                    <stop offset="0" stopColor="#ffd945" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#fbed21"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="X"
                    x1="88.925"
                    x2="70.314"
                    y1="487.994"
                    y2="442.987"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="Y"
                    x1="89.119"
                    x2="89.119"
                    y1="438.742"
                    y2="485.417"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="Z"
                    x1="89.119"
                    x2="89.119"
                    y1="439.419"
                    y2="517.916"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="aa"
                    x1="88.925"
                    x2="70.314"
                    y1="451.994"
                    y2="406.988"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="ab"
                    x1="89.119"
                    x2="89.119"
                    y1="402.742"
                    y2="449.417"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="ac"
                    x1="89.119"
                    x2="89.119"
                    y1="403.419"
                    y2="481.916"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="ad"
                    x1="88.925"
                    x2="70.314"
                    y1="415.994"
                    y2="370.988"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="ae"
                    x1="89.119"
                    x2="89.119"
                    y1="366.742"
                    y2="413.418"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="af"
                    x1="89.119"
                    x2="89.119"
                    y1="367.419"
                    y2="445.917"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="ag"
                    x1="88.925"
                    x2="70.314"
                    y1="379.994"
                    y2="334.988"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="ah"
                    x1="89.119"
                    x2="89.119"
                    y1="330.743"
                    y2="377.418"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="ai"
                    x1="89.119"
                    x2="89.119"
                    y1="331.419"
                    y2="409.917"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="aj"
                    x1="88.925"
                    x2="70.314"
                    y1="343.995"
                    y2="298.988"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="ak"
                    x1="89.119"
                    x2="89.119"
                    y1="294.743"
                    y2="341.418"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="al"
                    x1="89.119"
                    x2="89.119"
                    y1="295.419"
                    y2="373.917"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="am"
                    x1="88.925"
                    x2="70.314"
                    y1="307.995"
                    y2="262.988"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="an"
                    x1="383.464"
                    x2="383.464"
                    y1="474.742"
                    y2="521.417"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="ao"
                    x1="383.464"
                    x2="383.464"
                    y1="475.419"
                    y2="553.916"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="ap"
                    x1="383.27"
                    x2="364.659"
                    y1="487.994"
                    y2="442.987"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="aq"
                    x1="383.464"
                    x2="383.464"
                    y1="438.742"
                    y2="485.417"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#i"
                    id="ar"
                    x1="383.464"
                    x2="383.464"
                    y1="439.419"
                    y2="517.916"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#j"
                    id="as"
                    x1="383.27"
                    x2="364.659"
                    y1="451.994"
                    y2="406.988"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="at"
                    x1="36.078"
                    x2="83.442"
                    y1="184.086"
                    y2="247.239"
                    gradientTransform="translate(.612 1.309)"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="au"
                    x1="112.252"
                    x2="145.746"
                    y1="54.853"
                    y2="99.512"
                    gradientTransform="translate(.612 1.309)"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#h"
                    id="av"
                    x1="400.665"
                    x2="434.16"
                    y1="78.959"
                    y2="123.618"
                    gradientTransform="translate(.612 1.309)"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <path
                    fill="url(#k)"
                    d="M499.37 423.962H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134c0 3-2.432 5.433-5.433 5.433z"
                    opacity="1"
                    data-original="url(#k)"
                ></path>
                <path
                    fill="url(#l)"
                    d="M479.443 423.962H362.319a4.718 4.718 0 0 1-4.718-4.718V392.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#l)"
                ></path>
                <path
                    fill="url(#l)"
                    d="M441.047 423.962h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#l)"
                ></path>
                <path
                    fill="url(#m)"
                    d="M347.13 392.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#m)"
                ></path>
                <path
                    fill="url(#n)"
                    d="M499.37 387.962H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134c0 3-2.432 5.433-5.433 5.433z"
                    opacity="1"
                    data-original="url(#n)"
                ></path>
                <path
                    fill="url(#o)"
                    d="M479.443 387.962H362.319a4.718 4.718 0 0 1-4.718-4.718V356.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.565a4.717 4.717 0 0 1-4.718 4.717z"
                    opacity="1"
                    data-original="url(#o)"
                ></path>
                <path
                    fill="url(#o)"
                    d="M441.047 387.962h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#o)"
                ></path>
                <path
                    fill="url(#p)"
                    d="M347.13 356.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.022.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.347 5.347 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#p)"
                ></path>
                <path
                    fill="url(#q)"
                    d="M499.37 351.962H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134a5.432 5.432 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#q)"
                ></path>
                <path
                    fill="url(#r)"
                    d="M479.443 351.962H362.319a4.718 4.718 0 0 1-4.718-4.718V320.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#r)"
                ></path>
                <path
                    fill="url(#r)"
                    d="M441.047 351.962h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#r)"
                ></path>
                <path
                    fill="url(#s)"
                    d="M347.13 320.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#s)"
                ></path>
                <path
                    fill="url(#t)"
                    d="M499.37 315.962H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134a5.432 5.432 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#t)"
                ></path>
                <path
                    fill="url(#u)"
                    d="M479.443 315.962H362.319a4.718 4.718 0 0 1-4.718-4.718V284.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.565a4.717 4.717 0 0 1-4.718 4.717z"
                    opacity="1"
                    data-original="url(#u)"
                ></path>
                <path
                    fill="url(#u)"
                    d="M441.047 315.962h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#u)"
                ></path>
                <path
                    fill="url(#v)"
                    d="M347.13 284.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.022.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.347 5.347 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#v)"
                ></path>
                <path
                    fill="url(#w)"
                    d="M499.37 279.962H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134a5.432 5.432 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#w)"
                ></path>
                <path
                    fill="url(#x)"
                    d="M479.443 279.962H362.319a4.718 4.718 0 0 1-4.718-4.718V248.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#x)"
                ></path>
                <path
                    fill="url(#x)"
                    d="M441.047 279.962h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#x)"
                ></path>
                <path
                    fill="url(#y)"
                    d="M347.13 248.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#y)"
                ></path>
                <path
                    fill="url(#z)"
                    d="M499.37 243.962H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134a5.432 5.432 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#z)"
                ></path>
                <path
                    fill="url(#A)"
                    d="M479.443 243.962H362.319a4.718 4.718 0 0 1-4.718-4.718V212.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#A)"
                ></path>
                <path
                    fill="url(#A)"
                    d="M441.047 243.962h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#A)"
                ></path>
                <path
                    fill="url(#B)"
                    d="M347.13 212.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.021.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#B)"
                ></path>
                <path
                    fill="url(#C)"
                    d="M499.37 207.963H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134c0 3-2.432 5.433-5.433 5.433z"
                    opacity="1"
                    data-original="url(#C)"
                ></path>
                <path
                    fill="url(#D)"
                    d="M479.443 207.963H362.319a4.718 4.718 0 0 1-4.718-4.718V176.68a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.719z"
                    opacity="1"
                    data-original="url(#D)"
                ></path>
                <path
                    fill="url(#D)"
                    d="M441.047 207.963h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#D)"
                ></path>
                <path
                    fill="url(#E)"
                    d="M347.13 176.342c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#E)"
                ></path>
                <path
                    fill="url(#F)"
                    d="M499.37 171.963H342.392c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433H499.37c3 0 5.433 2.432 5.433 5.433v25.134c0 3-2.432 5.433-5.433 5.433z"
                    opacity="1"
                    data-original="url(#F)"
                ></path>
                <path
                    fill="url(#G)"
                    d="M479.443 171.963H362.319a4.718 4.718 0 0 1-4.718-4.718v-26.564a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#G)"
                ></path>
                <path
                    fill="url(#G)"
                    d="M441.047 171.963h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#G)"
                ></path>
                <path
                    fill="url(#H)"
                    d="M347.13 140.343c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.021.395.034.597.034H499.37c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#H)"
                ></path>
                <path
                    fill="url(#I)"
                    d="m417.693 267.673-14.426-75.654c-10.76-56.43-60.101-97.252-117.548-97.252h-54.124c-57.447 0-106.788 40.822-117.548 97.252l-8.179 42.893c-7.86 41.22-20.424 81.546-39.214 119.067-5.494 10.97-8.379 23.472-7.838 36.698 1.563 38.265 35.24 71.191 73.53 71.94l.841.012c17.372.15 34.098 6.92 46.281 19.305 13.616 13.842 32.556 22.427 53.509 22.427 25.429 0 47.899-12.642 61.483-31.981 4.373-6.226 11.545-9.764 19.154-9.749h.132c3.269 0 6.481-.242 9.62-.708 5.92-.877 11.909.634 16.796 4.09 13.217 9.349 29.583 14.539 47.201 13.647 37.704-1.908 68.46-32.09 71.022-69.755.922-13.552-1.759-26.397-7.177-37.679-15.902-33.114-26.635-68.47-33.515-104.553z"
                    opacity="1"
                    data-original="url(#I)"
                ></path>
                <circle
                    cx="133.85"
                    cy="387.531"
                    r="75.099"
                    fill="url(#J)"
                    opacity="1"
                    data-original="url(#J)"
                ></circle>
                <circle
                    cx="232.977"
                    cy="429.261"
                    r="75.099"
                    fill="url(#K)"
                    opacity="1"
                    data-original="url(#K)"
                ></circle>
                <circle
                    cx="383.464"
                    cy="404.66"
                    r="75.099"
                    fill="url(#L)"
                    opacity="1"
                    data-original="url(#L)"
                ></circle>
                <path
                    fill="url(#M)"
                    d="M458.384 409.905c.922-13.552-1.759-26.397-7.177-37.679-15.902-33.114-26.634-68.47-33.514-104.554l-14.426-75.654c-3.904-20.476-12.908-38.879-25.515-54.041-20.866-17.277-47.576-27.494-76.316-27.494h-54.125c-57.446 0-106.788 40.822-117.548 97.252l-8.179 42.893c-7.86 41.22-20.424 81.546-39.214 119.066-5.494 10.97-8.379 23.472-7.839 36.698.615 15.055 6.216 29.272 15.098 41.039 12.223 9.206 27.083 14.878 42.716 15.184l.841.012c17.372.15 34.099 6.92 46.282 19.305 13.616 13.842 32.556 22.427 53.509 22.427 25.429 0 47.899-12.642 61.483-31.981 4.373-6.226 11.545-9.764 19.154-9.749h.132c3.269 0 6.481-.242 9.62-.708 5.92-.877 11.909.634 16.796 4.09 13.217 9.349 29.583 14.539 47.201 13.647 37.703-1.906 68.46-32.088 71.021-69.753z"
                    opacity="1"
                    data-original="url(#M)"
                ></path>
                <path
                    fill="url(#N)"
                    d="M302.289 183.171c-5.437-1.682-10.603-2.893-15.496-3.64-2.36-.361-4.744-.653-7.147-.883l-.058-.033-11.009-11.402c-2.174-1.419-4.532-2.133-7.068-2.133-2.902 0-5.348.676-7.34 2.018-1.996 1.346-2.99 2.944-2.99 4.787v7.059c-15.767 2.217-28.772 8.041-39.009 17.466-10.242 9.425-15.359 22.359-15.359 38.806 0 6.707 1.177 12.824 3.533 18.35 2.354 5.53 5.073 10.058 8.157 13.592l42.679 42.718v25.379c-7.068-1.266-14.773-4.847-23.106-10.738-8.339-5.887-14.23-8.835-17.671-8.835-4.893 0-9.199 2.54-12.913 7.612-3.716 5.076-5.572 10.152-5.572 15.224 0 6.61 3.243 12.716 9.718 18.321l106.426 106.426c1.8-.421 3.662-.638 5.552-.634h.132c3.269 0 6.481-.242 9.62-.708 5.92-.877 11.909.634 16.796 4.09 13.217 9.349 29.583 14.539 47.201 13.647 37.704-1.908 68.46-32.09 71.022-69.755.922-13.552-1.759-26.397-7.177-37.679-11.067-23.046-19.624-47.18-26.128-71.888L315.473 190.732c-3.356-3.36-7.747-5.879-13.184-7.561z"
                    opacity="1"
                    data-original="url(#N)"
                ></path>
                <path
                    fill="url(#O)"
                    d="M321.998 294.208c-2.27-5.798-4.987-10.603-8.156-14.408-3.174-3.806-7.387-7.429-12.642-10.874-5.258-3.441-9.968-6.069-14.136-7.883-4.17-1.81-9.242-3.895-15.222-6.253V215.1c6.523.544 12.819 2.357 18.893 5.437 6.07 3.084 10.373 4.622 12.913 4.622 5.254 0 9.379-2.579 12.369-7.735 2.99-5.157 4.485-10.135 4.485-14.926 0-4.481-1.677-8.401-5.029-11.766-3.356-3.36-7.747-5.878-13.184-7.561-5.437-1.682-10.603-2.893-15.496-3.64a130.788 130.788 0 0 0-14.951-1.402v-6.274c0-1.674-1.088-3.22-3.263-4.643-2.174-1.419-4.532-2.132-7.068-2.132-2.902 0-5.348.676-7.34 2.018-1.996 1.346-2.99 2.944-2.99 4.787v7.059c-15.767 2.217-28.772 8.041-39.009 17.466-10.242 9.425-15.359 22.359-15.359 38.806 0 6.707 1.176 12.824 3.533 18.35 2.354 5.53 5.073 10.058 8.157 13.592 3.079 3.534 7.429 6.979 13.048 10.33 5.615 3.356 10.331 5.845 14.136 7.475 3.806 1.631 8.971 3.717 15.495 6.253v44.039c-7.068-1.266-14.773-4.847-23.106-10.738-8.339-5.887-14.23-8.835-17.671-8.835-4.893 0-9.199 2.54-12.913 7.612-3.716 5.076-5.572 10.152-5.572 15.224 0 8.882 5.845 16.854 17.534 23.923 11.69 7.068 25.596 10.874 41.728 11.417v6.796c0 1.992.995 3.712 2.99 5.165 1.992 1.448 4.438 2.175 7.34 2.175 2.535 0 4.894-.773 7.068-2.311 2.176-1.542 3.263-3.22 3.263-5.029v-7.884c16.311-2.718 29.312-9.149 39.009-19.301 9.694-10.148 14.544-23.468 14.544-39.962-.001-7.067-1.134-13.498-3.398-19.299zM253.9 248.265c-11.6-4.893-17.399-10.602-17.399-17.126 0-7.79 5.798-12.866 17.399-15.224zm15.223 86.719v-36.427c11.052 5.258 16.583 11.689 16.583 19.301 0 8.881-5.531 14.59-16.583 17.126z"
                    opacity="1"
                    data-original="url(#O)"
                ></path>
                <path
                    fill="url(#P)"
                    d="M295.542 94.766h-73.771l-33.562-64.34c-4.955-9.498.702-21.08 11.239-23.012l21.979-4.03a206.44 206.44 0 0 1 74.459 0l21.979 4.03c10.537 1.932 16.194 13.513 11.239 23.012z"
                    opacity="1"
                    data-original="url(#P)"
                ></path>
                <path
                    fill="url(#Q)"
                    d="M270.924 94.766h-24.535l-11.162-64.34c-1.648-9.498.234-21.08 3.738-23.012l7.31-4.03c8.186-4.513 16.577-4.513 24.764 0l7.31 4.03c3.505 1.932 5.386 13.513 3.738 23.012z"
                    opacity="1"
                    data-original="url(#Q)"
                ></path>
                <path
                    fill="url(#R)"
                    d="M327.996 13.889c1.438 2.046.714 4.897-1.517 6.028a36.737 36.737 0 0 1-33.31 0l-9.253-4.698a36.737 36.737 0 0 0-33.31 0l-9.241 4.698a36.74 36.74 0 0 1-33.311 0l-9.679-4.923c-3.391-1.725-2.759-6.854.98-7.556l.095-.018 21.979-4.038a206.738 206.738 0 0 1 74.456 0l21.979 4.038a15.742 15.742 0 0 1 10.132 6.469z"
                    opacity="1"
                    data-original="url(#R)"
                ></path>
                <path
                    fill="url(#S)"
                    d="M329.318 22.907a21.085 21.085 0 0 0 1.115-3.669c-1.445-5.774-6.074-10.633-12.567-11.824l-21.979-4.03a206.44 206.44 0 0 0-74.459 0L205.035 6.39c-2.054 4.921-2.316 11.025-.052 16.517L234.6 94.766h60.943l19.812-37.981z"
                    opacity="1"
                    data-original="url(#S)"
                ></path>
                <path
                    fill="url(#T)"
                    d="M258.657 101.979c-15.991 0-31.127-1.033-43.531-2.942-4.085-.629-6.825-4.523-6.001-8.573.766-3.766 4.344-6.273 8.143-5.691 11.65 1.786 26.305 2.786 41.389 2.786 15.083 0 29.738-1 41.389-2.786a7.199 7.199 0 0 1 8.143 5.691c.824 4.05-1.916 7.945-6.001 8.573-12.404 1.909-27.54 2.942-43.531 2.942z"
                    opacity="1"
                    data-original="url(#T)"
                ></path>
                <path
                    fill="url(#U)"
                    d="M172.869 298.169c-.573-2.387-2.699-4.168-5.261-4.168H90.937c-6.584 20.562-14.602 40.644-24.284 59.977-5.494 10.97-8.379 23.472-7.839 36.698 1.563 38.265 35.241 71.191 73.531 71.94l.841.012c17.372.15 34.099 6.92 46.282 19.305 13.616 13.842 32.556 22.427 53.509 22.427 25.429 0 47.899-12.642 61.483-31.981 4.373-6.226 11.545-9.764 19.154-9.749h.132c3.269 0 6.481-.242 9.62-.708 5.92-.877 11.909.634 16.796 4.09.561.397 1.135.776 1.708 1.157z"
                    opacity="1"
                    data-original="url(#U)"
                ></path>
                <path
                    fill="url(#V)"
                    d="M167.608 510H10.63c-3 0-5.433-2.432-5.433-5.433v-25.134A5.432 5.432 0 0 1 10.63 474h156.978c3 0 5.433 2.432 5.433 5.433v25.134a5.433 5.433 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#V)"
                ></path>
                <path
                    fill="url(#W)"
                    d="M147.681 510H30.557a4.718 4.718 0 0 1-4.718-4.718v-26.564A4.718 4.718 0 0 1 30.557 474h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#W)"
                ></path>
                <path
                    fill="url(#W)"
                    d="M109.285 510H68.953a2.845 2.845 0 0 1-2.845-2.845v-30.31A2.845 2.845 0 0 1 68.953 474h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#W)"
                ></path>
                <path
                    fill="url(#X)"
                    d="M15.367 478.38a5.432 5.432 0 0 0-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034h156.978a5.432 5.432 0 0 0 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#X)"
                ></path>
                <path
                    fill="url(#Y)"
                    d="M167.608 474H10.63c-3 0-5.433-2.432-5.433-5.433v-25.134A5.432 5.432 0 0 1 10.63 438h156.978c3 0 5.433 2.432 5.433 5.433v25.134a5.433 5.433 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#Y)"
                ></path>
                <path
                    fill="url(#Z)"
                    d="M147.681 474H30.557a4.718 4.718 0 0 1-4.718-4.718v-26.565a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.565a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#Z)"
                ></path>
                <path
                    fill="url(#Z)"
                    d="M109.285 474H68.953a2.845 2.845 0 0 1-2.845-2.845v-30.31A2.845 2.845 0 0 1 68.953 438h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#Z)"
                ></path>
                <path
                    fill="url(#aa)"
                    d="M15.367 442.38a5.432 5.432 0 0 0-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.022.395.034.597.034h156.978a5.432 5.432 0 0 0 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.347 5.347 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#aa)"
                ></path>
                <path
                    fill="url(#ab)"
                    d="M167.608 438H10.63c-3 0-5.433-2.432-5.433-5.433v-25.134c0-3 2.432-5.433 5.433-5.433h156.978c3 0 5.433 2.432 5.433 5.433v25.134a5.433 5.433 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#ab)"
                ></path>
                <path
                    fill="url(#ac)"
                    d="M147.681 438H30.557a4.718 4.718 0 0 1-4.718-4.718v-26.564A4.718 4.718 0 0 1 30.557 402h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#ac)"
                ></path>
                <path
                    fill="url(#ac)"
                    d="M109.285 438H68.953a2.845 2.845 0 0 1-2.845-2.845v-30.31A2.845 2.845 0 0 1 68.953 402h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#ac)"
                ></path>
                <path
                    fill="url(#ad)"
                    d="M15.367 406.38a5.432 5.432 0 0 0-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034h156.978a5.432 5.432 0 0 0 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#ad)"
                ></path>
                <path
                    fill="url(#ae)"
                    d="M167.608 402H10.63c-3 0-5.433-2.432-5.433-5.433v-25.134A5.432 5.432 0 0 1 10.63 366h156.978c3 0 5.433 2.432 5.433 5.433v25.134a5.433 5.433 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#ae)"
                ></path>
                <path
                    fill="url(#af)"
                    d="M147.681 402H30.557a4.718 4.718 0 0 1-4.718-4.718v-26.565a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.565a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#af)"
                ></path>
                <path
                    fill="url(#af)"
                    d="M109.285 402H68.953a2.845 2.845 0 0 1-2.845-2.845v-30.31A2.845 2.845 0 0 1 68.953 366h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#af)"
                ></path>
                <path
                    fill="url(#ag)"
                    d="M15.367 370.38a5.432 5.432 0 0 0-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.022.395.034.597.034h156.978a5.432 5.432 0 0 0 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.347 5.347 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#ag)"
                ></path>
                <path
                    fill="url(#ah)"
                    d="M167.608 366.001H10.63c-3 0-5.433-2.432-5.433-5.433v-25.134c0-3 2.432-5.433 5.433-5.433h156.978c3 0 5.433 2.432 5.433 5.433v25.134c0 3-2.433 5.433-5.433 5.433z"
                    opacity="1"
                    data-original="url(#ah)"
                ></path>
                <path
                    fill="url(#ai)"
                    d="M147.681 366.001H30.557a4.718 4.718 0 0 1-4.718-4.718v-26.564a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#ai)"
                ></path>
                <path
                    fill="url(#ai)"
                    d="M109.285 366.001H68.953a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#ai)"
                ></path>
                <path
                    fill="url(#aj)"
                    d="M15.367 334.38a5.432 5.432 0 0 0-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034h156.978a5.432 5.432 0 0 0 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#aj)"
                ></path>
                <path
                    fill="url(#ak)"
                    d="M167.608 330.001H10.63c-3 0-5.433-2.432-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433h156.978c3 0 5.433 2.432 5.433 5.433v25.134c0 3-2.433 5.433-5.433 5.433z"
                    opacity="1"
                    data-original="url(#ak)"
                ></path>
                <path
                    fill="url(#al)"
                    d="M147.681 330.001H30.557a4.718 4.718 0 0 1-4.718-4.718v-26.565A4.718 4.718 0 0 1 30.557 294h117.124a4.718 4.718 0 0 1 4.718 4.718v26.565a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#al)"
                ></path>
                <path
                    fill="url(#al)"
                    d="M109.285 330.001H68.953a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31a2.845 2.845 0 0 1-2.845 2.845z"
                    opacity="1"
                    data-original="url(#al)"
                ></path>
                <path
                    fill="url(#am)"
                    d="M15.367 298.381a5.432 5.432 0 0 0-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.021.395.034.597.034h156.978a5.432 5.432 0 0 0 5.433-5.433v-25.134c0-.349-.036-.688-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#am)"
                ></path>
                <path
                    fill="url(#an)"
                    d="M461.953 510H304.975a5.432 5.432 0 0 1-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433h156.978c3 0 5.433 2.432 5.433 5.433v25.134a5.433 5.433 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#an)"
                ></path>
                <path
                    fill="url(#ao)"
                    d="M442.026 510H324.902a4.718 4.718 0 0 1-4.718-4.718v-26.564a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.564a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#ao)"
                ></path>
                <path
                    fill="url(#ao)"
                    d="M403.63 510h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31A2.845 2.845 0 0 1 403.63 510z"
                    opacity="1"
                    data-original="url(#ao)"
                ></path>
                <path
                    fill="url(#ap)"
                    d="M309.712 478.38c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.689.099 1.019.196.021.395.034.597.034h156.978c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.598 5.598 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#ap)"
                ></path>
                <path
                    fill="url(#aq)"
                    d="M461.953 474H304.975a5.432 5.432 0 0 1-5.433-5.433v-25.134a5.432 5.432 0 0 1 5.433-5.433h156.978c3 0 5.433 2.432 5.433 5.433v25.134a5.433 5.433 0 0 1-5.433 5.433z"
                    opacity="1"
                    data-original="url(#aq)"
                ></path>
                <path
                    fill="url(#ar)"
                    d="M442.026 474H324.902a4.718 4.718 0 0 1-4.718-4.718v-26.565a4.718 4.718 0 0 1 4.718-4.718h117.124a4.718 4.718 0 0 1 4.718 4.718v26.565a4.718 4.718 0 0 1-4.718 4.718z"
                    opacity="1"
                    data-original="url(#ar)"
                ></path>
                <path
                    fill="url(#ar)"
                    d="M403.63 474h-40.332a2.845 2.845 0 0 1-2.845-2.845v-30.31a2.845 2.845 0 0 1 2.845-2.845h40.332a2.845 2.845 0 0 1 2.845 2.845v30.31A2.845 2.845 0 0 1 403.63 474z"
                    opacity="1"
                    data-original="url(#ar)"
                ></path>
                <path
                    fill="url(#as)"
                    d="M309.712 442.38c-3 0-5.433 2.432-5.433 5.433v25.134c0 .349.036.688.099 1.019.196.022.395.034.597.034h156.978c3 0 5.433-2.432 5.433-5.433v-25.134c0-.349-.036-.689-.099-1.019a5.347 5.347 0 0 0-.597-.034z"
                    opacity="1"
                    data-original="url(#as)"
                ></path>
                <path
                    fill="url(#at)"
                    d="M93.055 209.679a127.326 127.326 0 0 0-37.525 37.748c-2.182 3.39-7.216 3.381-9.385-.017a127.345 127.345 0 0 0-37.387-37.884c-3.325-2.184-3.316-7.149.017-9.321A127.334 127.334 0 0 0 46.3 162.458c2.181-3.39 7.216-3.381 9.385.017a127.337 127.337 0 0 0 37.388 37.884c3.324 2.183 3.315 7.149-.018 9.32z"
                    opacity="1"
                    data-original="url(#at)"
                    className={className}
                ></path>
                <path
                    fill="url(#au)"
                    d="M152.859 73.491a90.041 90.041 0 0 0-26.536 26.694c-1.543 2.397-5.103 2.391-6.637-.012a90.051 90.051 0 0 0-26.439-26.79c-2.351-1.544-2.345-5.056.012-6.592a90.041 90.041 0 0 0 26.536-26.694c1.543-2.397 5.103-2.391 6.637.012a90.051 90.051 0 0 0 26.439 26.79c2.351 1.545 2.345 5.056-.012 6.592z"
                    opacity="1"
                    data-original="url(#au)"
                ></path>
                <path
                    fill="url(#av)"
                    d="M441.229 98.116a90.041 90.041 0 0 0-26.536 26.694c-1.543 2.397-5.103 2.391-6.637-.012a90.051 90.051 0 0 0-26.439-26.79c-2.351-1.544-2.345-5.056.012-6.592a90.041 90.041 0 0 0 26.536-26.694c1.543-2.397 5.103-2.391 6.637.012a90.063 90.063 0 0 0 26.439 26.79c2.351 1.545 2.345 5.056-.012 6.592z"
                    opacity="1"
                    data-original="url(#av)"
                ></path>
            </g>
        </svg>
    );
};

const Trophy = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512.001 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient id="a">
                    <stop offset="0" stopColor="#ffe548"></stop>
                    <stop offset=".431" stopColor="#ffe346"></stop>
                    <stop offset=".636" stopColor="#ffdc3e"></stop>
                    <stop offset=".793" stopColor="#ffd031"></stop>
                    <stop offset=".926" stopColor="#ffbf1f"></stop>
                    <stop offset="1" stopColor="#ffb211"></stop>
                </linearGradient>
                <radialGradient
                    xlinkHref="#a"
                    id="d"
                    cx="943.458"
                    cy="226.011"
                    r="107.032"
                    gradientTransform="rotate(-17.878 317.423 1900.363) scale(1.00391)"
                    gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <radialGradient
                    xlinkHref="#a"
                    id="e"
                    cx="1350.708"
                    cy="357.382"
                    r="107.032"
                    gradientTransform="matrix(-.95543 -.3082 -.3082 .95543 1509.679 189.217)"
                    gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <linearGradient id="b">
                    <stop offset="0" stopColor="#ffb211" stopOpacity="0"></stop>
                    <stop
                        offset=".228"
                        stopColor="#ff9f19"
                        stopOpacity=".227"
                    ></stop>
                    <stop
                        offset=".686"
                        stopColor="#ff6f2e"
                        stopOpacity=".686"
                    ></stop>
                    <stop offset="1" stopColor="#ff4b3e"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="f"
                    x1="448.618"
                    x2="392.913"
                    y1="115.039"
                    y2="108.906"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="g"
                    x1="439.183"
                    x2="395.48"
                    y1="203.899"
                    y2="199.088"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <radialGradient
                    id="h"
                    cx="241.81"
                    cy="409.624"
                    r="145.407"
                    gradientTransform="matrix(1.00392 0 0 .44383 0 193.128)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffe548"></stop>
                    <stop offset=".441" stopColor="#ffe346"></stop>
                    <stop offset=".643" stopColor="#ffdc3e"></stop>
                    <stop offset=".797" stopColor="#ffd032"></stop>
                    <stop offset=".925" stopColor="#ffc020"></stop>
                    <stop offset="1" stopColor="#ffb211"></stop>
                </radialGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="i"
                    x1="274.971"
                    x2="262.929"
                    y1="425.078"
                    y2="348.702"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="c">
                    <stop offset="0" stopColor="#ffe548"></stop>
                    <stop offset="1" stopColor="#ffb211"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="j"
                    x1="246.878"
                    x2="290.108"
                    y1="218.944"
                    y2="218.944"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    id="k"
                    x1="310.329"
                    x2="277.76"
                    y1="337.475"
                    y2="210.821"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffb211" stopOpacity="0"></stop>
                    <stop
                        offset=".181"
                        stopColor="#ff931f"
                        stopOpacity=".18"
                    ></stop>
                    <stop
                        offset=".401"
                        stopColor="#ff732c"
                        stopOpacity=".4"
                    ></stop>
                    <stop
                        offset=".615"
                        stopColor="#ff5d36"
                        stopOpacity=".616"
                    ></stop>
                    <stop
                        offset=".818"
                        stopColor="#ff503c"
                        stopOpacity=".82"
                    ></stop>
                    <stop offset="1" stopColor="#ff4b3e"></stop>
                </linearGradient>
                <radialGradient
                    xlinkHref="#a"
                    id="l"
                    cx="150.113"
                    cy="57.516"
                    r="298.804"
                    gradientUnits="userSpaceOnUse"
                ></radialGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="m"
                    x1="175.514"
                    x2="343.475"
                    y1="-20.39"
                    y2="85.947"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="n"
                    x1="256"
                    x2="256"
                    y1="85.901"
                    y2="-33.542"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="o"
                    x1="308.055"
                    x2="113.852"
                    y1="230.084"
                    y2="35.881"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <path
                    fill="url(#a)"
                    d="M440.102 223.605c-.747.243-1.508.446-2.286.61l-1.28.27a22.41 22.41 0 0 1-16.977-3.157 22.41 22.41 0 0 1-9.778-14.238c-2.613-12.309 2.817-25.04 13.504-31.676l55.223-34.289c10.914-6.777 16.46-19.777 13.793-32.344l-1.805-8.511c-3.5-16.504-19.777-27.086-36.285-23.586-8.004 1.691-14.852 6.406-19.309 13.257-4.453 6.856-5.972 15.032-4.277 23.028l1.488 7.023c1.04 4.895 5.864 8.031 10.758 6.992a8.984 8.984 0 0 0 5.723-3.93 8.99 8.99 0 0 0 1.27-6.824c-1.09-5.144 2.187-10.187 7.34-11.289 5.144-1.09 10.194 2.196 11.284 7.336 3.219 15.164-6.488 30.118-21.668 33.336-7.343 1.559-14.855.16-21.152-3.93-6.297-4.093-10.621-10.394-12.18-17.738L412 116.922c-2.75-12.969-.285-26.238 6.938-37.356 7.23-11.117 18.351-18.75 31.324-21.504 26.773-5.68 53.18 11.485 58.86 38.262l1.804 8.508c4.324 20.39-4.668 41.477-22.375 52.473l-55.219 34.289a10.956 10.956 0 0 0-4.926 11.55 3.523 3.523 0 0 0 4.184 2.72l1.281-.274c1.234-.262 1.922-1.07 2.219-1.528s.758-1.41.496-2.652c-1.094-5.144 2.195-10.2 7.336-11.289s10.195 2.195 11.285 7.336a22.41 22.41 0 0 1-3.152 16.984c-2.852 4.383-7.04 7.579-11.953 9.164zm0 0"
                    opacity="1"
                    data-original="url(#a)"
                    className=""
                ></path>
                <path
                    fill="url(#a)"
                    d="M71.898 223.605c.747.243 1.508.446 2.286.61l1.28.27a22.41 22.41 0 0 0 16.977-3.157 22.41 22.41 0 0 0 9.778-14.238c2.613-12.309-2.817-25.04-13.504-31.676l-55.223-34.289c-10.918-6.777-16.46-19.777-13.793-32.344l1.805-8.511c3.5-16.504 19.777-27.086 36.285-23.586 8 1.691 14.852 6.406 19.309 13.257 4.453 6.856 5.972 15.032 4.277 23.028l-1.488 7.023c-1.04 4.895-5.864 8.031-10.758 6.992a8.984 8.984 0 0 1-5.723-3.93 8.99 8.99 0 0 1-1.27-6.824c1.09-5.144-2.19-10.187-7.34-11.289-5.144-1.09-10.194 2.196-11.284 7.336-3.219 15.164 6.488 30.118 21.664 33.336 7.347 1.559 14.86.16 21.156-3.93 6.297-4.093 10.621-10.394 12.18-17.738l1.488-7.023c2.75-12.969.285-26.238-6.941-37.356-7.227-11.117-18.352-18.75-31.32-21.504-26.774-5.68-53.18 11.485-58.86 38.262l-1.805 8.504c-4.324 20.39 4.668 41.477 22.375 52.473l55.223 34.289a10.96 10.96 0 0 1 4.922 11.55 3.511 3.511 0 0 1-1.528 2.227 3.509 3.509 0 0 1-2.656.492l-1.281-.27a3.515 3.515 0 0 1-2.219-1.53 3.5 3.5 0 0 1-.496-2.653c1.09-5.144-2.195-10.199-7.336-11.289-5.144-1.09-10.195 2.196-11.289 7.34a22.423 22.423 0 0 0 3.156 16.98c2.852 4.387 7.04 7.583 11.953 9.168zm0 0"
                    opacity="1"
                    data-original="url(#a)"
                    className=""
                ></path>
                <path
                    fill="url(#b)"
                    d="m412 116.918 1.488 7.023c1.559 7.348 5.883 13.645 12.18 17.739 6.297 4.09 13.809 5.488 21.152 3.93 15.18-3.22 24.887-18.173 21.668-33.333-1.09-5.144-6.144-8.43-11.285-7.34-5.148 1.102-8.43 6.149-7.34 11.29a8.999 8.999 0 0 1-1.27 6.828 8.984 8.984 0 0 1-5.722 3.93c-4.894 1.035-9.719-2.102-10.758-6.993l-1.488-7.023c-1.41-6.645-.59-13.41 2.277-19.442l-13.965-13.965c-7.222 11.118-9.687 24.387-6.937 37.356zm0 0"
                    opacity="1"
                    data-original="url(#b)"
                    className=""
                ></path>
                <path
                    fill="url(#b)"
                    d="M452.055 214.438a22.43 22.43 0 0 0 3.156-16.985c-1.094-5.14-6.145-8.426-11.29-7.336-5.136 1.09-8.429 6.145-7.335 11.29a3.52 3.52 0 0 1-.492 2.652 3.512 3.512 0 0 1-2.223 1.527l-1.281.273a3.52 3.52 0 0 1-2.652-.492 3.514 3.514 0 0 1-1.532-2.226c-.789-3.73.45-7.559 3.125-10.141l-13.46-13.457c-7.153 7.066-10.43 17.445-8.29 27.547a22.438 22.438 0 0 0 9.778 14.238c5.054 3.285 11.086 4.406 16.976 3.156l1.281-.27a24.308 24.308 0 0 0 2.29-.609c4.91-1.585 9.097-4.78 11.949-9.167zm0 0"
                    opacity="1"
                    data-original="url(#b)"
                    className=""
                ></path>
                <path
                    fill="url(#h)"
                    d="M375.98 408.82c0-16.879-53.718-30.562-119.98-30.562S136.02 391.94 136.02 408.82c0 16.88 53.718 30.563 119.98 30.563s119.98-13.684 119.98-30.563zm0 0"
                    opacity="1"
                    data-original="url(#h)"
                    className=""
                ></path>
                <path
                    fill="url(#b)"
                    d="M354.691 426.203c-21.66 7.961-57.777 13.176-98.691 13.176-7.48 0-14.8-.172-21.902-.508l-41.536-41.535c-.68-.543-1.195-1.098-1.519-1.672a2.44 2.44 0 0 1-.172-.309c-.05-.105-.086-.21-.125-.312-.027-.078-.059-.164-.078-.25a2.549 2.549 0 0 1-.094-.707c0-.191.028-.395.067-.586h-.067l.078-.047c.41-1.781 2.57-3.473 6.141-5.004.758-.324 1.523-.648 2.277-.984a174.582 174.582 0 0 0 4.172-1.895c.113-.05.23-.105.336-.152 2.02-.957 4.02-1.945 6-2.965a137.816 137.816 0 0 0 3.344-1.805c.262-.148.527-.289.789-.437h.02c13.144-1.262 27.39-1.95 42.269-1.95s29.125.688 42.27 1.95c5.476 3.09 11.156 5.762 16.937 8.238 1.578.68 2.887 1.387 3.895 2.125l.007.047zm0 0"
                    opacity="1"
                    data-original="url(#b)"
                    className=""
                ></path>
                <path
                    fill="url(#c)"
                    d="m417.125 71.95-10.059-41.38H104.934L94.875 71.95a235.577 235.577 0 0 0-3.055 96.984c11.149 62.695 56.965 111.707 115.47 129.476 19.077 5.793 32.17 23.32 32.17 43.262v.008a41.057 41.057 0 0 1-20.64 35.62l-4.242 2.434c-5.734 3.286-11.71 6.106-17.781 8.711-3.574 1.532-5.734 3.223-6.149 5.008l-.078.047h.075a2.67 2.67 0 0 0-.075.582c0 7.313 29.297 13.238 65.43 13.238s65.43-5.925 65.43-13.238c0-.195-.032-.39-.075-.582h.075l-.078-.047c-.414-1.785-2.579-3.476-6.149-5.008-6.074-2.605-12.05-5.425-17.785-8.71l-4.238-2.434a41.057 41.057 0 0 1-20.64-35.621c0-19.957 13.116-37.477 32.214-43.274 58.258-17.691 103.984-66.336 115.289-128.695a235.58 235.58 0 0 0 3.777-42.008c0-18.543-2.191-37.25-6.695-55.754zm0 0"
                    opacity="1"
                    data-original="url(#c)"
                    className=""
                ></path>
                <path
                    fill="url(#k)"
                    d="m417.125 71.95-10.059-41.38H104.934L94.875 71.95a235.577 235.577 0 0 0-3.055 96.984c11.149 62.695 56.965 111.707 115.47 129.476a45.357 45.357 0 0 1 22.183 14.961l48.261 48.262a41.02 41.02 0 0 1-5.195-19.953c0-19.957 13.117-37.477 32.215-43.274 58.258-17.691 103.984-66.336 115.289-128.695a235.58 235.58 0 0 0 3.777-42.008c0-18.543-2.191-37.25-6.695-55.754zm0 0"
                    opacity="1"
                    data-original="url(#k)"
                    className=""
                ></path>
                <path
                    fill="url(#a)"
                    d="M423.82 127.703a235.58 235.58 0 0 1-3.777 42.008c-14.313 78.953-83.797 135.926-164.04 135.926-80.534 0-150.085-57.41-164.179-136.707a235.559 235.559 0 0 1 3.051-96.98l10.059-41.384H407.07l10.055 41.383a235.638 235.638 0 0 1 6.695 55.754zm0 0"
                    opacity="1"
                    data-original="url(#a)"
                    className=""
                ></path>
                <path
                    fill="url(#c)"
                    d="M407.059 30.563C407.059 13.683 339.426 0 256 0S104.941 13.684 104.941 30.563 172.574 61.124 256 61.124s151.059-13.684 151.059-30.563zm0 0"
                    opacity="1"
                    data-original="url(#c)"
                    className=""
                ></path>
                <path
                    fill="url(#b)"
                    d="M392.555 28.004c0-12.602-61.137-22.82-136.555-22.82s-136.555 10.218-136.555 22.82c0 12.601 61.137 22.816 136.555 22.816s136.555-10.215 136.555-22.816zm0 0"
                    opacity="1"
                    data-original="url(#b)"
                    className=""
                ></path>
                <path
                    fill="url(#b)"
                    d="M401.824 223.79c-25.867 41.956-70.21 71.081-120.926 78l-34.183-33.673c-.184-.101-.363-.191-.547-.3-2.633-1.583-3.941-3.704-3.941-6.372v-108.18l-20.993-20.699c-1.773-2.25-2.664-4.71-2.664-7.379 0-4.332 1.785-7.746 5.34-10.246l26.453-25c1.864-1.832 4.153-2.75 6.867-2.75 3.06 0 5.805.79 8.266 2.371zm0 0"
                    opacity="1"
                    data-original="url(#b)"
                    className=""
                ></path>
                <path
                    fill="#ffb211"
                    d="M217.387 125.977c0-4.372 1.765-7.817 5.293-10.336l26.215-25.207c1.847-1.848 4.117-2.774 6.808-2.774 3.024 0 5.754.8 8.192 2.395 2.433 1.601 3.656 3.742 3.656 6.43v166.87c0 2.692-1.348 4.836-4.035 6.43-2.688 1.598-5.797 2.395-9.325 2.395-3.699 0-6.851-.797-9.453-2.395-2.61-1.594-3.91-3.738-3.91-6.43V123.203l-8.82 11.09c-1.684 1.684-3.531 2.52-5.547 2.52-2.52 0-4.664-1.133-6.43-3.403-1.761-2.265-2.644-4.746-2.644-7.433zm0 0"
                    opacity="1"
                    data-original="#ffb211"
                    className=""
                ></path>
            </g>
        </svg>
    );
};

const ModernHouse = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <linearGradient
                    id="e"
                    x1="353.933"
                    x2="439.924"
                    y1="104.19"
                    y2="104.19"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffa1ae"></stop>
                    <stop offset="1" stopColor="#ff4565"></stop>
                </linearGradient>
                <linearGradient id="a">
                    <stop offset="0" stopColor="#fe0364" stopOpacity="0"></stop>
                    <stop
                        offset=".234"
                        stopColor="#f90362"
                        stopOpacity=".234"
                    ></stop>
                    <stop
                        offset=".517"
                        stopColor="#ea035b"
                        stopOpacity=".517"
                    ></stop>
                    <stop
                        offset=".824"
                        stopColor="#d20250"
                        stopOpacity=".824"
                    ></stop>
                    <stop offset="1" stopColor="#c00148"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="f"
                    x1="411.891"
                    x2="383.197"
                    y1="78.329"
                    y2="120.526"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#a"
                    id="g"
                    x1="408.541"
                    x2="440.253"
                    y1="104.19"
                    y2="104.19"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    id="h"
                    x1="110.144"
                    x2="332.833"
                    y1="188.412"
                    y2="411.101"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#f5fbff"></stop>
                    <stop offset="1" stopColor="#dbd5ef"></stop>
                </linearGradient>
                <linearGradient id="b">
                    <stop offset="0" stopColor="#dbd5ef" stopOpacity="0"></stop>
                    <stop
                        offset=".285"
                        stopColor="#d9d2ee"
                        stopOpacity=".285"
                    ></stop>
                    <stop
                        offset=".474"
                        stopColor="#d4c9e9"
                        stopOpacity=".474"
                    ></stop>
                    <stop
                        offset=".635"
                        stopColor="#cbbae2"
                        stopOpacity=".635"
                    ></stop>
                    <stop
                        offset=".779"
                        stopColor="#bfa5d7"
                        stopOpacity=".78"
                    ></stop>
                    <stop
                        offset=".913"
                        stopColor="#af8aca"
                        stopOpacity=".913"
                    ></stop>
                    <stop offset="1" stopColor="#a274bf"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="i"
                    x1="256"
                    x2="256"
                    y1="388.992"
                    y2="483.657"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="j"
                    x1="231.431"
                    x2="185.284"
                    y1="223.326"
                    y2="155.259"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="k"
                    x1="231.431"
                    x2="185.284"
                    y1="223.326"
                    y2="155.259"
                    gradientTransform="matrix(-1 0 0 1 512 0)"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#b"
                    id="l"
                    x1="315.874"
                    x2="447.541"
                    y1="291.828"
                    y2="291.828"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="c">
                    <stop offset="0" stopColor="#b3dafe"></stop>
                    <stop offset="1" stopColor="#0182fc"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="m"
                    x1="215.927"
                    x2="268.996"
                    y1="35.773"
                    y2="291.891"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient id="d">
                    <stop offset="0" stopColor="#314dc9" stopOpacity="0"></stop>
                    <stop
                        offset=".276"
                        stopColor="#304bc4"
                        stopOpacity=".276"
                    ></stop>
                    <stop
                        offset=".563"
                        stopColor="#2b45b8"
                        stopOpacity=".563"
                    ></stop>
                    <stop
                        offset=".854"
                        stopColor="#243ba3"
                        stopOpacity=".854"
                    ></stop>
                    <stop offset="1" stopColor="#1f3596"></stop>
                </linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="n"
                    x1="256"
                    x2="256"
                    y1="190.943"
                    y2="30.904"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="o"
                    x1="443.186"
                    x2="501.336"
                    y1="208.61"
                    y2="266.759"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="p"
                    x1="761.254"
                    x2="819.403"
                    y1="208.61"
                    y2="266.759"
                    gradientTransform="matrix(-1 0 0 1 830.068 0)"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="q"
                    x1="185.239"
                    x2="242.256"
                    y1="244.243"
                    y2="301.26"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="r"
                    x1="206.167"
                    x2="206.167"
                    y1="247.82"
                    y2="221.544"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="s"
                    x1="193.327"
                    x2="166.147"
                    y1="265.171"
                    y2="265.171"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="t"
                    x1="284.905"
                    x2="341.921"
                    y1="244.243"
                    y2="301.26"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="u"
                    x1="305.833"
                    x2="305.833"
                    y1="247.82"
                    y2="221.544"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="v"
                    x1="292.992"
                    x2="265.812"
                    y1="265.171"
                    y2="265.171"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="w"
                    x1="185.239"
                    x2="242.256"
                    y1="342.206"
                    y2="399.223"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="x"
                    x1="206.167"
                    x2="206.167"
                    y1="345.784"
                    y2="319.508"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="y"
                    x1="193.327"
                    x2="166.147"
                    y1="363.135"
                    y2="363.135"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#c"
                    id="z"
                    x1="284.905"
                    x2="341.921"
                    y1="342.206"
                    y2="399.223"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="A"
                    x1="305.833"
                    x2="305.833"
                    y1="345.784"
                    y2="319.508"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <linearGradient
                    xlinkHref="#d"
                    id="B"
                    x1="292.992"
                    x2="265.812"
                    y1="363.135"
                    y2="363.135"
                    gradientUnits="userSpaceOnUse"
                ></linearGradient>
                <path
                    fill="url(#e)"
                    d="M439.306 174.283h-96.14V47.145c0-7.206 5.842-13.047 13.047-13.047h70.045c7.206 0 13.047 5.842 13.047 13.047v127.138z"
                    opacity="1"
                    data-original="url(#e)"
                ></path>
                <path
                    fill="url(#f)"
                    d="M439.306 174.283h-96.14V47.145c0-7.206 5.842-13.047 13.047-13.047h70.045c7.206 0 13.047 5.842 13.047 13.047v127.138z"
                    opacity="1"
                    data-original="url(#f)"
                ></path>
                <path
                    fill="url(#g)"
                    d="M439.307 47.145v127.134h-59.221V34.101h46.177c7.197 0 13.044 5.836 13.044 13.044z"
                    opacity="1"
                    data-original="url(#g)"
                ></path>
                <path
                    fill="url(#h)"
                    d="M442.075 204.978v248.434c0 13.526-10.965 24.491-24.491 24.491H94.416c-13.526 0-24.491-10.965-24.491-24.491V204.978l134.056-99.225h104.038z"
                    opacity="1"
                    data-original="url(#h)"
                ></path>
                <path
                    fill="url(#i)"
                    d="M69.925 314.156v139.256c0 13.526 10.965 24.491 24.491 24.491h323.168c13.526 0 24.491-10.965 24.491-24.491V314.156z"
                    opacity="1"
                    data-original="url(#i)"
                    className=""
                ></path>
                <path
                    fill="url(#j)"
                    d="M442.079 204.978v109.175H69.921V204.978l134.065-99.227h104.028z"
                    opacity="1"
                    data-original="url(#j)"
                ></path>
                <path
                    fill="url(#k)"
                    d="M69.921 204.978v109.175h372.158V204.978l-134.065-99.227H203.986z"
                    opacity="1"
                    data-original="url(#k)"
                    className=""
                ></path>
                <path
                    fill="url(#l)"
                    d="M256 105.753v372.15h161.584c13.526 0 24.491-10.965 24.491-24.491V204.978l-134.056-99.225z"
                    opacity="1"
                    data-original="url(#l)"
                    className=""
                ></path>
                <path
                    fill="url(#m)"
                    d="m266.207 113.794 192.286 142.325c15.72 11.636 38.02 7.411 48.395-9.168 9.29-14.846 5.597-34.34-8.479-44.76L283.613 43.205c-16.406-12.144-38.82-12.144-55.227 0L13.591 202.191c-14.077 10.419-17.77 29.914-8.479 44.76 10.375 16.579 32.675 20.804 48.395 9.168l192.286-142.325a17.156 17.156 0 0 1 20.414 0z"
                    opacity="1"
                    data-original="url(#m)"
                ></path>
                <path
                    fill="url(#m)"
                    d="m266.207 113.794 192.286 142.325c15.72 11.636 38.02 7.411 48.395-9.168 9.29-14.846 5.597-34.34-8.479-44.76L283.613 43.205c-16.406-12.144-38.82-12.144-55.227 0L13.591 202.191c-14.077 10.419-17.77 29.914-8.479 44.76 10.375 16.579 32.675 20.804 48.395 9.168l192.286-142.325a17.156 17.156 0 0 1 20.414 0z"
                    opacity="1"
                    data-original="url(#m)"
                ></path>
                <path
                    fill="url(#n)"
                    d="M506.754 247.153 283.613 81.99c-16.406-12.143-38.82-12.143-55.227 0L5.246 247.153c10.43 16.408 32.607 20.553 48.261 8.966l192.286-142.325a17.156 17.156 0 0 1 20.414 0l192.286 142.325c15.655 11.587 37.831 7.441 48.261-8.966z"
                    opacity="1"
                    data-original="url(#n)"
                ></path>
                <path
                    fill="url(#o)"
                    d="m343.165 170.756 115.327 85.362c15.72 11.636 38.02 7.411 48.395-9.168 9.29-14.846 5.597-34.34-8.479-44.76l-107.276-79.403z"
                    opacity="1"
                    data-original="url(#o)"
                ></path>
                <path
                    fill="url(#p)"
                    d="M168.835 170.756 53.507 256.119c-15.72 11.636-38.02 7.411-48.395-9.168-9.29-14.846-5.597-34.34 8.479-44.76l107.275-79.403z"
                    opacity="1"
                    data-original="url(#p)"
                    className=""
                ></path>
                <path
                    fill="url(#q)"
                    d="M232.287 302.504h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.192-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#q)"
                ></path>
                <path
                    fill="url(#r)"
                    d="M232.287 302.504h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.192-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#r)"
                ></path>
                <path
                    fill="url(#s)"
                    d="M232.287 302.504h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.192-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#s)"
                    className=""
                ></path>
                <path
                    fill="url(#t)"
                    d="M331.952 302.504h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.192-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#t)"
                ></path>
                <path
                    fill="url(#u)"
                    d="M331.952 302.504h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.192-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#u)"
                ></path>
                <path
                    fill="url(#v)"
                    d="M331.952 302.504h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.192-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#v)"
                ></path>
                <path
                    fill="url(#w)"
                    d="M232.287 400.467h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.193-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#w)"
                ></path>
                <path
                    fill="url(#x)"
                    d="M232.287 400.467h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.193-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#x)"
                ></path>
                <path
                    fill="url(#y)"
                    d="M232.287 400.467h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.193-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#y)"
                    className=""
                ></path>
                <path
                    fill="url(#z)"
                    d="M331.952 400.467h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.193-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#z)"
                ></path>
                <path
                    fill="url(#A)"
                    d="M331.952 400.467h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.193-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#A)"
                ></path>
                <path
                    fill="url(#B)"
                    d="M331.952 400.467h-52.239c-6.193 0-11.213-5.02-11.213-11.213v-52.239c0-6.193 5.02-11.213 11.213-11.213h52.239c6.193 0 11.213 5.02 11.213 11.213v52.239c0 6.193-5.02 11.213-11.213 11.213z"
                    opacity="1"
                    data-original="url(#B)"
                ></path>
            </g>
        </svg>
    );
};

const Diamond = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M360.129 172.138 256 472.276l256-300.138z"
                    fill="#ffe182"
                    data-original="#ffe182"
                ></path>
                <path
                    d="M105.931 39.724 0 172.138h151.871zM360.129 172.138H512L406.069 39.724zM360.129 172.138 256 39.724 151.871 172.138z"
                    fill="#ffcd73"
                    data-original="#ffcd73"
                ></path>
                <path
                    d="M256 39.724H105.931l45.94 132.414z"
                    fill="#ffaa64"
                    data-original="#ffaa64"
                ></path>
                <path
                    d="M406.069 39.724H256l104.129 132.414z"
                    fill="#ffe182"
                    data-original="#ffe182"
                ></path>
                <path
                    d="M151.871 172.138 256 472.276l104.129-300.138z"
                    fill="#ffaa64"
                    data-original="#ffaa64"
                ></path>
                <path
                    d="m0 172.138 256 300.138-104.129-300.138z"
                    fill="#ff8c5a"
                    data-original="#ff8c5a"
                ></path>
            </g>
        </svg>
    );
};
const CheckinSolid = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 507.2 507.2"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <circle
                    cx="253.6"
                    cy="253.6"
                    r="253.6"
                    fill="#32ba7c"
                    data-original="#32ba7c"
                    className=""
                ></circle>
                <path
                    d="m188.8 368 130.4 130.4c108-28.8 188-127.2 188-244.8v-7.2L404.8 152l-216 216z"
                    fill="#0aa06e"
                    data-original="#0aa06e"
                ></path>
                <path
                    d="M260 310.4c11.2 11.2 11.2 30.4 0 41.6l-23.2 23.2c-11.2 11.2-30.4 11.2-41.6 0L93.6 272.8c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0L260 310.4z"
                    fill="#ffffff"
                    data-original="#ffffff"
                    className=""
                ></path>
                <path
                    d="M348.8 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6l-176 175.2c-11.2 11.2-30.4 11.2-41.6 0l-23.2-23.2c-11.2-11.2-11.2-30.4 0-41.6l176-175.2z"
                    fill="#ffffff"
                    data-original="#ffffff"
                    className=""
                ></path>
            </g>
        </svg>
    );
};

const TurnOff = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <g fill-rule="evenodd" clip-rule="evenodd">
                    <path
                        fill="#f34235"
                        d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z"
                        opacity="1"
                        data-original="#f34235"
                    ></path>
                    <path
                        fill="#ffffff"
                        d="M366 274.5c0 60.7-49.4 110-110 110-60.7 0-110-49.4-110-110 0-37.4 18.7-71.9 50.1-92.2 7.4-4.8 17.3-2.7 22.1 4.7s2.7 17.3-4.7 22.1C191.2 223.5 178 248 178 274.5c0 43 35 78 78 78s78-35 78-78c0-26.5-13.3-51-35.5-65.4-7.4-4.8-9.5-14.7-4.7-22.1s14.7-9.5 22.1-4.7c31.4 20.3 50.1 54.8 50.1 92.2zm-126-57.1v-73.9c0-8.8 7.2-16 16-16s16 7.2 16 16v73.9c0 8.8-7.2 16-16 16s-16-7.2-16-16z"
                        opacity="1"
                        data-original="#ffffff"
                    ></path>
                </g>
            </g>
        </svg>
    );
};

const WalletIcon = ({ className, size }: IconsProps) => {
    return (
        <svg
            className={className}
            width={size || "1em"}
            height={size || "1em"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            fillOpacity="1"
        >
            <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            <rect x="17" y="10" width="4" height="4" rx="1"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
    );
};
const DashboardIcon = ({ className, size }: IconsProps) => {
    return (
        <svg
            className={className}
            width={size || "1em"}
            height={size || "1em"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            fillOpacity="1"
        >
            <rect x="4" y="15" width="3" height="6"></rect>
            <rect x="10.5" y="9" width="3" height="12"></rect>
            <rect x="17" y="12" width="3" height="9"></rect>
        </svg>
    );
};
const EquipIcon = ({ className, size }: IconsProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            width={size || "1em"}
            height={size || "1em"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            fillOpacity="1"
        >
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
        </svg>
    );
};
const HomeIcon = ({ className, size }: IconsProps) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            width={size || "1em"}
            height={size || "1em"}
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M12 1L21 6V18L12 23L3 18V6L12 1Z"></path>
            <path d="M12 1V23"></path>
            <path d="M21 6L12 12L3 6"></path>
        </svg>
    );
};
const Key = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            height={size || "1em"}
            width={size || "1em"}
            aria-hidden="true"
            data-slot="icon"
            className={className}
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            ></path>
        </svg>
    );
};
const Whatsapp = ({ className, size }: IconsProps) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className={className}
            height={size || "1em"}
            width={size || "1em"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7.25361 18.4944L7.97834 18.917C9.18909 19.623 10.5651 20 12.001 20C16.4193 20 20.001 16.4183 20.001 12C20.001 7.58172 16.4193 4 12.001 4C7.5827 4 4.00098 7.58172 4.00098 12C4.00098 13.4363 4.37821 14.8128 5.08466 16.0238L5.50704 16.7478L4.85355 19.1494L7.25361 18.4944ZM2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22ZM8.39232 7.30833C8.5262 7.29892 8.66053 7.29748 8.79459 7.30402C8.84875 7.30758 8.90265 7.31384 8.95659 7.32007C9.11585 7.33846 9.29098 7.43545 9.34986 7.56894C9.64818 8.24536 9.93764 8.92565 10.2182 9.60963C10.2801 9.76062 10.2428 9.95633 10.125 10.1457C10.0652 10.2428 9.97128 10.379 9.86248 10.5183C9.74939 10.663 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.40738 11.0473 9.44455 11.1944C9.45903 11.25 9.50521 11.331 9.54708 11.3991C9.57027 11.4368 9.5918 11.4705 9.60577 11.4938C9.86169 11.9211 10.2057 12.3543 10.6259 12.7616C10.7463 12.8783 10.8631 12.9974 10.9887 13.108C11.457 13.5209 11.9868 13.8583 12.559 14.1082L12.5641 14.1105C12.6486 14.1469 12.692 14.1668 12.8157 14.2193C12.8781 14.2457 12.9419 14.2685 13.0074 14.2858C13.0311 14.292 13.0554 14.2955 13.0798 14.2972C13.2415 14.3069 13.335 14.2032 13.3749 14.1555C14.0984 13.279 14.1646 13.2218 14.1696 13.2222V13.2238C14.2647 13.1236 14.4142 13.0888 14.5476 13.097C14.6085 13.1007 14.6691 13.1124 14.7245 13.1377C15.2563 13.3803 16.1258 13.7587 16.1258 13.7587L16.7073 14.0201C16.8047 14.0671 16.8936 14.1778 16.8979 14.2854C16.9005 14.3523 16.9077 14.4603 16.8838 14.6579C16.8525 14.9166 16.7738 15.2281 16.6956 15.3913C16.6406 15.5058 16.5694 15.6074 16.4866 15.6934C16.3743 15.81 16.2909 15.8808 16.1559 15.9814C16.0737 16.0426 16.0311 16.0714 16.0311 16.0714C15.8922 16.159 15.8139 16.2028 15.6484 16.2909C15.391 16.428 15.1066 16.5068 14.8153 16.5218C14.6296 16.5313 14.4444 16.5447 14.2589 16.5347C14.2507 16.5342 13.6907 16.4482 13.6907 16.4482C12.2688 16.0742 10.9538 15.3736 9.85034 14.402C9.62473 14.2034 9.4155 13.9885 9.20194 13.7759C8.31288 12.8908 7.63982 11.9364 7.23169 11.0336C7.03043 10.5884 6.90299 10.1116 6.90098 9.62098C6.89729 9.01405 7.09599 8.4232 7.46569 7.94186C7.53857 7.84697 7.60774 7.74855 7.72709 7.63586C7.85348 7.51651 7.93392 7.45244 8.02057 7.40811C8.13607 7.34902 8.26293 7.31742 8.39232 7.30833Z"></path>
        </svg>
    );
};

const Telegram = ({ className, size }: IconsProps) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className={className}
            height={size || "1em"}
            width={size || "1em"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.3584 9.38246C11.3857 9.78702 9.4418 10.6244 6.5266 11.8945C6.05321 12.0827 5.80524 12.2669 5.78266 12.4469C5.74451 12.7513 6.12561 12.8711 6.64458 13.0343C6.71517 13.0565 6.78832 13.0795 6.8633 13.1039C7.37388 13.2698 8.06071 13.464 8.41776 13.4717C8.74164 13.4787 9.10313 13.3452 9.50222 13.0711C12.226 11.2325 13.632 10.3032 13.7203 10.2832C13.7826 10.269 13.8689 10.2513 13.9273 10.3032C13.9858 10.3552 13.98 10.4536 13.9739 10.48C13.9361 10.641 12.4401 12.0318 11.6659 12.7515C11.4351 12.9661 11.2101 13.1853 10.9833 13.4039C10.509 13.8611 10.1533 14.204 11.003 14.764C11.8644 15.3317 12.7323 15.8982 13.5724 16.4971C13.9867 16.7925 14.359 17.0579 14.8188 17.0156C15.0861 16.991 15.3621 16.7397 15.5022 15.9903C15.8335 14.2193 16.4847 10.3821 16.6352 8.80083C16.6484 8.6623 16.6318 8.485 16.6185 8.40717C16.6052 8.32934 16.5773 8.21844 16.4762 8.13635C16.3563 8.03913 16.1714 8.01863 16.0887 8.02009C15.7125 8.02672 15.1355 8.22737 12.3584 9.38246Z"></path>
        </svg>
    );
};

const Calendar = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M129.051 512c-74.5 0-124.56-50.059-124.56-124.56V151.507c0-74.5 50.059-124.56 124.56-124.56h253.898c74.5 0 124.56 50.059 124.56 124.56V387.44c0 74.5-50.059 124.56-124.56 124.56H129.051z"
                    style={{
                        opacity: 0.08,
                    }}
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                ></path>
                <linearGradient
                    id="a"
                    x1="-15.045"
                    x2="-15.045"
                    y1="581.525"
                    y2="635.525"
                    gradientTransform="matrix(8.9825 0 0 -8.9825 391.14 5726.544)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0"
                        style={{
                            stopColor: "#ECECEC",
                        }}
                        stop-color="#ececec"
                    ></stop>
                    <stop
                        offset="1"
                        style={{
                            stopColor: "#FFFFFF",
                        }}
                        stop-color="#ffffff"
                    ></stop>
                </linearGradient>
                <path
                    d="M129.051 503.018c-74.5 0-124.56-50.059-124.56-124.56V142.525c0-74.5 50.059-124.56 124.56-124.56h253.898c74.5 0 124.56 50.059 124.56 124.56v235.933c0 74.5-50.059 124.56-124.56 124.56H129.051z"
                    style={{
                        fill: "url(#a)",
                    }}
                    fill=""
                ></path>
                <path
                    d="M4.491 143.719v-1.195c0-74.5 50.059-124.56 124.56-124.56h253.898c74.5 0 124.56 50.059 124.56 124.56v1.195H4.491z"
                    fill="#f4413d"
                    data-original="#f4413d"
                ></path>
                <g
                    style={{
                        opacity: 0.16,
                    }}
                >
                    <linearGradient
                        id="b"
                        x1="-15.045"
                        x2="-15.045"
                        y1="581.525"
                        y2="635.525"
                        gradientTransform="matrix(8.9825 0 0 -8.9825 391.14 5726.544)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0"
                            style={{
                                stopColor: "#000000",
                            }}
                            stop-color="#000000"
                        ></stop>
                        <stop
                            offset=".06"
                            style={{
                                stopColor: "#000000",
                                stopOpacity: 0,
                            }}
                            stop-color="#000000;stop-opacity:0"
                        ></stop>
                    </linearGradient>
                    <path
                        d="M382.949 17.965H129.051c-74.5 0-124.56 50.059-124.56 124.56v235.933c0 74.5 50.059 124.56 124.56 124.56h253.898c74.5 0 124.56-50.059 124.56-124.56V142.525c0-74.501-50.059-124.56-124.56-124.56zm106.595 360.493c0 64.755-41.84 106.595-106.595 106.595H129.051c-64.755 0-106.595-41.84-106.595-106.595V142.525c0-64.755 41.84-106.595 106.595-106.595h253.898c64.755 0 106.595 41.84 106.595 106.595v235.933z"
                        style={{
                            fill: "url(#b);",
                        }}
                        fill=""
                    ></path>
                </g>
                <path
                    d="M180.332 295.397h20.633c23.211 0 39.172-14.246 39.172-34.017 0-19.16-14.489-32.669-38.436-32.669-21.98 0-37.583 13.267-39.424 32.912h-16.213c2.084-28.492 24.441-47.652 56.365-47.652 31.196 0 54.649 19.034 54.649 45.316 0 22.232-14.372 38.193-36.963 42.244v.494c27.136 1.599 44.58 18.423 44.58 43.475 0 29.965-26.768 51.335-61.278 51.335-35.741 0-59.931-20.39-61.036-48.757h16.213c1.347 19.77 19.16 34.017 44.706 34.017 25.663 0 44.337-15.108 44.337-36.109 0-22.6-17.435-36.352-45.927-36.352h-21.369c-.009.009-.009-14.237-.009-14.237zM335.441 234.604h-.494c-2.82 1.716-33.522 23.947-47.526 32.669v-17.929c5.282-3.315 42.855-29.84 47.769-32.786h16.456v177.457h-16.213l.008-159.411z"
                    fill="#413d3d"
                    data-original="#413d3d"
                ></path>
                <circle
                    cx="121.263"
                    cy="80.842"
                    r="26.947"
                    style={{
                        opacity: 0.24,
                    }}
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                ></circle>
                <circle
                    cx="390.737"
                    cy="80.842"
                    r="26.947"
                    style={{
                        opacity: 0.24,
                    }}
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                ></circle>
                <path
                    d="M382.949 17.965H129.051c-74.5 0-124.56 50.059-124.56 124.56v235.933c0 74.5 50.059 124.56 124.56 124.56h253.898c74.5 0 124.56-50.059 124.56-124.56V142.525c0-74.501-50.059-124.56-124.56-124.56zm115.577 360.493c0 69.129-46.448 115.577-115.577 115.577H129.051c-69.129 0-115.577-46.448-115.577-115.577V142.525c0-69.129 46.448-115.577 115.577-115.577h253.898c69.129 0 115.577 46.448 115.577 115.577v235.933z"
                    style={{
                        opacity: 0.16,
                    }}
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                ></path>
                <linearGradient
                    id="c"
                    x1="-30.045"
                    x2="-30.045"
                    y1="627.525"
                    y2="637.525"
                    gradientTransform="matrix(8.9825 0 0 -8.9825 391.14 5726.544)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0"
                        style={{
                            stopColor: "#FFFFFF",
                        }}
                        stop-color="#ffffff"
                    ></stop>
                    <stop
                        offset="1"
                        style={{
                            stopColor: "#DCDCDC",
                        }}
                        stop-color="#dcdcdc"
                    ></stop>
                </linearGradient>
                <path
                    d="M121.263 89.825c-4.958 0-8.982-4.024-8.982-8.982V8.982c0-4.958 4.024-8.982 8.982-8.982 4.958 0 8.982 4.024 8.982 8.982v71.86c.001 4.958-4.024 8.983-8.982 8.983z"
                    style={{
                        fill: "url(#c);",
                    }}
                    fill=""
                ></path>
                <linearGradient
                    id="d"
                    x1="-.045"
                    x2="-.045"
                    y1="627.525"
                    y2="637.525"
                    gradientTransform="matrix(8.9825 0 0 -8.9825 391.14 5726.544)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0"
                        style={{
                            stopColor: "#FFFFFF",
                        }}
                        stop-color="#ffffff"
                    ></stop>
                    <stop
                        offset="1"
                        style={{
                            stopColor: "#DCDCDC",
                        }}
                        stop-color="#dcdcdc"
                    ></stop>
                </linearGradient>
                <path
                    d="M390.737 89.825c-4.958 0-8.982-4.024-8.982-8.982V8.982c0-4.958 4.024-8.982 8.982-8.982 4.958 0 8.982 4.024 8.982 8.982v71.86c0 4.958-4.024 8.983-8.982 8.983z"
                    style={{
                        fill: "url(#d);",
                    }}
                    fill=""
                ></path>
            </g>
        </svg>
    );
};

const HouseSolid = ({ className, size }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "1em"}
            height={size || "1em"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="m498.195 222.695-.035-.035L289.305 13.813C280.402 4.905 268.566 0 255.977 0c-12.59 0-24.426 4.902-33.332 13.809L13.898 222.55c-.07.07-.14.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.445 13.238 31.277 13.746.48.047.965.07 1.453.07h8.324v153.7C54.832 487.254 79.578 512 110 512h81.71c8.282 0 15-6.715 15-15V376.5c0-13.879 11.29-25.168 25.169-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.285 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.16v-153.7h7.719c12.586 0 24.422-4.902 33.332-13.808 18.36-18.371 18.367-48.254.023-66.637zm0 0"
                    fill="currentColor"
                    opacity="1"
                    data-original="#000000"
                    className="hovered-path"
                ></path>
            </g>
        </svg>
    );
};

const Dashboard = () => (
    <span className="material-symbols-outlined mr-3">dashboard</span>
);
const Transactions = () => (
    <span className="material-symbols-outlined mr-3">sync_alt</span>
);
const Cycles = () => (
    <span className="material-symbols-outlined mr-3">autorenew</span>
);
const Comissions = () => (
    <span className="material-symbols-outlined mr-3">payments</span>
);

export {
    Whatsapp,
    Telegram,
    Dashboard,
    Transactions,
    Cycles,
    Comissions,
    Key,
    HomeIcon,
    EquipIcon,
    DashboardIcon,
    WalletIcon,
    TurnOff,
    CheckinSolid,
    Diamond,
    ModernHouse,
    Trophy,
    MoneyBag,
    ModernWallet,
    VipFlag,
    Coin,
    CheckCoin,
    CashIn,
    Transfer,
    Receive,
    Question,
    Calendar,
    HouseSolid,
};
