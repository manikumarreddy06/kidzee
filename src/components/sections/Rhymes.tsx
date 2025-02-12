import React, { useState } from 'react';
import { Volume2, ArrowLeft, Pause } from 'lucide-react';

interface Props {
  onBack: () => void;
}

interface RhymeItem {
  id: string;
  title: string;
  lyrics: string[];
  image: string;
}

const rhymesData: RhymeItem[] = [
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle Little Star',
    lyrics: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky.'
    ],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'baa-baa',
    title: 'Baa, Baa, Black Sheep',
    lyrics: [
      'Baa, baa, black sheep,',
      'Have you any wool?',
      'Yes sir, yes sir,',
      'Three bags full!'
    ],
    image: 'https://images.unsplash.com/photo-1511117833895-4b473c0b85d6?auto=format&fit=crop&w=300&q=80'
  }
];

export function Rhymes({ onBack }: Props) {
  const [selectedRhyme, setSelectedRhyme] = useState<RhymeItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  const playRhyme = (rhyme: RhymeItem) => {
    setIsPlaying(true);
    setCurrentLine(0);
    
    const speakLine = (index: number) => {
      if (index < rhyme.lyrics.length) {
        const utterance = new SpeechSynthesisUtterance(rhyme.lyrics[index]);
        utterance.onend = () => {
          setCurrentLine(index + 1);
          speakLine(index + 1);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false);
        setCurrentLine(0);
      }
    };

    speakLine(0);
  };

  const stopRhyme = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentLine(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-center flex-1 text-purple-800">Nursery Rhymes</h2>
        </div>

        {selectedRhyme && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <img
              src={selectedRhyme.image}
              alt={selectedRhyme.title}
              className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover"
            />
            <h3 className="text-2xl font-bold text-center mb-4">{selectedRhyme.title}</h3>
            <div className="space-y-2 mb-4">
              {selectedRhyme.lyrics.map((line, index) => (
                <p
                  key={index}
                  className={`text-xl text-center ${
                    index === currentLine && isPlaying
                      ? 'text-purple-600 font-bold'
                      : 'text-gray-700'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="flex justify-center">
              {!isPlaying ? (
                <button
                  onClick={() => playRhyme(selectedRhyme)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  <Volume2 className="w-5 h-5" />
                  Play
                </button>
              ) : (
                <button
                  onClick={stopRhyme}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  <Pause className="w-5 h-5" />
                  Stop
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rhymesData.map((rhyme) => (
            <button
              key={rhyme.id}
              onClick={() => setSelectedRhyme(rhyme)}
              className={`bg-white p-6 rounded-lg shadow-md text-center hover:bg-purple-50 transition-colors
                ${selectedRhyme?.id === rhyme.id ? 'ring-4 ring-purple-500' : ''}`}
            >
              <img
                src={rhyme.image}
                alt={rhyme.title}
                className="w-24 h-24 mx-auto mb-4 rounded-lg object-cover"
              />
              <h3 className="text-xl font-semibold">{rhyme.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}