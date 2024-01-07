import * as Font from 'expo-font';
import { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import Interface from './src/components/Interface';
import Cell from './src/components/Cell';
import { cellSize, numColumns, numRows } from './src/Constants';
import { styles } from './src/Styles';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    Font.loadAsync({
      'DSEG': require('./assets/fonts/DSEG7Classic.ttf'),
    });
    return () => {
      StatusBar.setHidden(false);
    }
  }, [])

  const gridLines = [];
  for (let i = 1; i < numRows; i++) {
    gridLines.push(
      <View
        key={`horizontal-line-${i}`}
        style={[styles.gridLineX, { top: i * cellSize }]}
      />
    );
  }
  for (let j = 1; j < numColumns; j++) {
    gridLines.push(
      <View
        key={`vertical-line-${j}`}
        style={[styles.gridLineY, { left: j * cellSize }]}
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