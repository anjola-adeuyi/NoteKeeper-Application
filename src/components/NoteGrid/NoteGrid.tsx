import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, startAfter, updateDoc, where } from 'firebase/firestore';
import swal from 'sweetalert';

import PinnedNote from '../Note/PinnedNote';
import UnPinnedNote from '../Note/UnPinnedNote';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Note, NoteGridProps } from '../../types';
import { db } from '../../config/firebase';
import { NOTE_KEEPER_ID, PAGE_SIZE } from '../../utils';

const NoteGrid = ({
  pinNoteList,
  setPinNoteList,
  unPinNoteList,
  setUnPinNoteList,
  handleEdit
}: NoteGridProps) => {
  const [pageCount, setPageCount] = useState(0);
  const [totalNotesCount, setTotalNotesCount] = useState(0);
  const [page, setPage] = useState(1);

  console.log('pageCount', pageCount, page, totalNotesCount);

  useEffect(() => {
    async function fetchNotes() {
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
      await Promise.all(updatePromises);

      // Query for current page of notes
      const q = query(
        notesRef,
        where('page', '==', page),
        // orderBy('position'),
        // startAfter((page) * PAGE_SIZE),
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
        setPinNoteList(pinned);
        setUnPinNoteList(unpinned);

        console.log('pinned', pinned);
        console.log('unpinned', unpinned);
        console.log('totalNotes', totalNotes);
      });
      return unsubscribe;
    }

    fetchNotes();
  }, [page]);

  //complete button event
  const handleCompletebtn = async (id: any) => {
    const noteRef = doc(db, 'notekeeper', NOTE_KEEPER_ID, 'notes', id);
    const Note = document.getElementById(id) as HTMLElement;
    Note.classList.add('complete-text');

    console.log('completing..', id);

    try {
      await updateDoc(noteRef, { complete: true });
      console.log('Note complete!');
      swal('Note complete!', 'Your Note is complete successfully', 'success');
    } catch (e) {
      console.error('Error completing Note: ', e);
      swal('Note complete Error!', 'An error occured during the complete operation', 'error');
    }
  };

  //delete button event
  const handleDeletebtn = async (id: string) => {
    console.log('Note._id', id);
    const noteRef = doc(db, 'notekeeper', NOTE_KEEPER_ID, 'notes', id);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Note details!',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteDoc(noteRef);
          console.log('Document deleted with ID: ', id);
          const remainingNotes = unPinNoteList.filter((Note: any) => Note._id !== id);
          setUnPinNoteList(remainingNotes);
          swal('Your Note has been deleted!', {
            icon: 'success',
          });
        } catch (e) {
          console.error('Error deleting document: ', e);
          swal('Error deleting Note!', {
            icon: 'error',
          });
        }
      } else {
        swal('Your Note is safe!');
      }
    });
  };

  if (!pinNoteList?.length && !unPinNoteList?.length) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {/* Pinned Note List */}
      {pinNoteList?.length ? (
        <PinnedNote
          pinNoteList={pinNoteList}
          handleEdit={handleEdit}
          handleCompletebtn={handleCompletebtn}
          handleDeletebtn={handleDeletebtn}
          page={page}
        />
      ) : (
        <></>
      )}

      {/* unpinned Note list */}
      {unPinNoteList?.length ? (
        <UnPinnedNote
          unPinNoteList={unPinNoteList}
          handleEdit={handleEdit}
          handleCompletebtn={handleCompletebtn}
          handleDeletebtn={handleDeletebtn}
          page={page}
        />
      ) : (
        <></>
      )}

      {/* pagination */}
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number + 1 === page ? 'selected' : ''}
            key={number}
            onClick={() => {
              setPage(number + 1);
            }}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteGrid;
