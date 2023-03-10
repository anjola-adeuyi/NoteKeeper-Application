import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { NoteType } from '../types';

export const PAGE_SIZE = 6;
export const NOTE_KEEPER_ID = 'T7nW6epL4IZNOQzGwodQ';

export const INITIAL_NOTE_OBJ: NoteType[] = [
  {
    _id: '640a08eb4cd9fd9790f979f5',
    complete: false,
    date: '9/3/2023',
    description: 'My desc react',
    pin: true,
    tag: 'react',
    time: '17:29:41',
    title: 'Jola',
    position: 1,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date('March 10, 2023 08:47:49')),
  },
];

// export const INITIAL_NOTE = {
//   title: '',
//   content: '',
//   bgColor: '#fff',
//   isChecked: false,
//   isPinned: false,
//   isArchived: false,
//   labels: [],
// };

export const getNotesWithDate = (Note: NoteType) => {
  let createdAtDate = Note.createdAt?.toDate();

  // extract the date and time values
  const date = `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  const time = `${createdAtDate.getHours()}:${createdAtDate.getMinutes()}:${createdAtDate.getSeconds()}`;

  console.log('Unpinnned Browser', { date, time });

  return { date, time };
};
