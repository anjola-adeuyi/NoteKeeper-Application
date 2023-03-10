import { Link } from 'react-router-dom';

import errorImg from '../../assets/errorImg.png';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center">
      <img
        style={{ maxWidth: '600px', maxHeight: '50vh' }}
        className="mx-auto"
        src={errorImg}
        alt="404_Error_Img"
      />
      <div className="grid grid-cols-2">
        <div className="py-5">
          <h1 className="text-purple-600 text-3xl font-bold text-right px-2 py-5 border-r-2 border-gray-00 ">404</h1>
        </div>
        <div className="text-left px-2 py-10">
          <h1 className="text-purple-600 font-semibold text-3xl">Page not found</h1>
          <p className="text-gray-500 text-sm">Please check the URL in the address bar and try again.</p>
        </div>
      </div>
      <br />
      <button className="rounded-lg bg-purple-600 p-2 text-white w-80">
        <Link
          to="/"
          className="text-white"
        >
          Go Back Notes
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
