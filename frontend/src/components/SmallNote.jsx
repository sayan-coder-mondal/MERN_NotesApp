import { setLoading } from '@/redux/slices/loadingSlice';
import { CalendarDays } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const SmallNote = ({ note }) => {
    // console.log(note);
    const dispatch=useDispatch();
    const navigate = useNavigate();


    const isoDate = note.createdAt;
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    // console.log(formattedDate);
    
    return (
        <>
            <div onClick={() =>{dispatch(setLoading(true)); navigate(`/note/${note._id}`)}} className='bg-amber-100 w-[300px] m-2 rounded-md shadow-md cursor-pointer'>
                <p className='bg-amber-400 font-medium text-2xl p-3 text-center rounded-t-md shadow-md text-white h-[60px] overflow-hidden whitespace-nowrap text-ellipsis'>{note.title}</p>
                <p className='p-3 h-[230px] overflow-hidden mb-2'>{note.note}</p>
                <p className='border-2 border-gray-500 rounded-2xl mb-2 w-[250px] m-auto'></p>
                <p className='flex gap-2 pl-[25px] pb-[15px]'><CalendarDays />{formattedDate}</p>
            </div>
        </>
    )
}

export default SmallNote