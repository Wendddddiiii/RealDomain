import { useSelector } from "react-redux";




export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-2"></img>
        <input type="text" placeholder='username' id = 'username' className="border p-3 rounded-lg"></input>
        <input type="email" placeholder='email' id = 'email' className="border p-3 rounded-lg"></input>
        <input type="password" placeholder='password' id = 'password' className="border p-3 rounded-lg"></input>
        <button className='bg-yellow-700 text-white rounded-lg p-3 hover:opacity-80 disabled:opacity-70'>Update</button>
      </form>
      <div className="flex flex-col justify-between mt-2">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>

      </div>
    </div>
  )
}
