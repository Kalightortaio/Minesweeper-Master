import { View } from 'react-native';
import NumericDisplay from './NumericDisplay';
import { numMines, screenWidth } from '../Constants';

interface InterfaceProps {
    timer: number,
    fontsLoaded: boolean,
    flagCount: number,
}

function Interface({ timer, flagCount, fontsLoaded }: InterfaceProps) {
    let flagsLeft = numMines - flagCount;
    if (flagsLeft < 0) flagsLeft = 0;

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: (screenWidth * 0.01),
    }}>
        {fontsLoaded &&
        <NumericDisplay value={flagsLeft}/>}
        {fontsLoaded &&
        <NumericDisplay value={timer}/>}
    </View>;
}

export default Interface;