import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-dark-gray min-h-screen h-full text-white">
      <div className="sticky top-0 z-50 bg-dark-gray w-full border-b-2 border-b-border-gray">
        <div className="container py-4 flex justify-between">
        </div>
      </div>
      <div className="container">
        <div className="flex justify-center">
          <div className="hidden md:block w-1/4 pr-8 border-r-2 border-r-border-gray py-4">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Creator</label>
              <input type="text" id="creator" name="creator" className="bg-dark-gray text-white border-border-gray border-2 rounded w-full py-2 px-3"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload date</label>
              <div className="flex space-x-2">
                <input type="text" id="upload-date-start" name="upload-date-start" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2000"/>
                <input type="text" id="upload-date-end" name="upload-date-end" className="border-border-gray border-2 bg-dark-gray rounded py-2 px-3 w-full" placeholder="01/01/2024"/>
              </div>
            </div>
          </div>
          <div className="w-3/4 pl-8 py-4">
            <h2 className="text-lg font-bold mb-4">Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="flex flex-col border-border-gray border-2">
                <div className="flex items-center justify-center aspect-3/2 p-4 bg-light-gray">
                  <img src="/fifteen52.svg" className="aspect-3/2"/>
                </div>
                <div className="p-4 border-t-border-gray border-t-2">
                  <h3 className="text-md font-bold">Logo name</h3>
                  <p className="text-sm">By: Creator</p>
                </div>
              </div>
              <div className="flex flex-col border-border-gray border-2">
                <div className="flex items-center justify-center aspect-3/2 p-4 bg-light-gray">
                  <img src="/52.svg" className="aspect-3/2"/>
                </div>
                <div className="p-4 border-t-border-gray border-t-2">
                  <h3 className="text-md font-bold">Logo name</h3>
                  <p className="text-sm">By: Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

