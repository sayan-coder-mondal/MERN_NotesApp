import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'sonner';
import AllNotes from './AllNotes';
import Header from './Header';
import { LoaderCircle, NotebookPen } from 'lucide-react';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        axios.get("/api/logout")
            .then((response) => {
                if (response.data.success) {
                    navigate("/login");
                    toast(response.data.message);
                }
            })
            .catch(error => console.error('Some error happened: ', error))
    }

    useEffect(() => {
      setLoading(false);
    }, [])
    

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header />


            <div className='flex justify-center'>
                {
                    loading
                        ?
                        <button className="w-[50vw] bg-green-600 hover:bg-green-500 font-medium text-2xl cursor-pointer p-2 shadow-md border-2 border-green-700 rounded-2xl text-white flex justify-center items-center"><LoaderCircle className='animate-spin' />Please Wait</button>
                        :
                        <button onClick={() => {setLoading(true);navigate("/addnote");}} className="w-[50vw] bg-green-600 hover:bg-green-500 font-medium text-2xl cursor-pointer p-2 shadow-md border-2 border-green-700 rounded-2xl text-white flex justify-center items-center"><NotebookPen />ADD NOTES</button>
                }
            </div>


            <AllNotes />
        </div>
    )
}

export default Home