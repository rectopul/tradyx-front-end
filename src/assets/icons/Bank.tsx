export interface IconsProps {
    fill?: string;
    size?: number;
    className?: string;
}

function Bank({ className, fill, size }: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 47.001 47.001"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M44.845 42.718H2.136a2.136 2.136 0 1 0 0 4.272h42.708a2.135 2.135 0 1 0 .001-4.272zM4.805 37.165a2.136 2.136 0 1 0 0 4.273h37.37a2.136 2.136 0 0 0 0-4.273h-.533v-19.22h.533a1.066 1.066 0 1 0 0-2.134H4.805a1.067 1.067 0 1 0 0 2.134h.534v19.219h-.534zm32.565-19.22v19.219h-6.406V17.945h6.406zm-10.678 0v19.219h-6.406V17.945h6.406zm-17.083 0h6.406v19.219H9.609V17.945zM2.136 13.891h42.729a2.135 2.135 0 0 0 .693-4.157L24.368.199a2.14 2.14 0 0 0-1.752 0L1.26 9.808a2.135 2.135 0 0 0 .876 4.083z"
                    fill={fill || "#000000"}
                    opacity="1"
                    data-original="#000000"
                    className=""
                ></path>
            </g>
        </svg>
    );
}

function USDT({ className, fill, size }: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 200 200"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <g data-name="Layer 2">
                    <g data-name="Black and White">
                        <g data-name="Tether (USDT)">
                            <circle
                                cx="100"
                                cy="100"
                                r="100"
                                fill={fill || "#000000"}
                                opacity="1"
                                data-original="#000000"
                                className=""
                            ></circle>
                            <path
                                // fill="#ffffff"
                                fill=" "
                                d="M110.38 87.69V75.88h26.87V57.25H62.68v18.63h26.94v11.81c-22.57 1.09-39.51 5.62-39.51 11s16.92 9.93 39.51 11v39h20.76v-39c22.57-1.08 39.51-5.61 39.51-11s-16.89-9.91-39.51-11zM100 106.25c-24.44 0-44.25-3.78-44.25-8.33 0-3.91 14.43-7.2 33.85-8.08v13.34c3.34.15 6.81.24 10.38.24s7.06-.09 10.38-.24V89.84c19.42.88 33.85 4.17 33.85 8.08.04 4.6-19.77 8.33-44.21 8.33z"
                                opacity="1"
                                data-original=""
                                // data-original="#ffffff"
                                className=""
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export { Bank, USDT };
