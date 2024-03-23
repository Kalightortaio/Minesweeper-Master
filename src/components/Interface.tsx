import { View } from 'react-native';
import { gridInnerWidth, interfacePadding, numMines } from '../Constants';
import NumericDisplay from './NumericDisplay';
import ButtonReset from './ButtonReset';
import ButtonSettings from './ButtonSettings';
import ButtonFlag from './ButtonFlag';
import { useTimerValue } from './TimerValueContext';

interface InterfaceProps {
    flagCount: number,
    isFlagMode: boolean,
    faceState: string,
    onToggleFlagMode: () => void,
    onResetGame: () => void,
}

function Interface({ flagCount, isFlagMode, faceState, onResetGame, onToggleFlagMode }: InterfaceProps) {
    const { timer } = useTimerValue();

    let flagsLeft = numMines - flagCount;
    if (flagsLeft < 0) flagsLeft = 0;

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: interfacePadding,
    }}>
        <NumericDisplay value={flagsLeft}/>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: (gridInnerWidth / 3),
        }}>
            <ButtonSettings/>
            <ButtonReset onResetGame={onResetGame} faceState={faceState}/>
            <ButtonFlag onToggleFlagMode={onToggleFlagMode} isFlagMode={isFlagMode}/>
        </View>
        <NumericDisplay value={timer}/>
    </View>;
}

export default Interface;