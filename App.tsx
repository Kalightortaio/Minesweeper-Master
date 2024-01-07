import { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import Interface from './src/components/Interface';
import Cell from './src/components/Cell';
import { cellSize, numColumns, numRows } from './src/Constants';
import { styles } from './src/Styles';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    }
  }, [])

  const gridLines = [];
  for (let i = 0; i <= numRows; i++) {
    gridLines.push(
      <View
        key={`horizontal-line-${i}`}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: i * cellSize,
          height: 1,
          backgroundColor: 'grey',
        }}
      />
    );
  }
  for (let j = 0; j <= numColumns; j++) {
    gridLines.push(
      <View
        key={`vertical-line-${j}`}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: j * cellSize,
          width: 1,
          backgroundColor: 'grey',
        }}
      />
    );
  }

  const rows = [];
  for (let row = 0; row < numRows; row++) {
    const cells = [];
    for (let col = 0; col < numColumns; col++) {
      cells.push(
        <Cell
          key={`${row}-${col}`}
          rowIndex={row}
          columnIndex={col}
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
        {gridLines}
        {rows}
      </View>
    </View>
  );
}