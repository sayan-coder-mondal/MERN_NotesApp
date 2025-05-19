import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { LoaderCircle } from 'lucide-react';

const Signup = () => {
    const {user} = useSelector(store=>store.auth);

    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", confirm_password: "" });
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        // console.log("Submit");
        e.preventDefault();
        setLoading(true);
        axios.post("/api/signup", newUser)
            .then((response) => {
                console.log(response.data)
                if (response.data.success == true) {
                    navigate('/login');
                    setNewUser({ name: "", email: "", password: "", confirm_password: "" });
                    toast(response.data.message);
                }
                else {
                    toast(response.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                // setNewUser({ name: "", email: "", password: "", confirm_password: "" });
                toast.error(error.response.data.message);
                setLoading(false);
            })
    }

    useEffect(()=>{
        if(user==true){
            navigate("/");
        }
    },[])
    return (
        <div className='flex items-center justify-center w-screen h-screen bg-amber-200'>
            <form className='shadow-lg flex flex-col gap-5 p-8 w-[360px] bg-white rounded-xl'>
                <div className='m-auto font-bold text-2xl text-yellow-500'><span className='text-3xl'>N</span>OTE<span className='text-3xl'>V</span>AULT</div>
                <div>
                    <span className='py-2 font-medium'>Name</span>
                    <Input type="text" placeholder="Enter your name" className='focus-visible:ring-transparent' value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                </div>
                <div>
                    <span className='py-2 font-medium'>Email</span>
                    <Input type="email" placeholder="Enter your email" className='focus-visible:ring-transparent' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                </div>
                <div>
                    <span className='py-2 font-medium'>Password</span>
                    <Input type="password" placeholder="Password" className='focus-visible:ring-transparent' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                </div>
                <div>
                    <span className='py-2 font-medium'>Confirm Password</span>
                    <Input type="password" placeholder="Confirm password" className='focus-visible:ring-transparent' value={newUser.confirm_password} onChange={(e) => setNewUser({ ...newUser, confirm_password: e.target.value })} />
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
                    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer" onClick={handleSubmit}>Signup</Button>
                }
                <p className='m-auto'>Does have an account? <span className='text-blue-600 font-medium cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    )
}

export default Signup