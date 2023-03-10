import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { LegacyRef } from 'react';

export interface AddNoteProps {
  handleAddNote: any;
  titleRef: LegacyRef<HTMLInputElement> | undefined;
  taglineRef: LegacyRef<HTMLInputElement> | undefined;
  descRef: LegacyRef<HTMLTextAreaElement> | undefined;
  setShowModal: any;
}

export interface EditNoteProps {
  id: any;
  setShowEditModal: any;
  currentTag: any;
  currentTitle: any;
  currentDesc: any;
  time: any;
  date: any;
}

export interface NoteGridProps {
  pinNotesList: any;
  setPinNotesList: any;
  unPinNotesList: any;
  setunPinNotesList: any;
  handleEdit: any;
}

export interface PinnedNotesProps {
  pinNotesList: any;
  handleEdit: any;
  handleCompletebtn: any;
  handleDeletebtn: any;
  page: any;
}

export interface UnPinnedNotesProps {
  unPinNotesList: any;
  handleEdit: any;
  handleCompletebtn: any;
  handleDeletebtn: any;
  page: any;
}

export interface HeroProps {
  setShowModal: any;
}

export type NoteType = {
  _id: string;
  complete: boolean;
  date: string;
  description: string;
  pin: boolean;
  tag: string;
  time: string;
  title: string;
  position: number;
  createdAt: firebase.firestore.Timestamp;
  page?: number
};

export interface Note {
  _id: string;
  complete: boolean;
  date: string;
  description: string;
  pin: boolean;
  tag: string;
  time: string;
  title: string;
  createdAt: firebase.firestore.Timestamp;
  page?: number;
}
