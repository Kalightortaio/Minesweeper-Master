import { useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import Interface from './src/components/Interface';
import Cell from './src/components/Cell';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    }
  }, [])

  const numColumns = 16;
  const numRows = 30;
  const borderWidth = 3;
  const gridPadding = (Dimensions.get('window').width * 0.05);
  const cellSize = ((Dimensions.get('window').width - (2 * (gridPadding))) / numColumns);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      borderWidth: borderWidth,
      borderTopColor: '#fff',
      borderLeftColor: '#fff',
      borderBottomColor: '#7D7D7D',
      borderRightColor: '#7D7D7D',
      backgroundColor: '#BDBDBD',
      justifyContent: 'space-evenly',
    },
    interface: {
      height: (2 * cellSize),
      width: ((2 * borderWidth) + (numColumns * cellSize)),
      borderWidth: borderWidth,
      borderTopColor: '#7D7D7D',
      borderLeftColor: '#7D7D7D',
      borderBottomColor: '#fff',
      borderRightColor: '#fff',
      backgroundColor: '#BDBDBD',
    },
    grid: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: borderWidth,
      borderTopColor: '#7D7D7D',
      borderLeftColor: '#7D7D7D',
      borderBottomColor: '#fff',
      borderRightColor: '#fff',
    },
    gridRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }
  });

  const rows = [];
  for (let row = 0; row < numRows; row++) {
    const cells = [];
    for (let col = 0; col < numColumns; col++) {
      cells.push(
        <Cell
          key={`${row}-${col}`}
          rowIndex={row}
          columnIndex={col}
          cellSize={cellSize}
          borderWidth={borderWidth}
        />
      );
    }
    rows.push(
      <View key={`row-${row}`} style={styles.gridRow}>
        {cells}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.interface}>
        <Interface />
      </View>
      <View style={styles.grid}>
        {rows}
      </View>
    </View>
  );
}