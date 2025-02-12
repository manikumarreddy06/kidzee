import React from 'react';
import { User, Section } from '../types';
import { Palette, BookA, Music, Pencil, Hash } from 'lucide-react';

interface Props {
  user: User;
  onSectionSelect: (section: Section) => void;
}

const sections: Section[] = [
  {
    id: 'canvas',
    title: 'Canvas',
    icon: 'Palette',
    color: 'bg-pink-500',
  },
  {
    id: 'alphabets',
    title: 'Alphabets',
    icon: 'BookA',
    color: 'bg-purple-500',
  },
  {
    id: 'numbers',
    title: 'Numbers',
    icon: 'Hash',
    color: 'bg-blue-500',
  },
  {
    id: 'rhymes',
    title: 'Rhymes',
    icon: 'Music',
    color: 'bg-green-500',
  },
  {
    id: 'coloring',
    title: 'Coloring Books',
    icon: 'Pencil',
    color: 'bg-orange-500',
  },
];

const iconComponents: Record<string, React.ElementType> = {
  Palette,
  BookA,
  Hash,
  Music,
  Pencil,
};

export function MainScreen({ user, onSectionSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
        Hi, {user.name}! What do you want to do today?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sections.map((section) => {
          const Icon = iconComponents[section.icon];
          return (
            <button
              key={section.id}
              onClick={() => onSectionSelect(section)}
              className={`${section.color} p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition duration-200 flex flex-col items-center`}
            >
              <Icon className="w-16 h-16 mb-4" />
              <span className="text-2xl font-bold">{section.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}