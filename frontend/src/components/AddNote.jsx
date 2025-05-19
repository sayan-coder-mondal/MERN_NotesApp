import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import Header from './Header'

const AddNote = () => {
  const [newNote, setNewNote] = useState({ title: "", note: "" });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("/api/addNote", newNote)
      .then((response) => {
        if (response.data.success) {
          navigate("/");
          toast(response.data.message);
          setNewNote({ title: "", note: "" });
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
    <div className="bg-blue-200 min-h-screen">
      {/* <Button onClick={()=>navigate("/")}>Home</Button> */}

      <Header/>

      <form className='flex flex-col gap-3 items-center'>
        <input value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} className="w-[80vw] focus-visible:ring-transparent border-2 font-medium text-xl md:text-xl p-2 rounded-md bg-white" placeholder="Title" />
        <Textarea value={newNote.note} onChange={(e) => setNewNote({ ...newNote, note: e.target.value })} className="w-[80vw] h-[55vh] focus-visible:ring-transparent border-2 bg-white" placeholder="Write note here" />
        <Button type="submit" className="w-[80vw] m-auto bg-yellow-500 hover:bg-yellow-400 cursor-pointer" onClick={handleSubmit}>ADD NOTE</Button>
      </form>
    </div>
  )
}

export default AddNote