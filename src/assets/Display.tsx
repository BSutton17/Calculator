import React from 'react';

interface Drum {
  key: string;
  url: string;
  name: string;
}

interface DrumProps {
  audio: Drum;
  volume: number; // Add the volume prop
}

const Display = ({ audio, volume }: DrumProps) => {
  const playSound = (clip: Drum) => {
    const audioElement = document.getElementById(
      clip.key
    ) as HTMLAudioElement;

    // Set the volume of the audio element
    audioElement.volume = volume;

    // Play the audio
    audioElement
      .play()
      .then(() => {
        // Success: Handle the audio play logic here (if needed)
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });

    document.getElementById("display")!.innerText = clip.name;
  };

  return (
    <div>
      <button
        className="drum-pad"
        id={`drum-${audio.key}`}
        onClick={() => playSound(audio)}
      >
        <audio src={audio.url} id={audio.key} className="clip" />
        {audio.key}
      </button>
    </div>
  );
};

export default Display;
