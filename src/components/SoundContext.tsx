import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

interface SoundContextType {
    playSound: (arg0: string) => void;
}

const SoundContext = createContext<SoundContextType>({
    playSound: async () => { },
});

interface SoundProviderProps {
    children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [sounds, setSounds] = useState<{[key: string]: Audio.Sound}>({});
    const lastRollsRef = useRef<number[]>([1,2]);
    const numClickSounds = 4;
    let roll: number

    useEffect(() => {
        const loadSounds = async () => {
            const soundFiles = {
                click1: require('../../assets/sounds/click1.mp3'),
                click2: require('../../assets/sounds/click2.mp3'),
                click3: require('../../assets/sounds/click3.mp3'),
                click4: require('../../assets/sounds/click4.mp3'),
            };
            const loadedSounds = await Promise.all(
                Object.entries(soundFiles).map(async ([key, source]) => {
                    const { sound } = await Audio.Sound.createAsync(source);
                    return [key, sound];
                })
            );
            setSounds(Object.fromEntries(loadedSounds));
        };

        loadSounds();

        return () => {
            Object.values(sounds).forEach(sound => sound.unloadAsync());
        };
    }, []);


    const playSound = async (soundKey: string) => {
        if (soundKey === 'click') {
            do {
                roll = Math.floor(Math.random() * numClickSounds) + 1;
            } while (roll === lastRollsRef.current[0] && roll === lastRollsRef.current[1]);
            lastRollsRef.current.shift();
            lastRollsRef.current.push(roll);
            soundKey += roll;
        }
        const sound = sounds[soundKey]
        if (sound) {
            console.log(soundKey, sound["_loaded"]);
            await sound.replayAsync();
        }
    };

    return (
        <SoundContext.Provider value={{ playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSounds = () => useContext(SoundContext);
