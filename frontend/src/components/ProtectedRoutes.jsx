import { setAuthUser } from '@/redux/slices/authSlice';
import { setAllNotes, setFilteredNotes } from '@/redux/slices/noteSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoutes = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch=useDispatch();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            toast("You cannot access this page")
        }
        else if(user==true) {
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
        }
    }, [children])
    return <>{children}</>
}

export default ProtectedRoutes;