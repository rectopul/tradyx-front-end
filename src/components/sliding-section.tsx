import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Section {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface SlidingSectionsProps {
    sections: Section[];
}

export default function SlidingSections({ sections }: SlidingSectionsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {/* Barra de botões */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
                {sections.map((section, index) => (
                    <Button
                        key={section.id}
                        variant={activeIndex === index ? "default" : "outline"}
                        className="flex items-center gap-2 whitespace-nowrap"
                        onClick={() => setActiveIndex(index)}
                    >
                        {section.title}
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                ))}
            </div>

            {/* Área de conteúdo com animação */}
            <div className="relative mt-6 overflow-hidden h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={sections[activeIndex].id}
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute w-full h-full"
                    >
                        <div className="p-4 bg-card rounded-xl shadow-md border border-border h-full">
                            {sections[activeIndex].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
