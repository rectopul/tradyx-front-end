// CircularProgressImage.tsx
interface Props {
    size?: number; // px
    strokeWidth?: number; // px
    percentage: number; // 0..100
    imageSrc: string;
    alt?: string;
    trackColor?: string; // e.g. 'bg-gray-800'
    progressColor?: string; // tailwind color hex or class style
    animate?: boolean;
}

export default function CircularProgressImage({
    size = 96,
    strokeWidth = 6,
    percentage,
    imageSrc,
    alt = "avatar",
    trackColor = "#111827", // fallback hex
    progressColor = "#7c3aed", // fallback hex (purple-600)
    animate = true,
}: Props) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percentage));
    const offset = circumference * (1 - clamped / 100);

    return (
        <div
            className="inline-block"
            style={{ width: size, height: size, position: "relative" }}
            aria-label={`Progresso ${clamped}%`}
            role="img"
        >
            {/* SVG ring */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute left-0 top-0"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
                    {/* Track */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={trackColor}
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={progressColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{
                            transition: animate
                                ? "stroke-dashoffset 600ms cubic-bezier(.2,.9,.2,1)"
                                : undefined,
                        }}
                    />
                </g>
            </svg>

            {/* Image centered inside */}
            <img
                src={imageSrc}
                alt={alt}
                className="object-cover rounded-full"
                onError={(e) => {
                    e.currentTarget.src =
                        "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400"; // caminho local ou padrão
                }}
                style={{
                    width: size - strokeWidth * 2,
                    height: size - strokeWidth * 2,
                    position: "absolute",
                    left: strokeWidth,
                    top: strokeWidth,
                }}
            />

            {/* Optional percentage label (center) */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
            >
                <span className="text-xs font-semibold text-white/90">
                    {clamped}%
                </span>
            </div>
        </div>
    );
}
