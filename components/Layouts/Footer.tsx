import { IRootState } from "@/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Footer = () => {
    const pathname = usePathname()
    return (
        <>
        {
            pathname.toString().includes('/idmcommand') ?
            ''
            :
            <div className="p-6 pt-0 mt-auto text-xs text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">© 2025.Point of Sales V{useSelector((state: IRootState) => state.themeConfig.versi_app)}</div>
        }
        </>
        
    );
};

export default Footer;
