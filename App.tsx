import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, StatusBar, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Zoomable from './src/components/Zoomable';
import Interface from './src/components/Interface';
import Cell from './src/components/Cell';
import { cellSize, numColumns, numMines, numRows } from './src/Constants';
import { styles } from './src/Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CellStateProps } from './src/Types';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isNewGame, setIsNewGame] = useState(true);
  const [cells, setCells] = useState<CellStateProps[][]>(initializeCells());
  const [isFirstPress, setIsFirstPress] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isPanOrPinchActive, setPanOrPinchActive] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFlagMode, setIsFlagMode] = useState(false);

  function onResetGame() {
    setIsNewGame(true);
    setIsFirstPress(true);
    setTimer(0);
    setFlagCount(0);

    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }

    setCells(initializeCells());
  }

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
    if (isNewGame) {
      let updatedCells = placeMines(cells);

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numColumns; col++) {
          updatedCells = updateNeighbors(row, col, updatedCells);
        }
      }

      let adjustmentResult;
      do {
        adjustmentResult = adjustMinesPlacement(updatedCells);
        updatedCells = adjustmentResult.adjustedCells;

        if (adjustmentResult.needsAdjustment) {
          for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
              updatedCells = updateNeighbors(row, col, updatedCells);
            }
          }
        }
      } while (adjustmentResult.needsAdjustment);

      setCells(updatedCells);
      setIsNewGame(false);
    }
  }, [isNewGame]);

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

  const revealCell = (row: number, col: number) => {
    setCells(currentCells => {
      let newCells = currentCells.map(row => row.slice());

      if (isFirstPress) {
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < numRows && c >= 0 && c < numColumns && newCells[r][c].isMine) {
              const { newRow, newCol } = findNewMineLocation(newCells);
              newCells[r][c].isMine = false;
              newCells[newRow][newCol].isMine = true;
            }
          }
        }

        for (let r = row - 2; r <= row + 2; r++) {
          for (let c = col - 2; c <= col + 2; c++) {
            if ((r < row - 1 || r > row + 1 || c < col - 1 || c > col + 1) &&
              r >= 0 && r < numRows && c >= 0 && c < numColumns &&
              newCells[r][c].isMine && Math.random() < 0.3) {
              const { newRow, newCol } = findNewMineLocation(newCells);
              newCells[r][c].isMine = false;
              newCells[newRow][newCol].isMine = true;
            }
          }
        }

        for (let r = 0; r < numRows; r++) {
          for (let c = 0; c < numColumns; c++) {
            newCells = updateNeighbors(r, c, newCells);
          }
        }

        setIsFirstPress(false);
      }

      if (!newCells[row][col].isMine) {
        newCells = revealAdjacentCells(row, col, newCells);
      } else {
        newCells[row][col].isRevealed = true;
      }

      return newCells;
    });
  };

  function revealAdjacentCells(row: number, col: number, cells: CellStateProps[][]) {
    if (row < 0 || row >= numRows || col < 0 || col >= numColumns || cells[row][col].isRevealed) {
      return cells;
    }
    cells[row][col].isRevealed = true;

    if (cells[row][col].neighbors === 0) {
      for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, numRows - 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, numColumns - 1); c++) {
          if (!cells[r][c].isRevealed && !cells[r][c].isFlagged) {
            revealAdjacentCells(r, c, cells);
          }
        }
      }
    }

    return cells;
  }

  const flagCell = (row: number, col: number) => {
    setCells(currentCells => {
      const newCells = [...currentCells];
      newCells[row] = [...newCells[row]];
      const isFlagged = !newCells[row][col].isFlagged;
      newCells[row][col] = { ...newCells[row][col], isFlagged: isFlagged };
      updateFlagCount(isFlagged);
      return newCells;
    });
  };

  const updateFlagCount = (isFlagged: boolean) => {
    setFlagCount(prevFlagCount => isFlagged ? prevFlagCount + 1 : prevFlagCount - 1);
  };

  function placeMines(currentCells: CellStateProps[][]) {
    const newCells = currentCells.map(row => row.map(cell => ({ ...cell, isMine: false })));
    let MinesPlaced = 0;

    while (MinesPlaced < numMines) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numColumns);

      if (!newCells[randomRow][randomCol].isMine) {
        newCells[randomRow][randomCol].isMine = true;
        MinesPlaced++;
      }
    }

    return newCells;
  }

  function updateNeighbors(row: number, col: number, cells: CellStateProps[][]): CellStateProps[][] {
    const newCells = cells.map(row => row.slice());

    const startRow = Math.max(0, row - 1);
    const endRow = Math.min(numRows - 1, row + 1);
    const startCol = Math.max(0, col - 1);
    const endCol = Math.min(numColumns - 1, col + 1);

    let mineCount = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        if (r === row && c === col) continue;
        if (newCells[r][c].isMine) {
          mineCount++;
        }
      }
    }
    newCells[row][col] = { ...newCells[row][col], neighbors: mineCount };
    return newCells;
  }

  function adjustMinesPlacement(cells: CellStateProps[][]) {
    let adjustedCells = cells.map(row => row.slice());
    let needsAdjustment = false;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const cell = adjustedCells[row][col];
        if (cell.isMine && (
          (cell.isCorner && cell.neighbors === 3) ||
          (!cell.isCorner && cell.neighbors === 8))) {
          const { newRow, newCol } = findNewMineLocation(adjustedCells);
          adjustedCells[row][col].isMine = false;
          adjustedCells[newRow][newCol].isMine = true;
          needsAdjustment = true;
        }
      }
    }
    return { adjustedCells, needsAdjustment };
  }

  function findNewMineLocation(cells: CellStateProps[][]) {
    let newRow, newCol, cell;
    do {
      newRow = Math.floor(Math.random() * numRows);
      newCol = Math.floor(Math.random() * numColumns);
      cell = cells[newRow][newCol];
    } while (cell.isMine || (cell.isCorner && cell.neighbors === 3) || (!cell.isCorner && cell.neighbors === 8));
    return { newRow, newCol };
  }

  const onSettingsModal = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onToggleFlagMode = () => {
    setIsFlagMode(currentFlagMode => !currentFlagMode);
  };

  const modalstuff = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
    },
    topBar: {
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ddd',
    },
    backButton: {
      padding: 10,
    },
    backArrow: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.interface}>
          <Interface timer={timer} flagCount={flagCount} fontsLoaded={fontsLoaded} isFlagMode={isFlagMode} onSettingsModal={onSettingsModal} onResetGame={onResetGame} onToggleFlagMode={onToggleFlagMode}/>
        </View>
        <View style={styles.grid}>
          <Zoomable 
            style={{ overflow: 'hidden', zIndex: 0 }} 
            setPanOrPinchActive={setPanOrPinchActive}
          >
            {gridLines}
            {cells.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.gridRow}>
                {row.map((cellState, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    isPanOrPinchActive={isPanOrPinchActive}
                    revealCell={() => revealCell(rowIndex, colIndex)}
                    flagCell={() => flagCell(rowIndex, colIndex)}
                    isFlagMode={isFlagMode}
                    {...cellState}
                  />
                ))}
              </View>
            ))}
          </Zoomable>
        </View>
      </View>
      {modalVisible && <View style={modalstuff.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={onCloseModal}
        >
          <View style={modalstuff.modalContainer}>
            <View style={modalstuff.topBar}>
              <TouchableOpacity onPress={onCloseModal} style={modalstuff.backButton}>
                <Text style={modalstuff.backArrow}>←</Text>
              </TouchableOpacity>
            </View>
            <View style={modalstuff.modalContent}>
              {/* Your modal content goes here */}
              <Text>Settings Content</Text>
            </View>
          </View>
        </Modal>
      </View>}
    </GestureHandlerRootView >
  );
}

function initializeCells(): CellStateProps[][] {
  const initialCells: CellStateProps[][] = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numColumns; col++) {
      const isCorner = (row === 0 || row === numRows - 1) && (col === 0 || col === numColumns - 1);
      currentRow.push({
        rowIndex: row,
        columnIndex: col,
        isRevealed: false,
        isFlagged: false,
        isMine: false,
        isCorner: isCorner,
        neighbors: 0,
      });
    }
    initialCells.push(currentRow);
  }
  return initialCells;
}