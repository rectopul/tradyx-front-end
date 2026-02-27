import { Pix } from "@/assets/icons/Check";
import { asset } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

export function TopBar() {
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full bg-ebony-clay-950 grid grid-cols-[70%_auto] rounded-lg overflow-hidden">
                <div
                    className="bg-contain bg-right bg-no-repeat p-3 text-white text-xl font-semibold flex items-center gap-2"
                    onClick={() => navigate("/purchases")}
                    style={{
                        backgroundImage: `url(${asset(
                            "/assets/images/backgrounds/divider.png"
                        )})`,
                        backgroundColor: "#5b8ed6",
                    }}
                >
                    <span
                        className="w-6 h-6 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${asset(
                                "/assets/images/icons/tranding-up.svg"
                            )})`,
                        }}
                    ></span>
                    Investimentos
                </div>

                <div
                    className="p-3 pl-0 text-white text-xl font-semibold flex items-center gap-2 justify-end"
                    onClick={() => navigate("/withdraw_account/setup")}
                >
                    <Pix className="w-6 h-6" />
                    Conta
                </div>
            </div>
        </>
    );
}
