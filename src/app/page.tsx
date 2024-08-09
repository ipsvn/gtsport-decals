import Image from "next/image";
import { searchDecals } from "./lib/data";
import ResultCard from "./ui/result-card";
import Search from "./ui/search";
import Footer from "./ui/footer";


export default async function Page(
    {
        searchParams,
    }: {
        searchParams?: SearchParams;
    }
) {

    const query = searchParams?.query || '';
    const data = await searchDecals(query, 50);

    return (
        <main className="relative bg-dark-gray min-h-screen h-full text-white font-sans">
            <div className="sticky top-0 z-50 bg-dark-gray w-full border-b-2 border-b-border-gray">
                <Search></Search>
            </div>
            <div className="container">
                <div className="flex justify-center">
                    {/* <div className="hidden md:block w-1/4 pr-8 border-r-2 border-r-border-gray py-4">
                        <h2 className="text-lg font-bold mb-4">Filters</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Creator</label>
                            <input type="text" id="creator" name="creator" className="bg-dark-gray text-white border-border-gray border-2 rounded w-full py-2 px-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Upload date</label>
                            <div className="flex space-x-2">
                                <input type="text" id="upload-date-start" name="upload-date-start" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2000" />
                                <input type="text" id="upload-date-end" name="upload-date-end" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2024" />
                            </div>
                        </div>
                    </div> */}
                    <div className="w-full py-4">
                        <h2 className="text-3xl font-bold mb-4">Results</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-52 sm:pb-32">

                            {data.map(it => (<ResultCard key={it.id} decal={it} />))}

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
