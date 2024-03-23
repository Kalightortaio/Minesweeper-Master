import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProvider } from '../components/NavigationContext';
import { useTimerControls } from '../components/TimerControlContext';
import { TimerValueProvider } from '../components/TimerValueContext';
import { useSounds } from '../components/SoundContext';
import { CellStateProps, RootStackParamList } from '../Types';
import { borderWidth, cellSize, gridMargin, gridOuterWidth, interfaceOuterHeight, numColumns, numLives, numMines, numRows, practiceMode } from '../Constants';
import Zoomable from '../components/Zoomable';
import Interface from '../components/Interface';
import Cell from '../components/Cell';
import { throttle } from 'lodash';

type ClassicModeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Classic Mode'>;
}

export default function ClassicMode({ navigation }:ClassicModeProps) {
    const [isNewGame, setIsNewGame] = useState(true);
    const [cells, setCells] = useState<CellStateProps[][]>(initializeCells());
    const [mineLocations, setMineLocations] = useState<{row:number,col:number}[]>([]);
    const [isPanOrPinchActive, setPanOrPinchActive] = useState(false);
    const [flagCount, setFlagCount] = useState(0);
    const [isFlagMode, setIsFlagMode] = useState(false);
    const [isLostGame, setIsLostGame] = useState(false);
    const [livesLeft, setLivesLeft] = useState(initializeLives());
    const [faceState, setFaceState] = useState<"faceSmiling"|"faceChilling"|"faceFrowning">("faceSmiling");
    const { startTimer, pauseTimer, resetTimer, isTimerActive } = useTimerControls();
    const { playSound } = useSounds();

    function initializeLives(): number {
        if (practiceMode) {
            return numLives;
        } else {
            return 1;
        }
    }

    function onResetGame() {
        setIsNewGame(true);
        resetTimer();
        setFlagCount(0);
        setIsLostGame(false);
        setFaceState("faceSmiling");
        setLivesLeft(initializeLives());
        setMineLocations([]);
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
        if (isTimerActive) {
            if (mineLocations.length === 0 && flagCount === numMines) {
                processWinCon();
            }
        }
    }, [mineLocations, flagCount]);

    useEffect(() => {
        if (livesLeft === 0) {
            processLoseCon();
        }
    }, [livesLeft]);

    const processLoseCon = () => {
        pauseTimer();
        setFaceState("faceFrowning");
        setIsLostGame(true);
        mineLocations.forEach(({ row, col }) => {
            revealLostGame(row, col);
        });
    }

    const processWinCon = () => {
        pauseTimer();
        setFaceState("faceChilling");
    }

    const onCellPress = throttle((row: number, col: number, long: boolean ) => {
        if (!isPanOrPinchActive) {
            playSound('click');
            let localCells = [...cells];
            if (!long) {
                if (isFlagMode) {
                    if (!localCells[row][col].isRevealed && isTimerActive) {
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
                        Vibration.vibrate(30);
                        revealCell(row, col);
                    } else if (localCells[row][col].isRevealed && localCells[row][col].neighbors !== 0 && !localCells[row][col].isFlagged) {
                        Vibration.vibrate(30);
                        revealAdjacentCells(row, col, localCells);
                    }
                } else {
                    if (!localCells[row][col].isRevealed && isTimerActive) {
                        Vibration.vibrate(30);
                        flagCell(row, col);
                    } else if (localCells[row][col].isRevealed && localCells[row][col].neighbors !== 0 && isTimerActive) {
                        Vibration.vibrate(30);
                        revealAdjacentCells(row, col, localCells);
                    }
                }
            }
        }
    }, 10, {'leading': true,'trailing': false})

    const revealCell = (row: number, col: number) => {
        if (!isTimerActive) {
            let localCells = [...cells];
            for (let r = row - 2; r <= row + 2; r++) {
                for (let c = col - 2; c <= col + 2; c++) {
                    if (r >= 0 && r < numRows && c >= 0 && c < numColumns) {
                        const isInImmediateRadius = r >= row - 1 && r <= row + 1 && c >= col - 1 && c <= col + 1;
                        const shouldRemoveMine = isInImmediateRadius || (!isInImmediateRadius && Math.random() < 0.3);
                        if (localCells[r][c].isMine && shouldRemoveMine) {
                            const { newRow, newCol } = findNewMineLocation(localCells);
                            localCells[r][c].isMine = false;
                            updateMineLocation(r, c, "remove");
                            localCells[newRow][newCol].isMine = true;
                            updateMineLocation(newRow, newCol, "add");
                            updateCellNeighborsInMove(r, c, newRow, newCol, localCells);
                        }
                    }
                }
            }
            startTimer();
            setCells(localCells);
        }
        let localCells = [...cells];
        if (localCells[row][col].isRevealed) return;
        if (!localCells[row][col].isMine) {
            revealRecursiveCells(row, col, localCells);
        } else if (localCells[row][col].isMine) {
            localCells[row][col].isRevealed = true;
            localCells[row][col].isTriggeredMine = true;
            setLivesLeft(livesLeft - 1);
        }
        setCells(localCells);
    };

    function revealRecursiveCells(row: number, col: number, localCells: CellStateProps[][]) {
        if (row < 0 || row >= numRows || col < 0 || col >= numColumns || localCells[row][col].isRevealed) {
            return;
        }
        localCells[row][col].isRevealed = true;

        if (localCells[row][col].neighbors === 0 && !localCells[row][col].isMine) {
            localCells[row][col].adjacentCells.forEach(({ row: adjRow, col: adjCol }) => {
                if (!localCells[adjRow][adjCol].isRevealed && !localCells[adjRow][adjCol].isFlagged) {
                    revealRecursiveCells(adjRow, adjCol, localCells);
                }
            })
        }
    }

    function revealAdjacentCells(row: number, col: number, localCells: CellStateProps[][]) {
        localCells[row][col].adjacentCells.forEach(({ row: adjRow, col: adjCol }) => {
            if (localCells[adjRow][adjCol].isRevealed || localCells[adjRow][adjCol].isFlagged) return;
            if (!localCells[adjRow][adjCol].isMine) {
                localCells[adjRow][adjCol].isRevealed = true;
            } else if (localCells[adjRow][adjCol].isMine) {
                localCells[adjRow][adjCol].isRevealed = true;
                localCells[adjRow][adjCol].isTriggeredMine = true;
                setLivesLeft(livesLeft - 1)
            }
        });
        setCells(localCells);
    }

    const revealLostGame = (row: number, col: number) => {
        let localCells = [...cells];
        if (!localCells[row][col].isMine) {
            console.error("Invalid Mine Location in Array: " + row + "," + col + ".")
        } else if (!localCells[row][col].isRevealed) {
            localCells[row][col].isRevealed = true;
            setCells(localCells);
        }
    };

    const flagCell = (row: number, col: number) => {
        let localCells = [...cells];
        const newFlagState = !localCells[row][col].isFlagged
        localCells[row][col].isFlagged = newFlagState;
        updateFlagCount(newFlagState);
        if (localCells[row][col].isFlagged && localCells[row][col].isMine) {
            updateMineLocation(row, col, "remove");
        } else if (!localCells[row][col].isFlagged && localCells[row][col].isMine) {
            updateMineLocation(row, col, "add");
        }
        setCells(localCells);
        
    }

    const updateFlagCount = (isFlagged: boolean) => {
        setFlagCount((prevFlagCount: number) => isFlagged ? prevFlagCount + 1 : prevFlagCount - 1);
    };

    const updateMineLocation = (row: number, col: number, mode: "add" | "remove") => {
        if (mode === "add") {
            setMineLocations(prevLocations => [...prevLocations, { row, col }]);
        } else {
            setMineLocations(prevLocations => prevLocations.filter(mine => !(mine.row === row && mine.col === col)));
        }
    }

    function placeMines(localCells: CellStateProps[][]) {
        let MinesPlaced = 0;

        while (MinesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * numRows);
            const randomCol = Math.floor(Math.random() * numColumns);

            if (localCells[randomRow][randomCol].isMine === false) {
                localCells[randomRow][randomCol].isMine = true;
                updateMineLocation(randomRow, randomCol, "add");
                adjustAdjacentCellNeighbors(randomRow, randomCol, 1, localCells)
                MinesPlaced++;
            }
        }

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                let cell = localCells[row][col];
                while (cell.isMine && (
                    (cell.neighbors === 8) ||
                    (cell.isCorner && cell.neighbors === 3) ||
                    (cell.isEdge && cell.neighbors === 5))) {
                    const { newRow, newCol } = findNewMineLocation(localCells);
                    localCells[row][col].isMine = false;
                    updateMineLocation(row, col, "remove");
                    localCells[newRow][newCol].isMine = true;
                    updateMineLocation(newRow, newCol, "add");
                    updateCellNeighborsInMove(row, col, newRow, newCol, localCells);
                    cell = localCells[newRow][newCol];
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
        } while (cell.isMine || (cell.neighbors === 8) || (cell.isCorner && cell.neighbors === 3) || (!cell.isEdge && cell.neighbors === 5));
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
                const isEdge = (row === 0 || row === numRows - 1) || (col === 0 || col === numColumns - 1);
                const adjacentCells = getAdjacentCells(row, col);
                currentRow.push({
                    rowIndex: row,
                    columnIndex: col,
                    isRevealed: false,
                    isFlagged: false,
                    isMine: false,
                    isTriggeredMine: false,
                    isCorner: isCorner,
                    isEdge: isEdge,
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

    const gridLines = [];
    for (let i = 1; i < numRows; i++) {
        gridLines.push(
            <View
                key={`horizontal-line-${i}`}
                style={[styles.gridLineX, { top: (i * cellSize) }]}
            />
        );
    }
    for (let j = 1; j < numColumns; j++) {
        gridLines.push(
            <View
                key={`vertical-line-${j}`}
                style={[styles.gridLineY, { left: (j * cellSize) }]}
            />
        );
    }

    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.gameContainer}>
                <View style={styles.interfaceContainer}>
                    <TimerValueProvider>
                        <Interface flagCount={flagCount} isFlagMode={isFlagMode} faceState={faceState} onResetGame={onResetGame} onToggleFlagMode={onToggleFlagMode} />
                    </TimerValueProvider>
                </View>
                <View style={styles.gridContainer}>
                    <Zoomable style={{ overflow: 'hidden', zIndex: 0 }} setPanOrPinchActive={setPanOrPinchActive}>
                        {gridLines}
                        {cells.map((row, rowIndex) => (
                            <View key={`row-${rowIndex}`} style={styles.gridRow}>
                                {row.map((cellState, colIndex) => (
                                    <Cell
                                        key={`${rowIndex}-${colIndex}`}
                                        onCellPress={(isLongPress) => onCellPress(rowIndex, colIndex, isLongPress)}
                                        lostGame = {isLostGame}
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
    interfaceContainer: {
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        width: '100%',
        maxWidth: gridOuterWidth,
        marginTop: gridMargin,
        height: interfaceOuterHeight,
        maxHeight: interfaceOuterHeight,
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        width: '100%',
        maxWidth: gridOuterWidth,
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