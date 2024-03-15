import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProvider } from '../components/NavigationContext';
import { RootStackParamList } from '../Types';
import { CellStateProps } from '../Types';
import { FontsLoadedContext, borderWidth, cellSize, gridMargin, gridWidth, numColumns, numMines, numRows } from '../Constants';
import Zoomable from '../components/Zoomable';
import Interface from '../components/Interface';
import Cell from '../components/Cell';
import { throttle } from 'lodash';

type ClassicModeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ClassicMode'>;
}

export default function ClassicMode({ navigation }:ClassicModeProps) {
    const [isNewGame, setIsNewGame] = useState(true);
    const [cells, setCells] = useState<CellStateProps[][]>(initializeCells());
    const [isFirstPress, setIsFirstPress] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isPanOrPinchActive, setPanOrPinchActive] = useState(false);
    const [flagCount, setFlagCount] = useState(0);
    const [isFlagMode, setIsFlagMode] = useState(false);
    const fontsLoaded = useContext(FontsLoadedContext);

    function onResetGame() {
        setIsNewGame(true);
        setIsFirstPress(true);
        setTimer(0);
        setFlagCount(0);
        setCells(initializeCells());
    }

    useEffect(() => {
        if (isNewGame) {
            let localCells = [...cells];
            placeMines(localCells);
            setCells(localCells);
            setIsNewGame(false);
        }
    }, [isNewGame]);

    useEffect(() => {
        if (!isFirstPress) {
            const intervalId = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isFirstPress]);

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

    const onCellPress = throttle((row: number, col: number, long: boolean ) => {
        if (!isPanOrPinchActive) {
            let localCells = [...cells];
            if (!long) {
                if (isFlagMode) {
                    if (!localCells[row][col].isRevealed) {
                        flagCell(row, col);
                    }
                } else {
                    if (!localCells[row][col].isRevealed && !localCells[row][col].isFlagged) {
                        revealCell(row, col);
                    }
                }
            } else {
                if (isFlagMode) {
                    if (!localCells[row][col].isRevealed && !localCells[row][col].isFlagged) {
                        Vibration.vibrate(100);
                        revealCell(row, col);
                    }
                } else {
                    if (!localCells[row][col].isRevealed) {
                        Vibration.vibrate(100);
                        flagCell(row, col);
                    }
                }
            }
        }
    }, 20, {'leading': true,'trailing': false})

    const revealCell = (row: number, col: number) => {
        if (isFirstPress) {
            let localCells = [...cells];
            for (let r = row - 2; r <= row + 2; r++) {
                for (let c = col - 2; c <= col + 2; c++) {
                    if (r >= 0 && r < numRows && c >= 0 && c < numColumns) {
                        const isInImmediateRadius = r >= row - 1 && r <= row + 1 && c >= col - 1 && c <= col + 1;
                        const shouldRemoveMine = isInImmediateRadius || (!isInImmediateRadius && Math.random() < 0.3);
                        if (localCells[r][c].isMine && shouldRemoveMine) {
                            const { newRow, newCol } = findNewMineLocation(localCells);
                            localCells[r][c].isMine = false;
                            localCells[newRow][newCol].isMine = true;
                            updateCellNeighborsInMove(r, c, newRow, newCol, localCells);
                        }
                    }
                }
            }
            setIsFirstPress(false);
            setCells(localCells);
        }
        let localCells = [...cells];
        if (!localCells[row][col].isMine) {
            revealAdjacentCells(row, col, localCells);
            setCells(localCells)
        } else if (localCells[row][col].isRevealed !== true) {
            localCells[row][col].isRevealed = true;
            setCells(localCells)
        }
    };

    function revealAdjacentCells(row: number, col: number, localCells: CellStateProps[][]) {
        if (row < 0 || row >= numRows || col < 0 || col >= numColumns || localCells[row][col].isRevealed) {
            return;
        }
        localCells[row][col].isRevealed = true;

        if (localCells[row][col].neighbors === 0) {
            for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, numRows - 1); r++) {
                for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, numColumns - 1); c++) {
                    if (!localCells[r][c].isRevealed && !localCells[r][c].isFlagged) {
                        revealAdjacentCells(r, c, localCells);
                    }
                }
            }
        }
    }

    const flagCell = (row: number, col: number) => {
        let localCells = [...cells];
        const newFlagState = !localCells[row][col].isFlagged
        localCells[row][col].isFlagged = newFlagState;
        updateFlagCount(newFlagState);
        setCells(localCells);
    }

    const updateFlagCount = (isFlagged: boolean) => {
        setFlagCount((prevFlagCount: number) => isFlagged ? prevFlagCount + 1 : prevFlagCount - 1);
    };

    function placeMines(localCells: CellStateProps[][]) {
        let MinesPlaced = 0;

        while (MinesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * numRows);
            const randomCol = Math.floor(Math.random() * numColumns);

            if (localCells[randomRow][randomCol].isMine === false) {
                localCells[randomRow][randomCol].isMine = true;
                adjustAdjacentCellNeighbors(randomRow, randomCol, 1, localCells)
                MinesPlaced++;
            }
        }

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const cell = localCells[row][col];
                if (cell.isMine && (
                    (cell.isCorner && cell.neighbors === 3) ||
                    (!cell.isCorner && cell.neighbors === 8))) {
                    const { newRow, newCol } = findNewMineLocation(localCells);
                    localCells[row][col].isMine = false;
                    localCells[newRow][newCol].isMine = true;
                    updateCellNeighborsInMove(row, col, newRow, newCol, localCells);
                }
            }
        }
    }

    function updateCellNeighborsInMove(oldRow: number, oldCol: number, newRow: number, newCol: number, localCells: CellStateProps[][]) {
        adjustAdjacentCellNeighbors(oldRow, oldCol, -1, localCells);
        adjustAdjacentCellNeighbors(newRow, newCol, 1, localCells);
    }

    function adjustAdjacentCellNeighbors(row: number, col: number, adjustment: number, localCells: CellStateProps[][]) {
        localCells[row][col].adjacentCells.forEach(({ row: adjRow, col: adjCol }) => {
            localCells[adjRow][adjCol].neighbors += adjustment;
        });
    }

    function findNewMineLocation(localCells: CellStateProps[][]) {
        let newRow, newCol, cell;
        do {
            newRow = Math.floor(Math.random() * numRows);
            newCol = Math.floor(Math.random() * numColumns);
            cell = localCells[newRow][newCol];
        } while (cell.isMine || (cell.isCorner && cell.neighbors === 3) || (!cell.isCorner && cell.neighbors === 8));
        return { newRow, newCol };
    }

    const onToggleFlagMode = () => {
        setIsFlagMode((currentFlagMode: boolean) => !currentFlagMode);
    };

    function initializeCells(): CellStateProps[][] {
        const initialCells: CellStateProps[][] = [];
        for (let row = 0; row < numRows; row++) {
            const currentRow = [];
            for (let col = 0; col < numColumns; col++) {
                const isCorner = (row === 0 || row === numRows - 1) && (col === 0 || col === numColumns - 1);
                const adjacentCells = getAdjacentCells(row, col);
                currentRow.push({
                    rowIndex: row,
                    columnIndex: col,
                    isRevealed: false,
                    isFlagged: false,
                    isMine: false,
                    isCorner: isCorner,
                    neighbors: 0,
                    adjacentCells: adjacentCells,
                });
            }
            initialCells.push(currentRow);
        }
        return initialCells;
    }

    function getAdjacentCells(row: number, col: number): { row: number, col: number }[] {
        const adjacentCells = [];
        for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, numRows - 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, numColumns - 1); c++) {
                if (r !== row || c !== col) {
                    adjacentCells.push({ row: r, col: c });
                }
            }
        }
        return adjacentCells;
    }

    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.gameContainer}>
                <View style={styles.interface}>
                    <Interface timer={timer} flagCount={flagCount} fontsLoaded={fontsLoaded} isFlagMode={isFlagMode} onResetGame={onResetGame} onToggleFlagMode={onToggleFlagMode} />
                </View>
                <View style={styles.grid}>
                    <Zoomable style={{ overflow: 'hidden', zIndex: 0 }} setPanOrPinchActive={setPanOrPinchActive}>
                        {gridLines}
                        {cells.map((row, rowIndex) => (
                            <View key={`row-${rowIndex}`} style={styles.gridRow}>
                                {row.map((cellState, colIndex) => (
                                    <Cell
                                        key={`${rowIndex}-${colIndex}`}
                                        onCellPress={(isLongPress) => onCellPress(rowIndex, colIndex, isLongPress)}
                                        fontsLoaded={fontsLoaded}
                                        {...cellState}
                                    />
                                ))}
                            </View>
                        ))}
                    </Zoomable>
                </View>
            </View>
        </NavigationProvider>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: '#7D7D7D',
        borderRightColor: '#7D7D7D',
        backgroundColor: '#BDBDBD',
    },
    interface: {
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        backgroundColor: '#BDBDBD',
        width: '100%',
        maxWidth: gridWidth,
        marginTop: gridMargin,
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        width: '100%',
        maxWidth: gridWidth,
        marginVertical: gridMargin,
    },
    gridLineX: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#7D7D7D',
    },
    gridLineY: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#7D7D7D',
    },
    gridRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});