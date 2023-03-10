import swal from 'sweetalert';
import { doc, updateDoc } from 'firebase/firestore';

import pin from '../../assets/pin.png';
import trash from '../../assets/trashbin.png';
import complete from '../../assets/complete.png';
import { NoteType, PinnedNotesProps } from '../../types';
import { db } from '../../config/firebase';
import { getNotesWithDate, NOTE_KEEPER_ID } from '../../utils';

const PinnedNotes = ({ pinNotesList, handleEdit, handleCompletebtn, handleDeletebtn, page }: PinnedNotesProps) => {
  //unpin button event
  const handleUnPin = async (id: string) => {
    console.log('unpinned', id);
    const noteRef = doc(db, 'notekeeper', NOTE_KEEPER_ID, 'notes', id);
    try {
      await updateDoc(noteRef, { pin: false });
      console.log('Note unpinned!');
      swal('Note Unpinned!', 'Your Note is unpinned successfully', 'success');
    } catch (e) {
      console.error('Error unpinning Note: ', e);
      swal('Note Unpinned Error!', 'An error occurred during the unpin operation', 'error');
    }
  };

  const numberOfPinnedNotes = pinNotesList.length;

  return (
    <div
      aria-label="group of cards"
      tabIndex={0}
      className="container mx-auto focus:outline-none py-8 w-full"
    >
      <h1
        style={{ marginBottom: -15 }}
        className="text-center text-xl lg:text-2xl text-purple-700"
      >
        <span className="bg-yellow-300 shadow rounded-2xl p-4">
          {numberOfPinnedNotes} Pinned Note{numberOfPinnedNotes > 1 ? 's' : ''} on page {page}
        </span>
      </h1>
      <div className="bg-yellow-100 rounded-2xl pt-10 pb-4 px-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-stretch items-center mx-auto">
        {pinNotesList &&
          pinNotesList?.map((Note: NoteType) => {
            const { date, time } = getNotesWithDate(Note);

            console.log('pin date', { date, time, pinNotesList });
            return (
              <div
                key={Note._id}
                style={{ borderTopRightRadius: 24 }}
                className="bg-white max-w-xs rounded-md overflow-hidden shadow-lg my-2 mx-auto "
              >
                <div
                  id={Note._id}
                  className=""
                >
                  <div className="py-4 bg-purple-100 px-6 flex items-start justify-between w-full">
                    {/* title section */}
                    <div className="w-10/12 pl-2">
                      <p className="focus:outline-none font-semibold leading-normal text-xl text-gray-800">
                        {Note.title}
                      </p>
                    </div>
                    {/* pin button */}
                    <button
                      onClick={() => {
                        handleUnPin(Note._id);
                      }}
                      style={{ marginTop: -15, marginRight: -24 }}
                      className="ml-2 p-1 bg-white hover:bg-purple-300 text-gray-800 font-semibold shadow"
                    >
                      <img
                        className="focus:outline-none"
                        style={{ width: 40, height: 40 }}
                        src={pin}
                        alt="pin"
                      />
                    </button>
                  </div>

                  <div
                    onClick={() => {
                      handleEdit(Note._id, Note.tag, Note.title, Note.description);
                    }}
                    style={{ minHeight: 200 }}
                    className="hover:shadow-lg hover:bg-indigo-200 px-6 py-3  outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    {/* tagline section */}
                    {Note.tag ? (
                      <div className="focus:outline-none flex">
                        <div className="py-2 mb-2 px-4 text-md leading-3 text-indigo-700 rounded-full bg-indigo-100">
                          {Note.tag}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    <p className="text-grey-darker text-base text-justify">{Note.description}</p>
                  </div>
                </div>
                <hr />

                {/* bottom button section   */}
                <div className="bg-gray-100 px-6 py-1 text-right">
                  <p className="focus:outline-none text-sm leading-normal pt-2 text-gray-500">
                    Last updated in: {date} at <span className="text-black font-normal">{time}</span>
                  </p>

                  <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
                    <button
                      className="rounded-full"
                      onClick={() => {
                        handleCompletebtn(Note._id);
                      }}
                    >
                      <img
                        style={{ height: '40px' }}
                        src={complete}
                        alt="Complete"
                      />
                    </button>
                  </span>
                  <span className="rounded-full inline-block bg-grey-lighter py-1 text-sm font-semibold text-grey-darker mr-2">
                    <button
                      className="rounded-full"
                      onClick={() => {
                        console.log('handleDeletebtn', Note._id);
                        handleDeletebtn(Note._id);
                      }}
                    >
                      <img
                        style={{ height: '40px' }}
                        src={trash}
                        alt="Delete"
                      />
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PinnedNotes;
