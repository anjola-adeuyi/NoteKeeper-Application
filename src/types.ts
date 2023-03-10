import { LegacyRef } from "react";

export interface AddNoteProps {
  handleAddTask: any;
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
  pinTaskList: any;
  setPinTaskList: any;
  unPinTaskList: any;
  setUnPinTaskList: any;
  handleEdit: any;
}

export interface PinnedNoteProps {
  pinTaskList: any;
  handleEdit: any;
  handleCompletebtn: any;
  handleDeletebtn: any;
  page: any;
}

export interface UnPinnedNoteProps {
  unPinTaskList: any;
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
}