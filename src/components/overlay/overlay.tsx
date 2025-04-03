import { ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import PopupAnimation from "@components/popup/popupAnimation";

const Overlay = ({
    children,
    className,
    onClick
}: {
    children?: ReactNode;
    className? : string
    onClick?: () => void;
}) => {
    return (
        <PopupAnimation
            className={`fixed flex justify-center items-center top-0 left-0 z-[10] w-[100vw] h-[100vh] bg-[#15151f5b] backdrop-filter backdrop-blur-sm ${className}`}
        >
            <div className="fixed flex top-0 left-0 z-[-1] w-full h-full"
                onClick={onClick}
            >
            
            </div>
            {children}
        </PopupAnimation>
    );
};

export default Overlay;
