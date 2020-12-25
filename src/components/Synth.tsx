import * as React from 'react';
import {FunctionComponent, useMemo} from 'react';

import {PianoKeyboard} from './PianoKeyboard'
import MalcomTheCatSynth from '../synth';

export const Synth: FunctionComponent = () => {

  const synth = useMemo(() => new MalcomTheCatSynth, [])

  const handleNote = ({p}:{p: number}) => {
    synth.playNote(p)
  }

  return <PianoKeyboard octave={-2} numberOfKeys={60} hotKeyOffset={24} onNote={handleNote} />
}
