import { useState } from "react";
import React from "react";
import "./App.css";
import Display from "./assets/Display";

interface Drum {
  key: string;
  url: string;
  name: string;
}

// array of all audio types, their keys and their names
const drums: Drum[] = [
  {
    key: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    name: "Heater 1",
  },
  {
    key: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    name: "Heater 2",
  },
  {
    key: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    name: "Heater 3",
  },
  {
    key: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    name: "Heater 4",
  },
  {
    key: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    name: "Clap",
  },
  {
    key: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    name: "Open-HH",
  },
  {
    key: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    name: "Kick-n'-Hat",
  },
  {
    key: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    name: "Kick",
  },
  {
    key: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    name: "Closed-HH",
  },
];
function App() {
  // state to hold the volume level (default to 0.5)
  const [volume, setVolume] = useState(0.5);

  // make it so the audio can play by pressing the key on the keyboard
  const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // locate when a key is being pressed
    const clip = drums.find((clip) => clip.key === e.key.toUpperCase());
    if (!clip) return;

    // Get the corresponding audio element
    const audioElement = document.getElementById(clip.key) as HTMLAudioElement;

    // Set the volume of the audio element
    audioElement.volume = volume;

    // Play the audio
    audioElement
      .play()
      .then(() => {
        // Success: Handle the audio play logic here (if needed)
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });

    // make a border around the selected key
    document.getElementById("drum-" + clip.key)?.focus();
    // display the name of the key that was pressed
    document.getElementById("display")!.innerText = clip.name;
  };

  // handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    // HTML
    <div id="outside" onKeyDown={playAudio}>
      <h1>Drum Machine</h1>
      <div id="drum-machine">
        <div id="pads">
          {drums.map((clip) => (
            <Display audio={clip} volume={volume} key={clip.key} />
          ))}
        </div>
        <div id="display" className="fade-out"></div>
        <div id="volume-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <p>Volume: {Math.round(volume * 100)}%</p>
        </div>
      </div>
      <footer>Created by Bryson Sutton</footer>
    </div>
  );
}

export default App;
