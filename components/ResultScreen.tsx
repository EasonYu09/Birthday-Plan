import React, { useState } from 'react';
import { ResultData, OptionCode } from '../types';

interface ResultScreenProps {
    resultCode: OptionCode;
    resultData: ResultData;
    aiBlessing: string | null;
    onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ resultCode, resultData, aiBlessing, onReset }) => {
    const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

    const handleCopy = () => {
        const text = `親愛的，測驗結果是【${resultData.fullTitle}】！\n\nApp連行程表都排出來了，這就是我最想要的完美生日，交給你囉！❤️`;
        navigator.clipboard.writeText(text).then(() => {
            setCopyState('copied');
            setTimeout(() => setCopyState('idle'), 3000);
        });
    };

    // Parse the full title from format "Title: Subtitle"
    const [mainTitle, subTitle] = resultData.title.split('：');

    return (
        <div className="fade-in w-full bg-white backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-200 mb-10">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 text-center text-white relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                {/* Added 'float' class for animation */}
                <div className="text-7xl mb-4 transform cursor-default filter drop-shadow-lg float inline-block">
                    {resultData.icon}
                </div>
                <h2 className="text-3xl font-bold mb-2 tracking-wide">
                    {mainTitle}
                </h2>
                <div className="text-pink-100 text-sm font-bold bg-white/20 inline-block px-4 py-1.5 rounded-full mt-1 border border-white/30">
                    {subTitle}
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Description */}
                <div className="mb-6 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                    <h3 className="text-pink-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        男友的悄悄話
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        {aiBlessing || resultData.whisper || resultData.desc}
                    </p>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <h3 className="text-xl font-bold text-gray-800">當日行程表</h3>
                    </div>

                    <div className="timeline-line relative pl-2 space-y-6">
                        {resultData.timeline.map((item, idx) => (
                            <div key={idx} className="relative z-10 flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-4 border-pink-200 flex items-center justify-center shadow-sm">
                                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-100 flex-grow hover:shadow-md transition-shadow">
                                    <span className="text-pink-500 font-bold text-sm block mb-1">{item.time}</span>
                                    <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={handleCopy}
                    className={`w-full mb-3 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-95 ${copyState === 'copied' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
                >
                    {copyState === 'copied' ? (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            已複製！
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            傳送行程給男友
                        </>
                    )}
                </button>

                <button
                    onClick={onReset}
                    className="w-full py-3 px-6 rounded-xl font-medium text-gray-500 hover:bg-gray-100 flex items-center justify-center gap-2 transition-colors border border-gray-200 active:scale-95"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    再測一次
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;