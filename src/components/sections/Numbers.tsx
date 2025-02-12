import React, { useState } from 'react';
import { Volume2, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

interface NumberItem {
  number: number;
  word: string;
  objects: string;
  image: string;
}

const numbersData: NumberItem[] = [
  { 
    number: 1, 
    word: 'One', 
    objects: 'Apple',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80'
  },
  { 
    number: 2, 
    word: 'Two', 
    objects: 'Birds',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=300&q=80'
  },
  { 
    number: 3, 
    word: 'Three', 
    objects: 'Balloons',
    image: 'https://images.unsplash.com/photo-1526653054275-5a4f37ea1c64?auto=format&fit=crop&w=300&q=80'
  },
  { 
    number: 4, 
    word: 'Four', 
    objects: 'Cars',
    image: 'https://images.unsplash.com/photo-1441148345475-03a2e82f9719?auto=format&fit=crop&w=300&q=80'
  },
  { 
    number: 5, 
    word: 'Five', 
    objects: 'Stars',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80'
  }
];

export function Numbers({ onBack }: Props) {
  const [selectedNumber, setSelectedNumber] = useState<NumberItem | null>(null);

  const playAudio = (word: string, objects: string) => {
    const utterance = new SpeechSynthesisUtterance(`${word} ${objects}`);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-center flex-1 text-blue-800">Learn Numbers!</h2>
        </div>

        {selectedNumber && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
            <div className="text-8xl font-bold mb-4 text-blue-600">{selectedNumber.number}</div>
            <img
              src={selectedNumber.image}
              alt={`${selectedNumber.number} ${selectedNumber.objects}`}
              className="w-40 h-40 mx-auto mb-4 rounded-lg object-cover"
            />
            <div className="text-2xl font-semibold mb-4">
              {selectedNumber.word} {selectedNumber.objects}
            </div>
            <button
              onClick={() => playAudio(selectedNumber.word, selectedNumber.objects)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg mx-auto hover:bg-blue-600"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {numbersData.map((item) => (
            <button
              key={item.number}
              onClick={() => setSelectedNumber(item)}
              className={`aspect-square bg-white rounded-lg shadow-md flex items-center justify-center text-4xl font-bold
                ${selectedNumber?.number === item.number ? 'ring-4 ring-blue-500' : ''}
                hover:bg-blue-50 transition-colors`}
            >
              {item.number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}