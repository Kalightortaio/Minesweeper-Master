import { Dimensions, View } from 'react-native';
import Cell from './Cell';

const numColumns = 16;
const numRows = 30;
const numBombs = 30;

function Grid() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth / numColumns, windowHeight / numRows);
    const grid = [];
    for (let row = 0; row < numRows; row++) {
        const columns = [];
        for (let col = 0; col < numColumns; col++) {
            columns.push(<Cell key={`${row}-${col}`} rowIndex={row} columnIndex={col} size={size} />);
        }
        grid.push(
            <View key={`row-${row}`} style={{flexDirection: 'row'}}>
                {columns}
            </View>
        )
    }
    return <>{grid}</>;
}

export default Grid;