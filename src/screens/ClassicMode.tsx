import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProvider } from '../components/NavigationContext';
import { RootStackParamList } from '../Types';
import { CellStateProps } from '../Types';
import { FontsLoadedContext, borderWidth, cellSize, gridWidth, interfaceMargin, numColumns, numMines, numRows } from '../Constants';
import Zoomable from '../components/Zoomable';
import Interface from '../components/Interface';
import Cell from '../components/Cell';

type ClassicModeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ClassicMode'>;
}

export default function ClassicMode({ navigation }:ClassicModeProps) {
    const [isNewGame, setIsNewGame] = useState(true);
    const [cells, setCells] = useState<CellStateProps[][]>(initializeCells());
    const [isFirstPress, setIsFirstPress] = useState(true);
    const [timer, setTimer] = useState(0);
    const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isPanOrPinchActive, setPanOrPinchActive] = useState(false);
    const [flagCount, setFlagCount] = useState(0);
    const [isFlagMode, setIsFlagMode] = useState(false);
    const fontsLoaded = useContext(FontsLoadedContext);

    let localCells = cells;

    const triggerRender = () => {
        setCells(localCells);
    }

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
        localCells = cells;
    }

    useEffect(() => {
        if (isNewGame) {
            placeMines();
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numColumns; col++) {
                    updateCellNeighbor(row, col);
                }
            }
            adjustMinesPlacement();
            triggerRender();
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
            if (isFirstPress) {
                for (let r = row - 1; r <= row + 1; r++) {
                    for (let c = col - 1; c <= col + 1; c++) {
                        if (r >= 0 && r < numRows && c >= 0 && c < numColumns && localCells[r][c].isMine) {
                            const { newRow, newCol } = findNewMineLocation();
                            localCells[r][c].isMine = false;
                            localCells[newRow][newCol].isMine = true;
                        }
                    }
                }

                for (let r = row - 2; r <= row + 2; r++) {
                    for (let c = col - 2; c <= col + 2; c++) {
                        if ((r < row - 1 || r > row + 1 || c < col - 1 || c > col + 1) &&
                            r >= 0 && r < numRows && c >= 0 && c < numColumns &&
                            localCells[r][c].isMine && Math.random() < 0.3) {
                            const { newRow, newCol } = findNewMineLocation();
                            localCells[r][c].isMine = false;
                            localCells[newRow][newCol].isMine = true;
                        }
                    }
                }

                for (let r = 0; r < numRows; r++) {
                    for (let c = 0; c < numColumns; c++) {
                        updateCellNeighbor(r, c);
                    }
                }

                setIsFirstPress(false);
            }

            if (!localCells[row][col].isMine) {
                revealAdjacentCells(row, col);
            } else {
                localCells[row][col].isRevealed = true;
            }

        triggerRender();
    };

    function revealAdjacentCells(row: number, col: number) {
        if (row < 0 || row >= numRows || col < 0 || col >= numColumns || localCells[row][col].isRevealed) {
            return;
        }
        localCells[row][col].isRevealed = true;

        if (localCells[row][col].neighbors === 0) {
            for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, numRows - 1); r++) {
                for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, numColumns - 1); c++) {
                    if (!localCells[r][c].isRevealed && !localCells[r][c].isFlagged) {
                        revealAdjacentCells(r, c);
                    }
                }
            }
        }
    }

    const flagCell = (row: number, col: number) => {
        const newFlagState = !localCells[row][col].isFlagged
        localCells[row][col].isFlagged = newFlagState;
        updateFlagCount(newFlagState);
        triggerRender();
    }

    const updateFlagCount = (isFlagged: boolean) => {
        setFlagCount((prevFlagCount: number) => isFlagged ? prevFlagCount + 1 : prevFlagCount - 1);
    };

    function placeMines() {
        let MinesPlaced = 0;

        while (MinesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * numRows);
            const randomCol = Math.floor(Math.random() * numColumns);

            if (localCells[randomRow][randomCol].isMine === false) {
                localCells[randomRow][randomCol].isMine = true;
                MinesPlaced++;
            }
        }
    }

    function updateCellAndNeighbors(row: number, col: number) {
        updateCellNeighbor(row, col);

        localCells[row][col].adjacentCells.forEach(({ row: adjRow, col: adjCol }) => {
            updateCellNeighbor(adjRow, adjCol);
        });
    }

    function updateCellNeighbor(row: number, col: number) {
        const startRow = Math.max(0, row - 1);
        const endRow = Math.min(numRows - 1, row + 1);
        const startCol = Math.max(0, col - 1);
        const endCol = Math.min(numColumns - 1, col + 1);

        let mineCount = 0;
        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                if (r === row && c === col) continue;
                if (localCells[r][c].isMine) {
                    mineCount++;
                }
            }
        }
        localCells[row][col].neighbors = mineCount;
    }

    function adjustMinesPlacement() {
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const cell = localCells[row][col];
                if (cell.isMine && (
                    (cell.isCorner && cell.neighbors === 3) ||
                    (!cell.isCorner && cell.neighbors === 8))) {
                    const { newRow, newCol } = findNewMineLocation();
                    localCells[row][col].isMine = false;
                    updateCellAndNeighbors(row, col);
                    localCells[newRow][newCol].isMine = true;
                    updateCellAndNeighbors(newRow, newCol);
                }
            }
        }
    }

    function findNewMineLocation() {
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

    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.gameContainer}>
                <View style={styles.interface}>
                    <Interface timer={timer} flagCount={flagCount} fontsLoaded={fontsLoaded} isFlagMode={isFlagMode} onResetGame={onResetGame} onToggleFlagMode={onToggleFlagMode} />
                </View>
                <View style={styles.gridContainer}>
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
                                            fontsLoaded={fontsLoaded}
                                            {...cellState}
                                        />
                                    ))}
                                </View>
                            ))}
                        </Zoomable>
                    </View>
                </View>
            </View>
        </NavigationProvider>
    );
}

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

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: '#7D7D7D',
        borderRightColor: '#7D7D7D',
        backgroundColor: '#BDBDBD',
        justifyContent: 'flex-start',
    },
    interface: {
        height: (2 * cellSize),
        width: gridWidth,
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        backgroundColor: '#BDBDBD',
        marginTop: interfaceMargin,
    },
    gridContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        minHeight: (numRows * cellSize),
        minWidth: gridWidth,
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