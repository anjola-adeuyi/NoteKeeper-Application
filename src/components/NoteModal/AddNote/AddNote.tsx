import { AddNoteProps } from '../../../types';

const AddNote = ({ handleAddNote, titleRef, taglineRef, descRef, setShowModal }: AddNoteProps) => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-4xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <form onSubmit={handleAddNote}>
              {/*header*/}
              <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                <label
                  htmlFor="Note-title"
                  className="form-label text-2xl font-semibold mb-2 text-gray-700"
                >
                  Note Title{' '}
                </label>
                <input
                  id="Note-title"
                  required
                  type="text"
                  ref={titleRef}
                  placeholder="Add a Note title"
                  className="text-2xl font-semibold px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              {/* Note tagline section*/}
              <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                <label
                  htmlFor="Note-title"
                  className="form-label text-2xl font-semibold mb-2 text-gray-700"
                >
                  Note Tagline{' '}
                </label>
                <input
                  id="Note-tagline"
                  required
                  type="text"
                  ref={taglineRef}
                  placeholder="React_JS"
                  className="text-xl font-semibold px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full"
                />
              </div>
              {/*Note description section*/}
              <div className="relative p-6 flex-auto">
                <label
                  htmlFor="Note-description"
                  className="form-label text-lg font-semibold mb-2 text-gray-700"
                >
                  Note Description{' '}
                </label>

                <textarea
                  required
                  ref={descRef}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none "
                  id="Note-description"
                  rows={4}
                  placeholder="Write your Note details here"
                ></textarea>
              </div>

              {/*Modal button section*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="hover:border hover:border-red-500 hover:rounded hover:shadow text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Save Note
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

export default AddNote;
