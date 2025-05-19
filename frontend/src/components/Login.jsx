import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/slices/authSlice';
import { LoaderCircle } from 'lucide-react';

const Login = () => {
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();

    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        // console.log("Submit");
        e.preventDefault();
        setLoading(true);
        axios.post("/api/login", loginUser)
            .then((response) => {
                console.log(response.data)
                if (response.data.success == true) {
                    dispatch(setAuthUser(true));
                    navigate('/');
                    setLoginUser({ email: "", password: "" });
                    toast(response.data.message);
                }
                else {
                    toast(response.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                // setLoginUser({ email: "", password: "" });
                toast.error(error.response.data.message);
                setLoading(false);
            });
    }

    useEffect(()=>{
        if(user==true){
            navigate("/");
        }
    },[])
    return (
        <div className='flex items-center justify-center w-screen h-screen bg-amber-200'>
            <form onSubmit={handleSubmit} className='shadow-lg flex flex-col gap-5 p-8 w-[360px] bg-white rounded-xl'>
                {/* <div className='m-auto font-bold text-2xl text-yellow-500'>MY NOTES</div> */}
                <div className='m-auto font-bold text-2xl text-yellow-500'><span className='text-3xl'>N</span>OTE<span className='text-3xl'>V</span>AULT</div>
                <div>
                    <span className='py-2 font-medium'>Email</span>
                    <Input type="email" placeholder="Enter your email" className='focus-visible:ring-transparent' value={loginUser.email} onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })} />
                </div>
                <div>
                    <span className='py-2 font-medium'>Password</span>
                    <Input type="password" placeholder="Password" className='focus-visible:ring-transparent' value={loginUser.password} onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} />
                </div>
                {
                    loading
                    ?
                    <Button type='button' className='bg-yellow-500 hover:bg-yellow-400' onClick={()=>console.log("HJDHJDDHJHJ")
                    }>
                    <LoaderCircle className='animate-spin' />
                    Please Wait
                    </Button>
                    :
                    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer">Login</Button>
                }
                <p className='m-auto'>Does not have an account? <span className='text-blue-600 font-medium cursor-pointer' onClick={() => navigate('/signup')}>Signup</span></p>
            </form>
        </div>
    )
}

export default Login