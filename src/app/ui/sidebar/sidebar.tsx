import SidebarCreatorAutocomplete from "./creator-autocomplete";
import SidebarSortSelect from "./sidebar-sort";

export default async function Sidebar() {



    return (
        <div className="hidden md:block w-1/4 pr-8 mr-4 border-r-2 border-r-border-gray py-4 sticky top-[62px] h-[100vh - 62px]">
            <h2 className="text-lg font-bold mb-4">Sort</h2>
            <div className="mb-4">
                <SidebarSortSelect />
            </div>
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="mb-4">
                <SidebarCreatorAutocomplete></SidebarCreatorAutocomplete>
            </div>
            {/* <div>
                <label className="block text-sm font-medium mb-2">Upload date</label>
                <div className="lg:flex lg:space-x-2">
                    <input type="text" id="upload-date-start" name="upload-date-start" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2000" />
                    <input type="text" id="upload-date-end" name="upload-date-end" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2024" />
                </div>
            </div> */}
        </div>
    );
}