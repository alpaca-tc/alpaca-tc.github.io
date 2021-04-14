import { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useState, useCallback } from "react"

let audio: HTMLAudioElement;

const play = (path: string): void => {
  audio = audio || new Audio(path);
  audio.currentTime = 0
  audio.play()
}

const pause = (msec: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      audio.pause()
      resolve()
    }, msec)
  })
}

const Alert: FunctionComponent = () => {
  const [alertState, setAlertState] = useState(false)

  console.log(alertState)

  const onClickAlert = useCallback(() => {
    setAlertState(true)

    play('/music/alert.mp3')

    pause(5500).then(() => {
      setAlertState(false)
    })
  }, [alertState, setAlertState])

  const alertBackground = (
    <div className='w-screen h-screen bg-red-400 fixed t-0 l-0' style={{animation: 'flash 1s linear infinite'}}>
      <style>
        {`
          @keyframes flash {
            0%,100% {
              opacity: 1;
            }

            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );

  return (
    <div className="w-screen h-screen flex flex-column content-center items-center">
      <div className="w-auto m-auto">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-gray-400 hover:text-black transition duration-300"
          size="9x"
          onClick={onClickAlert}
        />
      </div>
      {alertState ? alertBackground : null}
    </div>
  )
}

export default Alert;
