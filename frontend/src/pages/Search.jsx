
export default function Search() {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-10 border-b-2 md:border-r-2 md:min-h-screen">
                <form className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                            <label className="whitespace-nowrap font-semibold">Search Term:</label>
                            <input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-3 w-full"></input>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="all" className="w-5"></input>
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5"></input>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5"></input>
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5"></input>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5"></input>
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5"></input>
                            <span>Frunished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select id="sort_order" className="border rounded-lg p-3 w-full">
                            <option>Price: High to Low</option>
                            <option>Price: Low to High</option>
                            <option>Latest</option>
                            <option>Oldest</option>

                        </select>
                    </div>
                    <button className="bg-yellow-300 text-white p-3 rounded-lg hover:opacity-80">Search</button>
                </form>
            </div>
            <div className="">
                <h1 className="text-3xl font-semibold border-b p-3 text-yellow-800 mt-8">Listing results:</h1>
            </div>
        </div>
    )
}
