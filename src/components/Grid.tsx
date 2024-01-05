import { Dimensions, View } from 'react-native';
import Cell from './Cell';

const numColumns = 16;
const numRows = 30;
const numBombs = 30;

function Grid() {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
        const columns = [];
        for (let col = 0; col < numColumns; col++) {
            columns.push(<Cell key={`${row}-${col}`} rowIndex={row} columnIndex={col} />);
        }
        grid.push(
            <View key={`row-${row}`} style={{flexDirection: 'row', flex: 1}}>
                {columns}
            </View>
        )
    }
    return <>{grid}</>;
}

export default Grid;