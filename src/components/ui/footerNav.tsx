import React from "react";
import {
    Home,
    ArrowDownUp,
    LineChart,
    Settings,
    LayoutGrid,
} from "lucide-react";
import "../../assets/footerNav.css";

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <div className="footer-nav">
                <div className="nav-item">
                    <button className="nav-button">
                        <Home size={20} />
                        <span>Dashboard</span>
                    </button>
                </div>
                <div className="nav-item">
                    <button className="nav-button">
                        <ArrowDownUp size={20} />
                        <span>Transações</span>
                    </button>
                </div>

                {/* Empty space for the center button */}
                <div className="nav-item center-placeholder"></div>

                <div className="nav-item">
                    <button className="nav-button">
                        <LineChart size={20} />
                        <span>Comissões</span>
                    </button>
                </div>
                <div className="nav-item">
                    <button className="nav-button">
                        <Settings size={20} />
                        <span>Configurações</span>
                    </button>
                </div>
            </div>

            {/* Center floating button */}
            <div className="center-button-container">
                <button className="center-button">
                    <LayoutGrid size={24} />
                    <span>Planos</span>
                </button>
            </div>
        </div>
    );
};

export default Footer;
