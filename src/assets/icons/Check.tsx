export interface IconsProps {
    fill?: string;
    size?: number;
    className?: string;
}

function Check({ className, fill, size }: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 2.54 2.54"
            xmlSpace="preserve"
            fillRule="evenodd"
            className={className}
        >
            <g>
                <circle
                    cx="1.27"
                    cy="1.27"
                    r="1.27"
                    fill={fill || "#1351b4"}
                    opacity="1"
                    data-original={fill || "#1351b4"}
                    className=""
                ></circle>
                <path
                    fill="#ffffff"
                    d="M.873 1.89.41 1.391a.17.17 0 0 1 .008-.24.17.17 0 0 1 .24.009l.358.383.567-.53a.17.17 0 0 1 .016-.013l.266-.249a.17.17 0 0 1 .24.008.17.17 0 0 1-.008.24l-.815.76-.283.263-.125-.134z"
                    opacity="1"
                    data-original="#ffffff"
                    className=""
                ></path>
            </g>
        </svg>
    );
}

function Pix({ className, fill, size }: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={size || 20}
            height={size || 20}
            viewBox="0 0 48 48"
            className={className}
        >
            <path
                fill={fill || "#4db6ac"}
                d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"
            ></path>
            <path
                fill={fill || "#4db6ac"}
                d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"
            ></path>
            <path
                fill={fill || "#4db6ac"}
                d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"
            ></path>
        </svg>
    );
}

export { Check, Pix };
