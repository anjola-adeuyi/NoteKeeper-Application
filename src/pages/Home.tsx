import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import NoteGrid from '../components/NoteGrid/NoteGrid';
import NotFound from '../components/NotFound/NotFound';
import '../App.css';

function Home() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={<NoteGrid />}
        />
        <Route
          path="/notes"
          element={<NoteGrid />}
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
