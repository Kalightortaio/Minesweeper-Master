import { View } from 'react-native';
import NumericDisplay from './NumericDisplay';
import { borderWidth, buttonLength, numMines, screenWidth } from '../Constants';
import ButtonReset from './ButtonReset';
import ButtonSettings from './ButtonSettings';
import ButtonFlag from './ButtonFlag';

interface InterfaceProps {
    timer: number,
    flagCount: number,
    fontsLoaded: boolean,
    isFlagMode: boolean,
    onToggleFlagMode: () => void,
    onResetGame: () => void,
}

function Interface({ timer, flagCount, fontsLoaded, isFlagMode, onResetGame, onToggleFlagMode }: InterfaceProps) {
    let flagsLeft = numMines - flagCount;
    if (flagsLeft < 0) flagsLeft = 0;

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: (screenWidth * 0.01),
    }}>
        <NumericDisplay value={flagsLeft} shouldRender={fontsLoaded}/>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: ((buttonLength + borderWidth) * 3.25),
        }}>
            <ButtonSettings/>
            <ButtonReset onResetGame={onResetGame}/>
            <ButtonFlag onToggleFlagMode={onToggleFlagMode} isFlagMode={isFlagMode}/>
        </View>
        <NumericDisplay value={timer} shouldRender={fontsLoaded}/>
    </View>;
}

export default Interface;