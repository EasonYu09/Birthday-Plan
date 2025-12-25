import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="fade-in bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-pink-100 text-center relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-200 rounded-full opacity-20 blur-2xl"></div>

            <div className="flex justify-center mb-6 relative z-10">
                <div className="bg-pink-100 p-4 rounded-full text-pink-500 shadow-inner">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                        <path d="M12 8v13"></path>
                        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
                    </svg>
                </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 relative z-10">🎂 2026 生日限定</h1>
            <h2 className="text-xl font-bold text-pink-600 mb-6 relative z-10">專屬於妳的約會心測</h2>
            <p className="text-gray-600 mb-8 text-left leading-relaxed relative z-10 text-sm md:text-base">
                親愛的，為了讓 1/25 生日當天完美無缺，我準備了 5 套完全不同風格的行程劇本。
                <br /><br />
                請憑直覺回答這 11 個問題，App 將自動計算出妳潛意識最渴望的行程，並生成<b>詳細的時間表</b>！
            </p>
            <button 
                onClick={onStart} 
                className="relative z-10 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 text-lg transition-all"
            >
                開始測驗 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
            <div className="mt-6 text-xs text-gray-400 relative z-10">*終點站固定：新竹大遠百 饗食天堂</div>
        </div>
    );
};

export default WelcomeScreen;
