import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import CalculatingScreen from './components/CalculatingScreen';
import ResultScreen from './components/ResultScreen';
import { AppScreen, OptionCode, Scores } from './types';
import { RESULTS } from './constants';
import { generateBirthdayBlessing } from './services/geminiService';

const App: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.WELCOME);
    const [finalResultCode, setFinalResultCode] = useState<OptionCode | null>(null);
    const [aiBlessing, setAiBlessing] = useState<string | null>(null);

    const handleStart = () => {
        setCurrentScreen(AppScreen.QUIZ);
    };

    const handleQuizComplete = async (scores: Scores) => {
        setCurrentScreen(AppScreen.CALCULATING);

        // Find the maximum score
        let maxScore = -1;
        (Object.keys(scores) as OptionCode[]).forEach((code) => {
            if (scores[code] > maxScore) {
                maxScore = scores[code];
            }
        });

        // Find all codes that have the maximum score (handle ties)
        const winners: OptionCode[] = [];
        (Object.keys(scores) as OptionCode[]).forEach((code) => {
            if (scores[code] === maxScore) {
                winners.push(code);
            }
        });

        // Randomly select one winner if there are ties
        const finalWinner = winners[Math.floor(Math.random() * winners.length)];

        setFinalResultCode(finalWinner);

        // Generate AI Blessing in parallel with the delay
        const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
        // Safe to call even if API key is missing (returns fallback)
        const blessingPromise = generateBirthdayBlessing(RESULTS[finalWinner]);

        const [_, blessing] = await Promise.all([minDelay, blessingPromise]);

        setAiBlessing(blessing);
        setCurrentScreen(AppScreen.RESULT);
    };

    const handleReset = () => {
        setFinalResultCode(null);
        setCurrentScreen(AppScreen.WELCOME);
    };

    return (
        <div className="w-full h-full">
            {currentScreen === AppScreen.WELCOME && (
                <WelcomeScreen onStart={handleStart} />
            )}

            {currentScreen === AppScreen.QUIZ && (
                <QuizScreen onComplete={handleQuizComplete} />
            )}

            {currentScreen === AppScreen.CALCULATING && (
                <CalculatingScreen />
            )}

            {currentScreen === AppScreen.RESULT && finalResultCode && (
                <ResultScreen
                    resultCode={finalResultCode}
                    resultData={RESULTS[finalResultCode]}
                    aiBlessing={aiBlessing}
                    onReset={handleReset}
                />
            )}
        </div>
    );
};

export default App;