import loadSamples from './samples'

type Syllable = 'mal'|'colm'|'the'|'cat'

const ctx = new AudioContext

const semitoneRatio = (p: number) => Math.pow(2, p/12)

export default class MalcomTheCatSynth {
  samples?: {[key: string]: AudioBuffer[]}
  lastSyllable?: Syllable
  lastPitch?: number;

  constructor() {
    loadSamples().then(samples => {
      this.samples = samples
    })
  }

  playNote(pitch: number) {
    let syllable = this.nextSyllable(pitch)
    let sample = this.chooseSample(syllable)
    this.playSample(sample, pitch)

    this.lastSyllable = syllable
    this.lastPitch = pitch
  }

  nextSyllable(nextPitch: number): Syllable {
    const lastPitch = this.lastPitch
    if(lastPitch === undefined)
      return 'mal';
    switch(this.lastSyllable) {
      case 'mal':
        return 'colm';

      case 'colm':
        if(lastPitch >= nextPitch)
          return 'the';
        else 
          return 'mal'

      case 'the':
        if(lastPitch >= nextPitch)
          return 'cat';
        else
          return 'mal'

      case 'cat':
        if(lastPitch === nextPitch)
          return 'cat'
        else
          return 'mal';

      default:
        return 'mal';
    }
  }

  chooseSample(syllable: Syllable) {
    if(this.samples) {
      let samples = this.samples[syllable]
      if(samples)
        return samples[Math.floor(Math.random() * samples.length)]
      else
        throw `No samples for syllable: "${syllable}"`;
    } else
      throw "Samples not loaded yet"
  }

  playSample(sample:AudioBuffer, pitch: number) {
    const source = ctx.createBufferSource()
    source.buffer = sample
    source.connect(ctx.destination)

    const speed = semitoneRatio(pitch + 6)
    source.playbackRate.value = speed
    source.start()
  }
}
