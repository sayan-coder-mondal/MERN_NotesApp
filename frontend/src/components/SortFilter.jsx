import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setAllNotes, setFilteredNotes } from '@/redux/slices/noteSlice';
import axios from 'axios';
import { setLoading } from '@/redux/slices/loadingSlice';
import Loader from './Loader';

const SortFilter = () => {
    const { allNotes } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const [sortType, setSortType] = useState("Recently Created");
    const [filterType, setFilterType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [searchVal, setSearchVal] = useState("");

    const fetchAllNotes = async () => {
        try {
            dispatch(setLoading(true));

            const response = await axios.get("/api/allNotes", { params: { sortType } });
            if (response.data.success) {
                // console.log(response.data.all_notes);
                dispatch(setAllNotes(response.data.all_notes));
                // console.log(allNotes);
            }
            // setTimeout(() => {
            //     dispatch(setLoading(false));
            // }, 2000);

        } catch (error) {
            console.error('Error fetching items:', error);
            // toast.error(error.response.data.message);
            // setTimeout(() => {
            //     dispatch(setLoading(false));
            // }, 2000);

        }
        finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        fetchAllNotes();
    }, [sortType])

    // useEffect(() => {
    //     console.log(allNotes);
    // }, [allNotes])


    function handleChangeSort(value) {
        setSortType(value)
        // console.log(selectedValueSorting);
    }

    useEffect(() => {
        console.log(sortType);
    }, [sortType]);


    function handleFilter() {
        // console.log("Filter Applied");
        // console.log(filterType);
        // console.log(startDate);
        // console.log(endDate);
        // setFilterType("");
        // setStartDate("");
        // setEndDate("");
        setVisibleFilter(false);
    }


    useEffect(() => {
        const filtered = allNotes.filter(
            item =>
                item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                item.note.toLowerCase().includes(searchVal.toLowerCase())
        );
        //   console.log(filtered);
        //   console.log(allNotes);
        dispatch(setFilteredNotes(filtered));
    }, [searchVal,allNotes])

    return (
        <div className='flex flex-col items-center gap-3 mt-[20px]'>
            <Input className='bg-white w-[80vw]' value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder="Search notes" />

            <div className='flex flex-col md:flex-row w-[80vw] justify-between items-center md:items-start gap-6'>
                <Select value={sortType} onValueChange={handleChangeSort}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Recently Created" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Recently Created">Recently Created</SelectItem>
                        <SelectItem value="Earliest Created">Earliest Created</SelectItem>
                        <SelectItem value="Recently Updated">Recently Updated</SelectItem>
                        <SelectItem value="Earliest Updated">Earliest Updated</SelectItem>
                    </SelectContent>
                </Select>

                <div className='flex flex-col justify-center items-center'>
                    <Select value={filterType} onValueChange={(value) => {
                        setFilterType(value); setVisibleFilter(true);
                    }}>
                        <SelectTrigger className="w-[160px] bg-white">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Date Created">Date Created</SelectItem>
                            <SelectItem value="Date Updated">Date Updated</SelectItem>
                        </SelectContent>
                    </Select>


                    <Input type='date' className={visibleFilter ? 'bg-white w-[160px] mt-[10px]' : 'hidden'} onChange={(e) => setStartDate(e.target.value)} />
                    <span className={visibleFilter ? "" : "hidden"}>to</span>
                    <Input type='date' className={visibleFilter ? 'bg-white w-[160px]' : 'hidden'} onChange={(e) => setEndDate(e.target.value)} />
                    <Button onClick={handleFilter} className={visibleFilter ? "w-[160px] mt-[5px] cursor-pointer hover:bg-gray-800" : "hidden"}>Apply</Button>
                </div>
            </div>
        </div>
    )
}

export default SortFilter