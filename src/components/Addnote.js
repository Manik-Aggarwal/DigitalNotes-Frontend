import {React, useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    
    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note added successfully","success");
        setNote({title: "", description: "", tag: ""});
    }
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
  return (
      <>
      <div className="container mt-5 login-container">
        <h1 className='mt-1'>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" placeholder='Enter the title' value={note.title} className="form-control" name='title' id="title" onChange={onchange} aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" placeholder='Enter the description' value={note.description} onChange={onchange} className="form-control" name='description' id="description" />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" placeholder='Enter the tag' value={note.tag} onChange={onchange} className="form-control" name='tag' id="tag" />
          </div>

          <div className='text-center d-grid mx-5'>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary m-2 mb-4">Add Note</button>
          </div>
        </form>
      </div>
      </>
  )
}

export default Addnote