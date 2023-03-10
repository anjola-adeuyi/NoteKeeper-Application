import { useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import swal from 'sweetalert';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import AddNote from '../NoteModal/AddNote/AddNote';
import EditNote from '../NoteModal/EditNote/EditNote';
import NoteGrid from '../NoteGrid/NoteGrid';
import { db } from '../../config/firebase';
import { NOTE_KEEPER_ID, INITIAL_NOTE_OBJ, PAGE_SIZE } from '../../utils';
import Hero from '../Hero/Hero';
import { Note } from '../../types';

const NoteBoard = () => {
  const [pinNotesList, setPinNotesList] = useState<Note[]>([]); //store pinned Note
  const [unPinNotesList, setUnPinNotesList] = useState<Note[]>([]); //store unpinned Note
  const [showModal, setShowModal] = useState(false); //open up the input modal
  const [showEditModal, setShowEditModal] = useState(false); //open up edit modal

  const [pageCount, setPageCount] = useState(0);
  const [totalNotesCount, setTotalNotesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  // Logic to fetch Notes from firebase
  async function fetchNotes() {
    setIsLoading(true);
    const notekeeperRef = doc(db, 'notekeeper', NOTE_KEEPER_ID);
    const notesRef = collection(notekeeperRef, 'notes');

    // Get total number of notes
    const totalNotesQuery = await getDocs(notesRef);
    const totalNotes = totalNotesQuery.size;

    // Update page numbers for each note
    const updatePromises = totalNotesQuery.docs.map((doc, index) => {
      const page = Math.ceil((index + 1) / PAGE_SIZE);
      const updateData: any = {
        ...doc.data(),
        page: page,
      };
      console.log('updateData', updateData, index);
      return updateDoc(doc.ref, updateData);
    });
    await Promise.allSettled(updatePromises);

    // Query for current page of notes
    const q = query(
      notesRef,
      where('page', '==', page),
      orderBy('createdAt', 'desc'),
      // startAfter((page - 1) * PAGE_SIZE),
      limit(PAGE_SIZE)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pinned: Note[] = [];
      const unpinned: Note[] = [];

      const notes = snapshot.docs.map((doc) => {
        const note = {
          _id: doc.id,
          ...doc.data(),
        } as Note;
        if (note.pin) {
          pinned.push(note);
        } else {
          unpinned.push(note);
        }
        return note;
      });
      console.log('notes', notes);

      // Update page count based on number of notes
      const totalPages = Math.ceil(totalNotes / PAGE_SIZE);
      setTotalNotesCount(totalNotes);
      setPageCount(totalPages);
      setPinNotesList(pinned);
      setUnPinNotesList(unpinned);

      setIsLoading(false);

      console.log('pinned', pinned);
      console.log('unpinned', unpinned);
      console.log('totalNotes', totalNotes);
    });
    return unsubscribe;
  }

  // New Note add button
  const handleAddNote = async (e: any) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const tag = taglineRef.current?.value;
    const description = descRef.current?.value;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
    const createdAtOld = firebase.firestore.Timestamp.fromDate(new Date(formattedDate));

    const createdAt = firebase.firestore.Timestamp.now();

    console.log({ createdAtOld, createdAt });

    const newNote = {
      title,
      tag,
      description,
      complete: false,
      pin: false,
      position: 1,
      createdAt,
    };

    console.log('Adding Note', newNote);

    const notekeeperRef = doc(db, 'notekeeper', NOTE_KEEPER_ID);
    const notesRef = collection(notekeeperRef, 'notes');

    addDoc(notesRef, newNote)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        swal('New Note Added!', 'Your Note is added successfully', 'success');
        e.target.reset();

        // Fetch Notes for UI from firebase
        fetchNotes();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        swal('Note Adding Error!', 'An error occured during the adding operation', 'error');
      });

    setShowModal(false);
  };

  const handleEdit = async (id: any, tag: any, title: any, desc: any) => {
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
          pinNotesList={pinNotesList}
          unPinNotesList={unPinNotesList}
          setPinNotesList={setPinNotesList}
          setUnPinNotesList={setUnPinNotesList}
          handleEdit={handleEdit}
          setShowModal={setShowModal}
          fetchNotes={fetchNotes}
          page={page}
          isLoading={isLoading}
          pageCount={pageCount}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default NoteBoard;
