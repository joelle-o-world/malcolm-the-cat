import Mal1 from './audio-files/mal.mp3'
import Colm1 from './audio-files/colm.mp3';
import The1 from './audio-files/the.mp3';
import Cat1 from './audio-files/cat.mp3';

let urlsByWord:{[word:string]: string[]} = {
  mal: [ Mal1 ],
  colm: [ Colm1 ],
  the: [ The1 ],
  cat: [ Cat1 ],
}

function loadArrayBuffer(url: string):Promise<ArrayBuffer> {
  return new Promise((fulfil, reject) => {
    const xhttp = new XMLHttpRequest;
    xhttp.open('get', url);

    xhttp.responseType = 'arraybuffer'
    xhttp.onreadystatechange = () => {
      if(xhttp.readyState === 4 && xhttp.status === 200) {
        fulfil(xhttp.response)
      }
    }
    xhttp.onerror = (err) => reject(err)

    xhttp.send()
  })
}

const ctx = new AudioContext

async function loadSample(url: string) {
  let audioData = await loadArrayBuffer(url)
  const audiobuffer = await ctx.decodeAudioData(audioData)
  return audiobuffer
}

async function loadSamples() { 
  let output: {[key: string]: AudioBuffer[]} = {}
  for(let word in urlsByWord) {
    const urls = urlsByWord[word]
    output[word] = await Promise.all(
      urls.map((url: string) => loadSample(url))
    )
  }

  return output
}

export default loadSamples
