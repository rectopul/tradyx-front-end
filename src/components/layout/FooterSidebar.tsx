import { useNavigate, useLocation } from "react-router-dom";
import { asset } from "@/utils/helpers";
import homeNormal from "@/assets/icons/house-solid-normal.png";
import homeActive from "@/assets/icons/house-solid.png";
import missionActive from "@/assets/mission/mission-active.png";
import missionNormal from "@/assets/mission/mission-normal.png";
import referralsActive from "@/assets/referrals/referrals-active.png";
import referralsNormal from "@/assets/referrals/referrals-normal.png";
import profileActive from "@/assets/profile/profile-active.png";
import profileNormal from "@/assets/profile/profile-normal.png";

export function FooterSidebar() {
    const navigation = useNavigate();
    const location = useLocation();

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full flex items-center h-[67px] shadow-top shadow-tradyx-950 rounded-t-[30px]">
                <div className="w-full bg-secondary-gradient h-[67px] rounded-t-[30px] shadow-top-inset shadow-tradyx-600 bg-transparent pb-6 pt-1 font-avenir font-normal fixed bottom-0 left-0 z-50 grid grid-cols-5 gap-12 py-1 p-4 text-gray-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 rounded-b-full bg-morph-back border-b border-tradyx-600"></div>
                    {/* Início */}
                    <button
                        className={`flex flex-col bg-transparent justify-center relative items-center transition-all duration-300 text-xs`}
                        onClick={() => navigation("/")}
                    >
                        <span
                            className="w-8 h-8 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${
                                    location.pathname === "/"
                                        ? homeActive
                                        : homeNormal
                                })`,
                            }}
                        ></span>
                    </button>

                    {/* Mossões */}
                    <button
                        className={`flex flex-col -translate-x-6 bg-transparent justify-center relative items-center transition-all duration-300 text-xs 
                    ${
                        location.pathname === "/challenges"
                            ? "text-white"
                            : "text-white/50"
                    }`}
                        onClick={() => navigation("/challenges")}
                    >
                        <span
                            className="w-8 h-8 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${
                                    location.pathname === "/challenges"
                                        ? missionActive
                                        : missionNormal
                                })`,
                            }}
                        ></span>
                    </button>

                    {/* Depósito */}
                    <button
                        className={`flex flex-col bg-gradient-three rounded-full shadow-top-inset shadow-tradyx-300 w-16 h-16 -translate-x-[14.5px] -translate-y-8 justify-center relative items-center transition-all duration-300 text-xs 
                    ${
                        location.pathname === "/deposit"
                            ? "text-white"
                            : "text-white/50"
                    }`}
                        onClick={() => navigation("/deposit")}
                    >
                        {location.pathname === "/deposit" && (
                            <span className="w-3 h-[3px] rounded-full bg-green-haze-500 absolute -bottom-1 left-1/2 -translate-x-1/2"></span>
                        )}
                        <span
                            className="bg-cover bg-no-repeat w-9 h-9 bg-center relative text-pacific-blue-900"
                            style={{
                                backgroundImage: `url(${asset(
                                    "/assets/images/icons/tradyx-money.svg"
                                )})`,
                            }}
                        ></span>
                    </button>

                    {/* Sacar */}
                    <button
                        className={`flex flex-col translate-x-6 bg-transparent justify-center relative items-center transition-all duration-300 text-xs 
                    ${
                        location.pathname === "/referrals"
                            ? "text-white"
                            : "text-white/50"
                    }`}
                        onClick={() => navigation("/referrals")}
                    >
                        <span
                            className="w-8 h-8 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${
                                    location.pathname === "/referrals"
                                        ? referralsActive
                                        : referralsNormal
                                })`,
                            }}
                        ></span>
                    </button>

                    {/* Perfil */}
                    <button
                        className={`flex flex-col bg-transparent justify-center relative items-center transition-all duration-300 text-xs 
                    ${
                        location.pathname === "/profile"
                            ? "text-white"
                            : "text-white/50"
                    }`}
                        onClick={() => navigation("/profile")}
                    >
                        <span
                            className="w-8 h-8 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${
                                    location.pathname === "/profile"
                                        ? profileActive
                                        : profileNormal
                                })`,
                            }}
                        ></span>
                    </button>
                </div>
            </div>
        </>
    );
}
