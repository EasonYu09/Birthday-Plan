import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { Option, OptionCode } from '../types';

interface QuizScreenProps {
    onComplete: (scores: Record<OptionCode, number>) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<Record<OptionCode, number>>({ T: 0, L: 0, M: 0, R: 0, H: 0 });
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
    
    // Animation key to trigger re-render animations
    const [animKey, setAnimKey] = useState(0);

    const question = QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    useEffect(() => {
        // Shuffle options when question changes
        const opts = [...question.options];
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        setShuffledOptions(opts);
        setAnimKey(prev => prev + 1);
        window.scrollTo(0, 0);
    }, [currentStep, question]);

    const handleAnswer = (code: OptionCode) => {
        const points = question.isBonus ? 2 : 1;
        const newScores = { ...scores, [code]: scores[code] + points };
        setScores(newScores);

        if (currentStep < QUESTIONS.length - 1) {
            // Small delay for UX
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 150);
        } else {
            onComplete(newScores);
        }
    };

    return (
        <div className="fade-in w-full">
            <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-pink-600 font-bold bg-pink-100 px-3 py-1 rounded-full text-sm">
                    Q{question.id} / {QUESTIONS.length}
                </span>
                <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className={`h-full transition-all duration-300 ${question.isBonus ? 'bg-amber-400' : 'bg-pink-500'}`} 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg border border-pink-100 mb-6 min-h-[120px] flex flex-col justify-center relative overflow-hidden">
                {question.isBonus && (
                    <div className="mb-2">
                        <span className="text-amber-500 font-bold text-sm flex items-center gap-1 pulse-text">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            最終加分題 (權重 x2)
                        </span>
                    </div>
                )}
                <h3 key={`q-${animKey}`} className="text-lg font-bold text-gray-800 leading-snug z-10 fade-in">
                    {question.question}
                </h3>
            </div>

            <div className="space-y-3">
                {shuffledOptions.map((opt, index) => {
                    const parts = opt.text.split('：');
                    const title = parts[0];
                    const subtitle = parts[1] || "";
                    const displayText = question.isBonus ? opt.text : title;
                    const displaySub = question.isBonus ? "" : subtitle;
                    
                    const indexIconColor = question.isBonus 
                        ? "bg-amber-100 text-amber-600 group-hover:bg-amber-500" 
                        : "bg-pink-100 text-pink-600 group-hover:bg-pink-500";
                    
                    const borderColor = question.isBonus
                        ? "border-amber-200 hover:bg-amber-50 hover:border-amber-400"
                        : "hover:bg-pink-50 hover:border-pink-300";

                    return (
                        <button
                            key={`${animKey}-${index}`}
                            onClick={() => handleAnswer(opt.code)}
                            className={`slide-in w-full text-left p-4 bg-white/90 border border-transparent rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group active:scale-98 ${borderColor}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="flex items-start gap-3">
                                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${indexIconColor} flex items-center justify-center text-sm font-bold group-hover:text-white transition-colors`}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                                    <span className="font-bold text-gray-800">{displayText}</span>
                                    {displaySub && <span className="block text-xs text-gray-500 mt-1">{displaySub}</span>}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizScreen;
