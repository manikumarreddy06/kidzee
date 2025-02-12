import React, { useState } from 'react';
import { User } from '../types';
import { Sparkles } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<'3-5' | '6-8'>('3-5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ name: name.trim(), age });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Welcome to KidzSpark!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              How old are you?
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value as '3-5' | '6-8')}
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            >
              <option value="3-5">3-5 years</option>
              <option value="6-8">6-8 years</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold py-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105"
          >
            Let's Go!
          </button>
        </form>
      </div>
    </div>
  );
}