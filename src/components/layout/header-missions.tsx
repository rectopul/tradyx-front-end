import { useUser } from "@/contexts/UserProvider";
import { VipFlag } from "../icons/lib";
import { asset, maskString } from "@/utils/helpers";

export function HeaderMissions() {
    const { user } = useUser();

    return (
        <>
            <div className="w-full flex flex-col bg-gradient-to-b from-blue-zodiac-950 to-blue-zodiac-500 p-6 pb-0 relative mb-10">
                <span className="w-full h-10 rounded-b-[50%] -bottom-9 left-0 absolute flex bg-slate-600 hidden"></span>
                <div className="w-full flex items-center relative gap-3 bg-gradient-to-r from-harvest-gold-300 to-harvest-gold-200 py-6 p-4 rounded-t-lg">
                    {/* Selo VIP TOP */}
                    <div className="absolute top-0 right-0 py-1 gap-1 flex items-center bg-gradient-to-r from-harvest-gold-300 to-harvest-gold-200 pl-4 rounded-tr-lg rounded-l-md">
                        <span className="text-[16px] italic font-bold text-harvest-gold-600">
                            VIP 1
                        </span>
                        <div
                            className="bg-cover bg-top w-7 h-7"
                            style={{
                                backgroundImage: `url(${asset(
                                    "/assets/images/icons/seal-gold.svg"
                                )})`,
                            }}
                        ></div>
                    </div>
                    <div className="w-10 bg-slate-700 text-white h-10 rounded-full flex justify-center items-center border-4 border-white">
                        <VipFlag className="w-5 h-5" />
                    </div>

                    <span className="text-sm font-semibold text-harvest-gold-700">
                        {maskString(user?.phone ?? "")}
                    </span>
                </div>
            </div>
        </>
    );
}
