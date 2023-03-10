import { Route, Routes } from 'react-router-dom';

import Header from '../components/Header/Header';
import NoteBoard from '../components/NoteBoard/NoteBoard';
import NotFound from '../components/NotFound/NotFound';

import '../App.css';

function Home() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={<NoteBoard />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default Home;
