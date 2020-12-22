import * as React from 'react';
import {FunctionComponent} from 'react';

import './PianoKeyboard.sass';

const keyNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const defaultHotKeys = ['a','w','s','e','d','f','t','g','y','h','u','j','k','o','l', 'p', ';'];

export const PianoKeyboard: FunctionComponent<{
  numberOfKeys?: number;
  octave?: number;
  hotKeys?: string[];
  onNote?: (e:{
    pitchNumber: number;
    p: number;
    pitchName: string;
  }) => void
}> = ({numberOfKeys=92, octave=1, hotKeys=defaultHotKeys, onNote}) => {

  const whiteNotes = []
  const blackNotes = []
  for(let i=0; i < numberOfKeys; ++i) {
    const keyName = keyNames[i % 12]
    const black = /[b#]$/.test(keyName)
    const hotKey = hotKeys[i] || null
    const pitch = octave * 12 + i
    const handlePress = () => {
      if(onNote)
        onNote({
          p: pitch,
          pitchNumber: pitch,
          pitchName: keyName,
        })
    }

    const btn = <button onMouseDown={handlePress} key={i} className={keyName}>{hotKey || ' '}</button>
    if(black)
      blackNotes.push(btn)
    else
      whiteNotes.push(btn)
  }

  return <div className='PianoKeyboard'>
    <div className='black-keys'>
      {blackNotes}
    </div>

    <div className='white-keys'>
      {whiteNotes}
    </div>
  </div>
}
