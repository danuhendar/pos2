// In a Next.js component (Client-side only)
'use client'
import { useTranslation } from "react-i18next";
import AntiScrapeShield from 'anti-scrape-shield';
import { useEffect, useRef } from "react";

interface AntiScrapedShieldComponentProps{
    in_content: any,
}

const AntiScrapedShieldComponent: React.FC<AntiScrapedShieldComponentProps> = ({in_content}) => {
    const { t, i18n } = useTranslation();
    const componentRef = useRef(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && componentRef.current) {
                const shield = new AntiScrapeShield({
                    obfuscate: true,
                    honeypot: true,
                    detect: true,
                    rateLimit: {
                        maxRequests: 100,
                        perSeconds: 60
                    }
            });
            shield.protect(componentRef.current);
        }
    }, []);
    return (
        <>
        <div ref={componentRef}>{in_content}</div>
        </>
    )
}
export default AntiScrapedShieldComponent;