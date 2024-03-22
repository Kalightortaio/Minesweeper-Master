import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTimerControls } from './TimerControlContext';

const TimerValueContext = createContext<{ timer: number }>({ timer: 0 });

export const useTimerValue = () => useContext(TimerValueContext);

interface TimerValueProviderProps {
    children: ReactNode;
}

export const TimerValueProvider: React.FC<TimerValueProviderProps> = ({ children }) => {
    const [timer, setTimer] = useState(0);
    const { isTimerActive, shouldResetTimer, setShouldResetTimer } = useTimerControls();

    useEffect(() => {
        if (shouldResetTimer) {
            setTimer(0);
            setShouldResetTimer(false);
        }
    }, [shouldResetTimer]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;
        if (isTimerActive) {
            intervalId = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isTimerActive]);

    return (
        <TimerValueContext.Provider value={{timer}}>
            {children}
        </TimerValueContext.Provider>
    );
};