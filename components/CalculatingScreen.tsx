import React from 'react';

const CalculatingScreen: React.FC = () => {
    return (
        <div className="fade-in text-center pt-32">
            <div className="animate-bounce mb-6 flex justify-center">
                <div className="bg-white p-4 rounded-full shadow-xl">
                     <svg width="60" height="60" viewBox="0 0 24 24" fill="#ec4899" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                     </svg>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-700">正在生成行程表...</h2>
            <p className="text-gray-500 mt-2">AI 正在計算最佳路線與時間</p>
        </div>
    );
};

export default CalculatingScreen;
