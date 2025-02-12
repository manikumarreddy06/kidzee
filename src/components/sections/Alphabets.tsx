import React, { useState } from 'react';
import { Volume2, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

interface AlphabetItem {
  letter: string;
  word: string;
  image: string;
}

const alphabetData: AlphabetItem[] = [
  { letter: 'A', word: 'Apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80' },
  { letter: 'B', word: 'Ball', image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=300&q=80' },
  { letter: 'C', word: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80' },
  // Add more letters here
];

export function Alphabets({ onBack }: Props) {
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem | null>(null);

  const playAudio = (letter: string, word: string) => {
    const utterance = new SpeechSynthesisUtterance(`${letter} for ${word}`);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-center flex-1 text-yellow-800">Learn Your ABCs!</h2>
        </div>
        
        {selectedLetter && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
            <div className="text-8xl font-bold mb-4 text-purple-600">{selectedLetter.letter}</div>
            <img
              src={selectedLetter.image}
              alt={selectedLetter.word}
              className="w-40 h-40 mx-auto mb-4 rounded-lg object-cover"
            />
            <div className="text-2xl font-semibold mb-4">
              {selectedLetter.letter} for {selectedLetter.word}
            </div>
            <button
              onClick={() => playAudio(selectedLetter.letter, selectedLetter.word)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg mx-auto hover:bg-purple-600"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {alphabetData.map((item) => (
            <button
              key={item.letter}
              onClick={() => setSelectedLetter(item)}
              className={`aspect-square bg-white rounded-lg shadow-md flex items-center justify-center text-4xl font-bold
                ${selectedLetter?.letter === item.letter ? 'ring-4 ring-purple-500' : ''}
                hover:bg-purple-50 transition-colors`}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}