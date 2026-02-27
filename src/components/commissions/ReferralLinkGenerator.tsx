import React from "react";
import { ReferralLink } from "../../types/referral.types";
import { Copy, LinkIcon } from "lucide-react";

interface ReferralLinkGeneratorProps {
    referralLink: ReferralLink | null;
    onGenerateLink: () => void;
    onCopy: (text: string) => void;
    copySuccess: boolean;
}

const ReferralLinkGenerator: React.FC<ReferralLinkGeneratorProps> = ({
    referralLink,
    onGenerateLink,
    onCopy,
    copySuccess,
}) => {
    return (
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl animate-fade-in">
            {!referralLink ? (
                <button
                    onClick={onGenerateLink}
                    className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-white/90 transition font-medium px-4 py-3 rounded-lg"
                >
                    <LinkIcon size={18} />
                    <span>Gerar Meu Link de Referência</span>
                </button>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-sm font-medium text-white">
                            Seu código:{" "}
                        </span>
                        <span className="bg-blue-700 text-white text-sm font-mono px-2 py-1 rounded">
                            {referralLink.ref_id}
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={referralLink.referral_link}
                            readOnly
                            className="w-full bg-white/20 border border-white/30 text-white px-4 py-3 pr-24 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button
                            onClick={() => onCopy(referralLink.referral_link)}
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md text-sm font-medium transition ${
                                copySuccess
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white text-blue-700 hover:bg-blue-50"
                            }`}
                        >
                            <span className="flex items-center gap-1">
                                {copySuccess ? (
                                    "Copiado!"
                                ) : (
                                    <>
                                        <Copy size={14} />
                                        <span>Copiar</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                    <p className="text-xs text-blue-100">
                        Compartilhe este link com seus amigos e ganhe comissões
                        quando eles investirem.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReferralLinkGenerator;
