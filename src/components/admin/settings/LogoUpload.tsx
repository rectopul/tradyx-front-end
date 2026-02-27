import React, { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
    value?: File | string | null;
    onChange: (file: File | null) => void;
    preview?: string | null;
    onPreviewChange: (preview: string | null) => void;
    className?: string;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({
    value,
    onChange,
    preview,
    onPreviewChange,
    className,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => prev + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragLeave = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter((prev) => prev - 1);
            if (dragCounter - 1 === 0) {
                setIsDragging(false);
            }
        },
        [dragCounter]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setDragCounter(0);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find((file) => file.type.startsWith("image/"));

        if (imageFile) {
            handleFileChange(imageFile);
        }
    }, []);

    const handleFileChange = useCallback(
        (file: File) => {
            if (file && file.type.startsWith("image/")) {
                onChange(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    onPreviewChange(reader.result as string);
                };
                reader.readAsDataURL(file);

                console.log("process", value);
            }
        },
        [onChange, onPreviewChange]
    );

    const handleFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                handleFileChange(file);
            }
        },
        [handleFileChange]
    );

    const handleRemove = useCallback(() => {
        onChange(null);
        onPreviewChange(null);
    }, [onChange, onPreviewChange]);

    return (
        <div className={cn("space-y-4", className)}>
            {/* Preview Section */}
            {preview && (
                <div className="relative group">
                    <div className="relative overflow-hidden rounded-lg border bg-muted p-4">
                        <img
                            src={preview}
                            alt="Logo preview"
                            className="h-24 w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleRemove}
                                className="flex items-center gap-2"
                            >
                                <X className="h-4 w-4" />
                                Remover
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Drop Zone */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
                    "hover:border-primary/50 hover:bg-muted/50",
                    isDragging
                        ? "border-primary bg-muted scale-105"
                        : "border-muted-foreground/25"
                )}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center space-y-4">
                    <div
                        className={cn(
                            "p-3 rounded-full transition-colors duration-200",
                            isDragging ? "bg-primary/20" : "bg-muted"
                        )}
                    >
                        {isDragging ? (
                            <Upload className="h-8 w-8 text-primary animate-bounce" />
                        ) : (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                            {isDragging
                                ? "Solte a imagem aqui"
                                : "Upload do Logo"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {isDragging
                                ? "Solte para fazer o upload"
                                : "Arraste e solte uma imagem ou clique para selecionar"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF até 10MB
                        </p>
                    </div>

                    {!isDragging && (
                        <Button type="button" variant="simple" size="sm">
                            Selecionar Arquivo
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
