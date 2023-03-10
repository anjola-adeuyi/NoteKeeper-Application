import { useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import swal from 'sweetalert';

import { db } from '../../../config/firebase';
import { EditNoteProps } from '../../../types';
import { NOTE_KEEPER_ID } from '../../../utils';

const EditNote = ({ id, setShowEditModal, currentTag, currentTitle, currentDesc, time, date }: EditNoteProps) => {
  //update input data
  const updateTitleRef = useRef<HTMLInputElement>(null);
  const updatetaglineRef = useRef<HTMLInputElement>(null);
  const updatedescRef = useRef<HTMLTextAreaElement>(null);

  //update task
  const handleUpdateTask = async (e: any) => {
    const title = updateTitleRef.current?.value;
    const tag = updatetaglineRef.current?.value;
    const description = updatedescRef.current?.value;
    const updateData = { title, tag, description, time, date };

    const noteRef = doc(db, 'notekeeper', NOTE_KEEPER_ID, 'notes', id);
    try {
      await updateDoc(noteRef, updateData);
      console.log('Task Updated!');
      swal('Task Updated!', 'Your Task is updated successfully', 'success');
      e.target.reset();
    } catch (e) {
      console.error('Error updating task: ', e);
      swal('Task Update Error!', 'An error occurred during the update operation', 'error');
    }

    setShowEditModal(false);
    e.preventDefault();
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <form onSubmit={handleUpdateTask}>
              {/*header*/}
              <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                <label
                  htmlFor="task-title"
                  className="form-label text-2xl font-semibold mb-2 text-gray-700"
                >
                  Task Title{' '}
                </label>
                <input
                  id="task-title"
                  ref={updateTitleRef}
                  defaultValue={currentTitle}
                  type="text"
                  placeholder="Add your task title"
                  className="text-2xl font-semibold px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              {/* Task tagline section*/}
              <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                <label
                  htmlFor="task-title"
                  className="form-label text-2xl font-semibold mb-2 text-gray-700"
                >
                  Task Tagline
                </label>
                <input
                  id="task-tagline"
                  type="text"
                  ref={updatetaglineRef}
                  defaultValue={currentTag}
                  placeholder="React_JS"
                  className="text-xl font-semibold px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              {/*Task description section*/}
              <div className="relative p-6 flex-auto">
                <label
                  htmlFor="task-description"
                  className="form-label text-lg font-semibold mb-2 text-gray-700"
                >
                  Task Description{' '}
                </label>

                <textarea
                  ref={updatedescRef}
                  defaultValue={currentDesc}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none "
                  id="task-description"
                  rows={4}
                  placeholder="Write your task details here"
                ></textarea>
              </div>
              {/*Modal button section*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="hover:border hover:border-red-500 hover:rounded hover:shadow text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Save Edited Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default EditNote;
