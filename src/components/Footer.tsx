import Image from 'next/image';
import discordLogo from "/public/discord.svg";
import { ChevronRight } from "lucide-react";

export default function Footer() {

    return (
        <div className="fixed bottom-0 border-t-white/20 bg-black border-t w-screen">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-start md:justify-between gap-8 py-2 border-t border-white/5 font-syncopate text-xs font-bold uppercase tracking-widest text-zinc-600">
                    <div className="flex items-center">© {new Date().getFullYear()} AMWS. ALL RIGHTS RESERVED.</div>
                    <div className="flex justify-end items-center">
                        <a href="https://discord.gg/amws" target="_blank">
                            <img src="/discord.svg" alt="AMWS" className="size-8" />
                        </a>
                    </div>
                </div>

            </div>
        </div>

    );
}
