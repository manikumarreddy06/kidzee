import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';
import { Canvas } from './components/sections/Canvas';
import { Alphabets } from './components/sections/Alphabets';
import { Numbers } from './components/sections/Numbers';
import { Rhymes } from './components/sections/Rhymes';
import { ColoringBooks } from './components/sections/ColoringBooks';
import { User, Section } from './types';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('kidzsparkUser', JSON.stringify(userData));
  };

  const handleSectionSelect = (section: Section) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection(null);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentSection) {
    switch (currentSection.id) {
      case 'canvas':
        return <Canvas onBack={handleBack} />;
      case 'alphabets':
        return <Alphabets onBack={handleBack} />;
      case 'numbers':
        return <Numbers onBack={handleBack} />;
      case 'rhymes':
        return <Rhymes onBack={handleBack} />;
      case 'coloring':
        return <ColoringBooks onBack={handleBack} />;
      default:
        return <MainScreen user={user} onSectionSelect={handleSectionSelect} />;
    }
  }

  return <MainScreen user={user} onSectionSelect={handleSectionSelect} />;
}

export default App