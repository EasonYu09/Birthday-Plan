export type OptionCode = 'T' | 'L' | 'M' | 'R' | 'H';

export interface Option {
    text: string;
    code: OptionCode;
}

export interface Question {
    id: number;
    question: string;
    options: Option[];
    isBonus?: boolean;
}

export interface TimelineItem {
    time: string;
    title: string;
    desc: string;
}

export interface ResultData {
    title: string;
    fullTitle: string;
    desc: string;
    icon: string;
    timeline: TimelineItem[];
}

export type Scores = Record<OptionCode, number>;

export enum AppScreen {
    WELCOME = 'WELCOME',
    QUIZ = 'QUIZ',
    CALCULATING = 'CALCULATING',
    RESULT = 'RESULT'
}
