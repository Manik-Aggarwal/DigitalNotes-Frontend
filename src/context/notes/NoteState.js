import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://digital-notes-backend.herokuapp.com/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get notes from server
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
      break;
    }
    getNotes(notes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );

  // const s1 = {
  //     "name": "manik",
  //     "class": "class1",
  // }
  // const [state, setState] = useState(s1);
  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "kiira",
  //             "class": "2",
  //         })
  //     }, 1000);
  // }

  // return (
  //     <NoteContext.Provider value={{state,update}}>
  //         {props.children}
  //     </NoteContext.Provider>
  // )
};

export default NoteState;
