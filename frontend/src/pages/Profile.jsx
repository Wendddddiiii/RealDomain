import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, loading} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const dispatch = useDispatch();


  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      } 
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
        dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-yellow-800">Profile</h1>
      <form onSubmit = {handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-2"
        ></img>
        <p className='text-sm self-center '>
          {fileUploadError ? (
          <span className="text-red-800">Error Image Upload
          (Image must be less than 10 mb)</span> 
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-yellow-600">
              {`Uploading ${filePerc}%`}
            </span>
          ) :  filePerc === 100 ? (
              <span className="text-yellow-600">Image uploaded successfully!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange = {handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange = {handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        ></input>
        <button disabled={loading} className="bg-yellow-600 text-white rounded-lg p-3 hover:opacity-80 disabled:opacity-70">
          {loading ? 'Loading...': 'Update'}
        </button>
        <Link className='bg-amber-400 text-white p-3 rounded-lg text-center hover:opacity-80' to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex flex-col justify-between mt-2">
        <span onClick = {handleDeleteUser} className="text-red-800 cursor-pointer">Delete account</span>
        <span onClick = {handleSignOut} className="text-red-800 cursor-pointer">Sign out</span>
      </div>

      <p className="text-yellow-600 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
      <button onClick={handleShowListings} className="bg-yellow-200 text-yellow-900 rounded-lg p-3 hover:opacity-80 w-full">Show Listings</button>
      <p className="text-red-800 mt-5 ">{showListingsError ? 'Error showing listings' : ''}</p>
      {userListings && userListings.length > 0 && 
        <div className="flex flex-col gap-5">
          <h1 className="text-center mt-6 font-semibold text-2xl">Your Listings</h1>
          {userListings.map((listing) => (
          <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
                  {listing.imageUrls && listing.imageUrls.length > 0 && (
                      <img src={listing.imageUrls[0]} alt="listing cover" className="h-24 w-24 object-contain rounded-lg"/>
                  )}
              </Link>

              <Link className="flex-1 text-slate-700 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center gap-3">
                <button className="bg-yellow-300 text-yellow-900 rounded-lg p-3 hover:opacity-80 w-20">Delete</button>
                <button className="bg-yellow-400 text-yellow-900 rounded-lg p-3 hover:opacity-80 w-20">Edit</button>
              </div>
          </div>
          ))}
        </div>}
    </div>
  );
}