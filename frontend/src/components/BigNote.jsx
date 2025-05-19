import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { SquarePen, Trash2 } from 'lucide-react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { setLoading } from '@/redux/slices/loadingSlice';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';

const BigNote = () => {
    const params = useParams();
    const noteId = params.id;
    const [singleNote, setSingleNote] = useState({ title: "", note: "" });
    const [deleteOpen, setDeleteOpen] = useState(false);
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/api/singleNote/${noteId}`)
            .then((response) => {
                if (response.data.success) {
                    // console.log(response.data.target_note);
                    setSingleNote(response.data.target_note);
                    // setTimeout(() => {
                        dispatch(setLoading(false));
                    // }, 1000);
                }
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                // setTimeout(() => {
                    dispatch(setLoading(false));
                // }, 1000);
            });
    }, []);

    // useEffect(() => {
    //     console.log(singleNote);
    // }, [singleNote])


    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(setLoading(false));
    //     }, 2000);
    //     // console.log(loading);
    // }, [])


    function handleUpdate(e) {
        e.preventDefault();
        axios.put(`/api/updateNote/${noteId}`, singleNote)
            .then((response) => {
                if (response.data.success) {
                    navigate("/");
                    toast(response.data.message);
                    setSingleNote({ title: "", note: "" });
                }
                else {
                    toast(response.data.message);
                }
                setDeleteOpen(false);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                toast.error(error.response.data.message);
                setDeleteOpen(false);
            });
    }

    function handleDelete(e) {
        e.preventDefault();
        axios.delete(`/api/deleteNote/${noteId}`, singleNote)
            .then((response) => {
                if (response.data.success) {
                    navigate("/");
                    toast(response.data.message);
                    setSingleNote({ title: "", note: "" });
                }
                else {
                    toast(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                toast.error(error.response.data.message);
            });
    }

    return (
        <>
            <div className="bg-blue-200 min-h-screen">
                {/* <Button onClick={()=>navigate("/")}>Home</Button> */}

                <Header />

                {
                    loading
                        ?
                        <Loader />
                        :

                        <>
                            <AlertDialog open={deleteOpen}>
                                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your note..
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className=" bg-red-600 hover:bg-red-500 cursor-pointer flex justify-center" onClick={handleDelete}><Trash2 />Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <form className='flex flex-col gap-3 items-center'>
                                <input value={singleNote.title} onChange={(e) => setSingleNote({ ...singleNote, title: e.target.value })} className="w-[80vw] focus-visible:ring-transparent border-2 font-medium text-xl md:text-xl p-2 rounded-md bg-white" placeholder="Title" />
                                <Textarea value={singleNote.note} onChange={(e) => setSingleNote({ ...singleNote, note: e.target.value })} className="w-[80vw] h-[50vh] focus-visible:ring-transparent border-2 bg-white" placeholder="Write note here" />
                                <Button type="submit" className="w-[80vw] m-auto bg-yellow-500 hover:bg-yellow-400 cursor-pointer flex justify-center" onClick={handleUpdate}><SquarePen />UPDATE</Button>
                                <Button type="button" className="w-[80vw] m-auto bg-red-600 hover:bg-red-500 cursor-pointer flex justify-center" onClick={() => setDeleteOpen(true)}><Trash2 />DELETE</Button>
                            </form>
                        </>
                }
            </div>
        </>
    )
}

export default BigNote