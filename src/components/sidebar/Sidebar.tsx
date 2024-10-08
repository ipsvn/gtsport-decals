import SidebarCreatorAutocomplete from "./SidebarCreatorAutocomplete";
import SidebarSortSelect from "./SidebarSortSelect";
import SidebarTagSelect from "./SidebarTagSelect";

export default function Sidebar() {
    return (
        <div className="hidden md:flex flex-col justify-between gap-4 w-1/4 pr-8 mr-4 border-r-2 border-r-border-gray py-4 sticky top-[62px] h-[calc(100vh-124px)] font-sans">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Sort</h2>
                <SidebarSortSelect />
                <h2 className="text-lg font-bold">Filters</h2>
                <SidebarCreatorAutocomplete></SidebarCreatorAutocomplete>
                {/* <div>
                    <label className="block text-sm font-medium mb-2">Upload date</label>
                    <div className="lg:flex lg:space-x-2">
                        <input type="text" id="upload-date-start" name="upload-date-start" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2000" />
                        <input type="text" id="upload-date-end" name="upload-date-end" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2024" />
                    </div>
                </div> */}
                <SidebarTagSelect />
            </div>
            <div className="flex flex-col py-4 gap-2 border-t-2 border-t-border-gray">
                <span className="text-white">Database rescued by Bornhall</span>
                <span className="text-white">Front-end by <a href="https://dehy.lol" target="_blank" className="text-white font-semibold">dehy</a></span>
                <span className="text-white">Back-end by <a href="https://github.com/ipsvn/" target="_blank" className="text-white font-semibold">svn</a></span>
            </div>
        </div>
    );
}