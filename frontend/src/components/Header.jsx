import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    return (
        <header className="bg-amber-100 shadow-md">
            <div className="flex justify-between item-center max-w-6xl mx-auto p-3">
                <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className="text-yellow-700">Real</span>
                    <span className="text-yellow-950">Domain</span>

                </h1>
                </Link>
                <form className="bg-yellow-50 p-3 rounded-lg flex items-center">
                    <input type="text" placeholder="Search" className='bg-transparent focus:outline-none w-24 sm:w-64'>
                    </input>
                    <FaSearch className='text-yellow-500' />
                </form>
                <ul className='flex gap-4'>
                    <Link to = '/home'>
                        <li className='hidden sm:inline text-yellow-700 hover:underline'>Home</li>
                    </Link>
                    <Link to ='/about'>
                        <li className='hidden sm:inline text-yellow-700 hover:underline'>About</li>
                    </Link>
                    <Link to ='/profile'>
                        {currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover'  src = {currentUser.avatar} alt='profile' />
                        ) : (
                            <li className=' text-yellow-700 hover:underline'>SignIn</li>
                        )}
                    </Link>

                </ul>
            </div>
        </header>
    )
}
