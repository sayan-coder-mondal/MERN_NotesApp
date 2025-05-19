import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SmallNote from './SmallNote';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import SortFilter from './SortFilter';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
// import { setAllNotes } from '../redux/slices/noteSlice';

const AllNotes = () => {
    const { filteredNotes } = useSelector(state => state.note);
    const { loading } = useSelector(state => state.loader);
    // const dispatch = useDispatch();

    useEffect(() => {

    }, [])


    return (
        <>

            <SortFilter />

            <div>
                {
                    loading
                        ?
                        <Loader />
                        :
                        (filteredNotes.length == 0)
                            ?
                            <div className='text-center text-2xl mt-4'>No note found</div>
                            :
                            <div>
                                <div className='flex flex-wrap gap-8 justify-center'>
                                    {
                                        filteredNotes.map((n) => {
                                            return <SmallNote note={n} key={n._id} />
                                        })
                                    }
                                </div>
                                <div className='text-center text-2xl mt-4 pb-6'>No more notes</div>
                            </div>
                }
            </div>
        </>
    )
}

export default AllNotes