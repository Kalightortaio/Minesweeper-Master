import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CellStateProps } from "../Types";
import { borderWidth, cellSize } from "../Constants";
import SVGLoader from "./SVGLoader";

interface CellComponentProps extends CellStateProps {
    onCellPress: (isLongPress: boolean) => void,
    lostGame: boolean,
}

function Cell({ onCellPress, lostGame, ...cellStateProps }: CellComponentProps) {

    let showCell = !cellStateProps.isMine && cellStateProps.isRevealed;
    let showMine = cellStateProps.isMine && cellStateProps.isRevealed;
    let showTriggeredMine = cellStateProps.isMine && cellStateProps.isRevealed && cellStateProps.isTriggeredMine;
    let showUntriggeredMine = lostGame && cellStateProps.isMine && cellStateProps.isRevealed && !cellStateProps.isTriggeredMine;

    return (
        <TouchableWithoutFeedback 
            onPress={!lostGame ? () => onCellPress(false) : undefined}
            onLongPress={!lostGame ? () => onCellPress(true) : undefined} 
            delayLongPress={200}>
            <View style={[styles.cell, cellStateProps.isRevealed ? styles.isRevealed : {}, (cellStateProps.isFlagged || cellStateProps.isMine) ? styles.isSymbol : {}, showTriggeredMine ? styles.isTriggeredMine : {}, showUntriggeredMine ? styles.isLostGame : {}]}>
                {showCell && (cellStateProps.neighbors != 0) && (
                    <SVGLoader
                        type="number"
                        name={cellStateProps.neighbors.toString()}
                    />
                )}
                {showMine && (
                    <SVGLoader
                        type="symbol"
                        name="mine"
                    />
                )}
                {cellStateProps.isFlagged && (
                    <SVGLoader
                        type="symbol"
                        name="flag"
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

export default React.memo(Cell);

const styles = StyleSheet.create({
    cell: {
        height: cellSize,
        width: cellSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: '#7D7D7D',
        borderRightColor: '#7D7D7D',
        backgroundColor: '#BDBDBD',
    },
    isRevealed: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingTop: 1 + (cellSize / 6),
        paddingLeft: 1 + (cellSize / 6),
        paddingRight: (cellSize / 6),
        paddingBottom: (cellSize / 6),
    },
    isSymbol: {
        paddingTop: 1 + (cellSize / 12),
        paddingLeft: 1 + (cellSize / 12),
        paddingRight: (cellSize / 12),
        paddingBottom: (cellSize / 12),
    },
    isTriggeredMine: {
        backgroundColor: 'red',
        zIndex: -1,
    },
    isRevealedMine: {
        backgroundColor: 'red',
        zIndex: -1,
    },
    isLostGame: {
        backgroundColor: 'transparent',
        zIndex: -1,
    }
})