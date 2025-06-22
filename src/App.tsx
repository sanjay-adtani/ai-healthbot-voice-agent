import './App.css'
import AiCall from './components/AiCall'
import { useState } from 'react';

import Doc from "../public/doc1.png";
import Doc2 from "../public/doctor2.png";
import Doc3 from "../public/doctor3.png";
import Doc4 from "../public/doctor4.png";
import Doc5 from "../public/doctor5.png";
import Doc6 from "../public/doctor6.png";
import Doc7 from "../public/doctor7.png";
import Doc8 from "../public/doctor8.png";

function App() {
  const [screen, setScreen] = useState('doctors');
  return (
    <>
      {
        screen=='doctors' &&
        <>
          <p className='text-2xl sm:text-4xl font-medium text-gray-800 mt-5 text-center font-mono'>
            🤖 AI Doctor Bots
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 sm:p-10 sm:mt-[-15px]">
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                General Physician
              </p>
              <button type="button" onClick={()=>setScreen('consult')} className={`bg-gray-800 cursor-pointer hover:bg-gray-950 text-white py-2 rounded w-full sm:mt-1`}>
                  Consult Now
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc2} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Cardiologist
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc3} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Dermatologist 
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc4} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Neurologist 
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc5} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Orthopedic 
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc6} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Pediatrician 
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc7} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Gynecologist 
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <img src={Doc8} className='rounded w-100 h-36 sm:h-52 object-cover object-top' />
              <p className='text-sm sm:text-2xl font-medium text-gray-800 my-1 text-center font-mono'>
                Psychiatrist 
              </p>
              <button type="button" disabled={true} className={`bg-gray-500 cursor-no-drop text-white py-2 rounded w-full sm:mt-1`}>
                  Not Available
              </button>
            </div>
            
          </div>
        </>
      }
      {
        screen=='consult' && <AiCall />
      }
    </>
  )
}

export default App
