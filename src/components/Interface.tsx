import { View } from 'react-native';
import NumericDisplay from './NumericDisplay';
import { screenWidth } from '../Constants';

interface InterfaceProps {
    timer: number,
}

function Interface({ timer }: InterfaceProps) {
    let var1 = 99;

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: (screenWidth * 0.01),
    }}>
        <NumericDisplay value={var1}/>
        <NumericDisplay value={timer}/>
    </View>;
}

export default Interface;