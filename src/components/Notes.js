import {React, useContext, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = (props) => {
  let navigate = useNavigate();
    const context = useContext(noteContext);
    const {notes,getNotes,editNote} = context;
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{navigate('/login');}
      // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully","success");
  }
  const onchange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
      <>
        <Addnote showAlert={props.showAlert}/>

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content login-container">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.etitle} name='etitle' id="etitle" onChange={onchange} aria-describedby="emailHelp" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={note.edescription} onChange={onchange} className="form-control" name='edescription' id="edescription" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.etag} onChange={onchange} className="form-control" name='etag' id="etag" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-warning">Update Note</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
            <h1>Your Note</h1>

            <div className="container m-2">
              {notes.length===0 && "No notes yet"}
            </div>
              
            {notes.map((note) => {
              return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
            })}
        </div>
      </>
  )
}

export default Notes