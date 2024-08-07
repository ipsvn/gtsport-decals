import Image from "next/image";
import { searchDecals } from "../lib/data";
import ResultCard from "./resultcard";
import Search from "./search";


export default async function Page(
    {
        searchParams,
    }: {
        
        searchParams?: SearchParams;
    }
) {

    const query = searchParams?.query || '';
    const data = await searchDecals(query, 10);

    return (
        <div>
            <Search></Search>
            {data.map(it => ( <ResultCard key={it.id} decal={it}/> ))}
        </div>
    );
}