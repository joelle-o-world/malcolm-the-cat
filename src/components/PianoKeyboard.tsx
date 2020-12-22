import * as React from 'react';
import {FunctionComponent} from 'react';

import './PianoKeyboard.sass';

const keyNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export const PianoKeyboard: FunctionComponent<{
  numberOfKeys?: number;
  octave?: number;
}> = ({numberOfKeys=20, octave=4}) => {

  let whiteNotes = []
  let blackNotes = []
  for(let i=0; i < numberOfKeys; ++i) {
    let keyName = keyNames[i % 12]
    if(/b$/.test(keyName))
      // black
      blackNotes.push(
        <button className={keyName} />
      )
    else
      // white
      whiteNotes.push(
        <button className={keyName} />
      )
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
