import { useRef, useState } from 'react';
import { addDoc, collection, doc } from 'firebase/firestore';
import swal from 'sweetalert';

import AddNote from '../NoteModal/AddNote/AddNote';
import EditNote from '../NoteModal/EditNote/EditNote';
import NoteGrid from '../NoteGrid/NoteGrid';
import { db } from '../../config/firebase';
import { NOTE_KEEPER_ID, INITIAL_NOTE_OBJ } from '../../utils';
import Hero from '../Hero/Hero';

const NoteBoard = () => {
  const [pinNoteList, setPinNoteList] = useState(INITIAL_NOTE_OBJ); //store pinned Note
  const [unPinNoteList, setUnPinNoteList] = useState(INITIAL_NOTE_OBJ); //store unpinned Note
  const [showModal, setShowModal] = useState(false); //open up the input modal
  const [showEditModal, setShowEditModal] = useState(false); //open up edit modal

  //initial input data
  const titleRef = useRef<HTMLInputElement>(null);
  const taglineRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  //current select Note data
  const [updateId, setUpdateId] = useState([]);
  const [currentTag, setCurrentTag] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const [currentDesc, setCurrentDesc] = useState([]);

  //capture date and time
  const today = new Date();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

  console.log('time', { today, time, date });

  // New Note add button
  const handleAddNote = (e: any) => {
    const title = titleRef.current?.value;
    const tag = taglineRef.current?.value;
    const description = descRef.current?.value;

    const newNote = {
      title,
      tag,
      description,
      time,
      date,
      complete: false,
      pin: false,
      position: 1,
    };

    const notekeeperRef = doc(db, 'notekeeper', NOTE_KEEPER_ID);
    const notesRef = collection(notekeeperRef, 'notes');

    addDoc(notesRef, newNote)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        swal('New Note Added!', 'Your Note is added successfully', 'success');
        e.target.reset();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        swal('Note Adding Error!', 'An error occured during the adding operation', 'error');
      });

    setShowModal(false);
    e.preventDefault();
  };

  const handleEdit = (id: any, tag: any, title: any, desc: any) => {
    setUpdateId(id);
    setCurrentTag(tag);
    setCurrentTitle(title);
    setCurrentDesc(desc);
    setShowEditModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Hero setShowModal={setShowModal} />
      <div>
        {/* input modal */}
        {showModal ? (
          <>
            <AddNote
              handleAddNote={handleAddNote}
              titleRef={titleRef}
              descRef={descRef}
              taglineRef={taglineRef}
              setShowModal={setShowModal}
            />
          </>
        ) : null}
        {/* update modal */}
        {showEditModal ? (
          <>
            <EditNote
              id={updateId}
              time={time}
              date={date}
              currentTitle={currentTitle}
              currentTag={currentTag}
              currentDesc={currentDesc}
              setShowEditModal={setShowEditModal}
            />
          </>
        ) : null}

        {/* Note Grid section */}

        <NoteGrid
          pinNoteList={pinNoteList}
          unPinNoteList={unPinNoteList}
          setPinNoteList={setPinNoteList}
          setUnPinNoteList={setUnPinNoteList}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default NoteBoard;
