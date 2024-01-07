import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, StatusBar, AppState } from 'react-native';
import Interface from './src/components/Interface';
import Cell from './src/components/Cell';
import { cellSize, numColumns, numRows } from './src/Constants';
import { styles } from './src/Styles';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFirstPress, setIsFirstPress] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    StatusBar.setHidden(true);
    (async () => {
      await Font.loadAsync({
        'DSEG': require('./assets/fonts/DSEG.ttf'),
      });
      setFontsLoaded(true);
    })();
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  useEffect(() => {
    if (!isFirstPress && !timerIntervalId) {
      const intervalId = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
      setTimerIntervalId(intervalId);
    }
    return () => {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [isFirstPress, timerIntervalId]);

  const handleFirstPress = () => {
    if (isFirstPress) {
      setIsFirstPress(false);
    }
  };

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
          onFirstPress={handleFirstPress}
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
        {fontsLoaded && <Interface timer={timer}/>}
      </View>
      <View style={styles.grid}>
        {gridLines}
        {rows}
      </View>
    </View>
  );
}