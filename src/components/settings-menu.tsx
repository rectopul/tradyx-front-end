import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export interface SettingOption {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    danger?: boolean;
}

interface SettingsMenuProps {
    options: SettingOption[];
}

export default function SettingsMenu({ options }: SettingsMenuProps) {
    const [activeOption, setActiveOption] = useState<SettingOption | null>(
        null
    );
    const { logout } = useAuth();

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <AnimatePresence mode="wait">
                {!activeOption ? (
                    <motion.div
                        key="menu"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                    >
                        {options.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => setActiveOption(option)}
                                className={`flex items-center justify-between px-4 py-4 rounded-2xl font-space font-semibold border shadow-ebony-clay-700 shadow cursor-pointer backdrop-blur-md ${
                                    option.danger
                                        ? "border-red-300 bg-gradient-rose text-red-500"
                                        : "border-tradyx-950 bg-orange-gradient !text-cream-can-900 shadow-top-inset shadow-tradyx-100 text-foreground"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {option.icon}
                                    <span className="font-medium">
                                        {option.title}
                                    </span>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-60" />
                            </div>
                        ))}
                        <button
                            onClick={() => logout()}
                            className={`flex w-full items-center justify-between px-4 py-4 rounded-2xl font-sans border cursor-pointer backdrop-blur-md bg-gradient-rose shadow-top-inset shadow-red-200 border-red-900 text-red-700`}
                        >
                            <div className="flex items-center gap-3">
                                <Power className="w-7 h-7" strokeWidth={3} />
                                <span className="font-semibold text-sm">
                                    Logout
                                </span>
                            </div>
                            <ChevronRight
                                className="w-5 h-5 opacity-60"
                                strokeWidth={3}
                            />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="details"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-4 ">
                            <Button
                                className="bg-gradient-to-b from-ebony-clay-300 to-ebony-clay-200"
                                size="icon"
                                onClick={() => setActiveOption(null)}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <h2 className="text-lg font-semibold text-white">
                                {activeOption.title}
                            </h2>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                            {activeOption.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
