import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
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

import PinnedNote from '../Notes/PinnedNotes';
import UnPinnedNote from '../Notes/UnPinnedNotes';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Note, NoteGridProps } from '../../types';
import { db } from '../../config/firebase';
import { NOTE_KEEPER_ID, PAGE_SIZE } from '../../utils';

const NoteGrid = ({
  fetchNotes,
  page,
  isLoading,
  pageCount,
  setPage,
  pinNotesList,
  setPinNotesList,
  unPinNotesList,
  setUnPinNotesList,
  setShowModal,
  handleEdit,
}: NoteGridProps) => {
  // console.log('pageCount', pageCount, page, totalNotesCount);

  useEffect(() => {
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
          const remainingUnPinNotes = unPinNotesList.filter((Note: any) => Note._id !== id);
          setUnPinNotesList(remainingUnPinNotes);
          const remainingPinNotes = pinNotesList.filter((Note: any) => Note._id !== id);
          setPinNotesList(remainingPinNotes);
          swal('Your Note has been deleted!', {
            icon: 'success',
          });

          // Fetch Notes for UI from firebase
          fetchNotes();
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

  if (isLoading) {
    return (
      <div className="mt-40">
        <LoadingScreen />
      </div>
    );
  }

  if (!pinNotesList?.length && !unPinNotesList?.length) {
    return (
      <div className="text-center mt-40 text-base lg:text-2xl text-purple-700">
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-300 shadow rounded-lg md:rounded-2xl p-4 hover:shadow-lg"
        >
          Notes List Empty - Click on Add Note
        </button>
      </div>
    );
  }

  console.log('pinNotesList', pinNotesList);

  return (
    <div>
      {/* Pinned Note List */}
      {pinNotesList?.length ? (
        <PinnedNote
          pinNotesList={pinNotesList}
          handleEdit={handleEdit}
          handleCompletebtn={handleCompletebtn}
          handleDeletebtn={handleDeletebtn}
          page={page}
        />
      ) : (
        <></>
      )}

      {/* unpinned Note list */}
      {unPinNotesList?.length ? (
        <UnPinnedNote
          unPinNotesList={unPinNotesList}
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
