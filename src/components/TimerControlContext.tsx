import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerControlContextType {
    isTimerActive: boolean;
    shouldResetTimer: boolean;
    setShouldResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
}

const TimerControlContext = createContext<TimerControlContextType>({
    isTimerActive: false,
    shouldResetTimer: false,
    setShouldResetTimer: () => { },
    startTimer: () => { },
    pauseTimer: () => { },
    resetTimer: () => { },
});

export const useTimerControls = () => useContext(TimerControlContext);

interface TimerControlProviderProps {
    children: ReactNode;
}

export const TimerControlProvider: React.FC<TimerControlProviderProps> = ({ children }) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [shouldResetTimer, setShouldResetTimer] = useState(false);

    const startTimer = () => setIsTimerActive(true);
    const pauseTimer = () => setIsTimerActive(false);
    const resetTimer = () => {
        setShouldResetTimer(true);
        setIsTimerActive(false);
    };

    const value = { startTimer, pauseTimer, resetTimer, isTimerActive, shouldResetTimer, setShouldResetTimer }

    return (
        <TimerControlContext.Provider value={value}>
            {children}
        </TimerControlContext.Provider>
    );
};