import { setAuthUser } from '@/redux/slices/authSlice'
import { setAllNotes, setFilteredNotes } from '@/redux/slices/noteSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CheckCookies = ({children}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(() => {
      axios.get("/api/checkCookies")
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
    }, [])
    
  return (
    <>{children}</>
  )
}

export default CheckCookies