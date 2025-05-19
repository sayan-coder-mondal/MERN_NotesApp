import { setAuthUser } from '@/redux/slices/authSlice';
import { setAllNotes, setFilteredNotes } from '@/redux/slices/noteSlice';
import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
    const { allNotes } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    function handleLogout() {
        axios.get("/api/logout",{ withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    dispatch(setAuthUser(false));
                    navigate("/login");
                    dispatch(setAllNotes([]));
                    dispatch(setFilteredNotes([]));
                    toast(response.data.message);
                }
            })
            .catch(error => console.error('Some error happened: ', error))
    }
  return (
    <div className='flex justify-between p-2 md:p-4 mb-4 bg-amber-100'>
        <div className='font-bold text-xl md:text-2xl text-yellow-500 hover:text-yellow-600 cursor-pointer' onClick={()=>navigate("/")}><span className='text-2xl md:text-3xl'>N</span>OTE<span className='text-2xl md:text-3xl'>V</span>AULT</div>
        <div className='font-medium text-md md:text-lg hover:text-gray-700 cursor-pointer' onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default Header