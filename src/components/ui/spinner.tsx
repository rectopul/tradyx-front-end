interface SpinnerProps {
    size?: "md" | "lg" | "xl" | "sm";
}

export function Spinner({ size }: SpinnerProps) {
    return (
        <div className="flex justify-center items-center">
            <div
                className={`${
                    size && size === "md"
                        ? "w-7 h-7"
                        : size === "sm"
                        ? "w-5 h-5"
                        : "w-12 h-12"
                } border-4 border-ebony-clay-950 border-t-ebony-clay-400 rounded-full animate-spin"
                role="status`}
            ></div>
        </div>
    );
}
