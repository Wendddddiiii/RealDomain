


export default function CreateListing() {
    return (
        <main className="p-3 max-4-xl mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-5'>
                <div className="flex flex-col gap-5 flex-1">
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='50' minLength='10' required></input>
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required></textarea>
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required></input>
                    <div className="flex gap-5 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id ='sale' className="w-5"></input>
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id ='rent' className="w-5"></input>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id ='parking' className="w-5"></input>
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id ='furnished' className="w-5"></input>
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id ='offer' className="w-5"></input>
                            <span>Offer</span>
                        </div>
                    </div>   
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" min='1' max='12' required className="p-3 border border-gray-300 rounded-lg"></input>
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" min='1' max='12' required className="p-3 border border-gray-300 rounded-lg"></input>
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularPrice" min='1' max='12' required className="p-3 border border-gray-300 rounded-lg"></input>
                            <div className="flex flex-col items-left">
                                <p>Regular Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                            
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="discountPrice" min='1' max='12' required className="p-3 border border-gray-300 rounded-lg"></input>
                            <div className="flex flex-col items-left">
                                <p>Discounted Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>
                    </div>             
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">Upload photos of your listing here
                        <span className="font-normal text-gray-600 ml-2">(max 6)</span>                    
                    </p>
                    <div className="flex gap-5">
                        <input className="p-3 border border-gray-300 rounded-lg w-full" type="file" id="images" accept='image/*' multiple></input>
                        <button className="p-3 text-yellow-700 border border-yellow-800 rounded-lg hover:shadow-lg disabled:opacity-65">Upload</button>
                    </div>
                    <button className="p-3 bg-yellow-400 text-white rounded-lg hover:opacity-80 disabled:opacity-60">Create Listing</button>
                </div>
            </form>
        </main>
    )
}
