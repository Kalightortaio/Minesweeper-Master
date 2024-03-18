import { View } from 'react-native';
import NumericDisplay from './NumericDisplay';
import { FontsLoadedContext, gridInnerWidth, interfacePadding, numMines } from '../Constants';
import ButtonReset from './ButtonReset';
import ButtonSettings from './ButtonSettings';
import ButtonFlag from './ButtonFlag';
import { useContext } from 'react';

interface InterfaceProps {
    timer: number,
    flagCount: number,
    isFlagMode: boolean,
    faceState: string,
    onToggleFlagMode: () => void,
    onResetGame: () => void,
}

function Interface({ timer, flagCount, isFlagMode, faceState, onResetGame, onToggleFlagMode }: InterfaceProps) {
    const fontsLoaded = useContext(FontsLoadedContext);

    let flagsLeft = numMines - flagCount;
    if (flagsLeft < 0) flagsLeft = 0;

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: interfacePadding,
    }}>
        <NumericDisplay value={flagsLeft} shouldRender={fontsLoaded}/>
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
        <NumericDisplay value={timer} shouldRender={fontsLoaded}/>
    </View>;
}

export default Interface;