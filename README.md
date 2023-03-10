# NoteKeeper Application 📝

Build a notekeeper application (think Google Keep).

## Technologies Used
- React
- TypeScript
- Firebase
- Firestore
- Tailwind CSS
- Vite

## Installation
1. Clone the repository

      git clone https://github.com/anjola-adeuyi/NoteKeeper-Application.git


2. Install dependencies

      npm install

3. Create a `.env` file in the root directory of your project and add your Firebase configuration information:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```


4. Start the development server

        npm run dev

5. Visit http://localhost:3000 to view the application in your browser.


## Features
**Adding a Note**
  -
To add a new note, click on the "New Note" button at the bottom of the screen. This will open a form where you can enter a title, tagline, and body for your note. Once you have entered your information, click the "Save" button to save your note.

**Editing a Note**
  -
To edit an existing note, click on the note you want to edit in the grid layout. This will open a form with the existing title, tagline, and body filled in. You can make changes to any of these fields and then click the "Save" button to update your note.

**Pinning a Note**
  -
To pin a note, click on the pin icon on the top right corner of the note. Pinned notes will always appear at the top of the grid layout, regardless of when they were created or last edited.

**Pagination**
  -
To navigate between pages, use the pagination buttons at the bottom of the screen. Each page can contain a maximum of 6 notes.

**Deployment**
  -
To deploy the application, run the following command:

      npm run build

This will create a dist directory containing all the necessary files to deploy the application. You can then deploy the application to your preferred hosting service.

**Conclusion**
  -
The NoteKeeper Application is a simple yet powerful note-taking tool that allows multiple users to add and edit notes without the need for a sign-in process. The application uses React, TypeScript, Firebase, Firestore, Tailwind CSS, and Vite to deliver a smooth user experience.