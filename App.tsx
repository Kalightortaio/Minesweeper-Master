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
  const gridPadding = Dimensions.get('window').width * 0.05
  const cellSize = ((Dimensions.get('window').width - (2 * (gridPadding))) / numColumns)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    interface: {
      flex: 1,
      width: '100%',
      borderWidth: 2,
      borderColor: 'red',
      backgroundColor: '#B9B9B9',
    },
    gridContainer: {
      flex: 11,
      width: '100%',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'red',
      backgroundColor: '#B6B6B6',
      justifyContent: 'center',
    },
    grid: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'blue',
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
          size={cellSize}
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
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {rows}
        </View>
      </View>
    </View>
  );
}