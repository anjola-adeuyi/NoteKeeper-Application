import addImg from '../../assets/add.png';
import { HeroProps } from '../../types';

const Hero = ({ setShowModal }: HeroProps) => {
  return (
    <div className="sticky top-0 bg-white shadow mb-4 rounded-xl p-2 flex justify-between">
      <h1 className="text-base md:text-3xl h-full font-semibold p-3 my-auto">
        "Taking Notes Has Never Been So Fun: Say Goodbye to Boring Journals"
      </h1>
      {/* Note add button */}
      <button
        className="hover:bg-purple-100 text-purple-600 rounded-full font-bold uppercase text-sm px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <img
          style={{ width: 100 }}
          src={addImg}
          alt="+"
        />
        Add Note
      </button>
    </div>
  );
};

export default Hero;
