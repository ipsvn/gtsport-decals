import Image from 'next/image';
import discordLogo from "/public/discord.svg";

export default function Footer() {

    return (
        <div className="fixed bottom-0 border-t-border-gray bg-dark-gray border-t-2 w-screen">
            <div className="container">
                <div className="flex flex-col gap-2 sm:flex-row justify-between">
                    <div className="flex flex-col gap-2 p-4">
                        <a href="https://discord.gg/amworkshop" target="_blank" className="flex gap-2 items-center text-white font-medium">
                            <Image
                                src={discordLogo}
                                alt="Discord"
                            />
                            <span className="block">AutoMod Workshop</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
}
