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
                    <div className="flex flex-col gap-2 sm:text-end p-4 border-t-2 border-t-border-gray sm:border-t-0">
                        <span className="text-white">Database rescued by Bornhall</span>
                        <span className="text-white">Front-end by <a href="https://dehy.lol" target="_blank" className="text-white font-semibold">dehy</a></span>
                        <span className="text-white">Back-end by <a href="https://github.com/ipsvn/" target="_blank" className="text-white font-semibold">svn</a></span>
                    </div>
                </div>
            </div>
        </div>

    );
}
