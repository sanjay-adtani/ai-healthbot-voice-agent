import Vapi from '@vapi-ai/web';
import Doc from "../../public/doc1.png";
import { useState } from 'react';

// don't forget to setup your env
const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

interface Transcript {
  role: string;
  msg: string;
}

function AiCall() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [timerId, setTimerId] = useState<number>(0);
  const [liveTranscript, setLiveTranscript] = useState<Transcript | null>(null);

  const min = Math.floor(timer / 60);
  const secs = timer % 60;

  function startCall() {
    setIsLoading(true);
    setTimer(0);
    setLiveTranscript(null);
    setTranscript([]);

    const vapi = new Vapi(VAPI_API_KEY);
    setVapiInstance(vapi);

    // Start voice conversation
    vapi.start(VAPI_ASSISTANT_ID);
    // Listen for events

    vapi.on('call-start', () => {
      // console.log('Call started')
      setIsCallStarted(true);
    });
    vapi.on('call-end', () => {
      // console.log('Call ended')
      setIsCallStarted(false);
    });
    vapi.on('speech-start', () => {
      setIsLoading(true);
    });
    vapi.on('speech-end', () => {
      //
    });

    vapi.on('message', (message) => {
        if (message.type === 'transcript') {
          // console.log(`${message.transcriptType}: ${message.role}: ${message.transcript}`);
          // console.log('liveTranscript', liveTranscript);

          if (message.transcriptType === 'final') {
            setLiveTranscript(null);
            setTranscript(prev => [
              ...prev,
              {
                msg: message.transcript,
                role: message.role
              }
            ]);
          } else {
            setLiveTranscript({
              msg: message?.transcript,
              role: message?.role
            });
          }
        }
      });
    

    const timerID = setInterval(function(){
        setTimer(prev => prev+1);
    }, 1000);
    setTimerId(timerID);
  }

  function stopCall() { 
    if (vapiInstance) {
      vapiInstance.stop();
      setIsCallStarted(false);
      setVapiInstance(null);
      clearInterval(timerId);
      setIsLoading(false);
    }
  }


  return (
    <div className='py-2 px-5 sm:py-4 sm:px-20'>
      <div className='bg-gray-200 py-8 px-5 sm:py-10 sm:px-10 flex flex-col rounded-2xl h-[100vh]'>
        <div className='flex justify-between mb-10 sm:mb-0'>
          <div className='border-1 border-gray-400 py-1 px-6 rounded-full flex items-center gap-2'>
            {!isCallStarted && 
              <>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                Not Connected
              </>
            }
            {isCallStarted && 
              <>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Connected...
              </>
            }
          </div>
          <div className='border-1 border-gray-400 py-1 px-6 rounded-full'>
            {min < 10 && '0'}{min}:{secs < 10 && '0'}{secs}
          </div>
        </div>

        <div className='flex justify-center items-center flex-col mb-4 sm:mb-8'>
          <img src={Doc} width={"120px"} className="rounded-full h-30 object-cover object-top" />
          <p className='text-2xl font-medium text-gray-800 my-1'>
            General Physician
          </p>
          <p className='text-gray-500 font-mono text-center'>
            AI Medical Voice Agent <br/>
            <small>Created by: Sanjay Adtani</small>
          </p>
        </div>

        {
          transcript.length > 0 &&
            <div className="text-left flex flex-col-reverse sm:px-28 mb-2 overflow-y-auto min-h-28">
                <div className="mb-1">
                    {
                      transcript.map((item, index) => (
                        <span key={index} className='mb-1'>
                          <p className="text-gray-500 capitalize">{item.role}:</p>
                          <p>{item.msg}</p>
                        </span>
                      ))
                    }
                </div>
            </div>
        }
        {
          liveTranscript?.role && liveTranscript?.msg && 
          <p className='text-sm sm:px-28'><span className="text-gray-500 capitalize">{liveTranscript?.role} Saying:</span> {liveTranscript?.msg}</p>
        }

        <div className="fixed bottom-0 w-full mb-5 flex justify-center ml-[-10%]">
          {!isCallStarted && 
            <button onClick={startCall} disabled={isLoading} type="button" className={`${isLoading ? 'bg-gray-500' : 'bg-gray-800 cursor-pointer hover:bg-gray-950'} text-white px-10 py-2 rounded-full`}>
                {
                  isLoading ? 'Ringing, Please Wait...' : 'Start Call'
                }
            </button>
          }
          {isCallStarted && 
            <button onClick={stopCall} type="button" className="bg-red-700 text-white px-10 py-2 rounded-full cursor-pointer hover:bg-red-800">
                End Call
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default AiCall