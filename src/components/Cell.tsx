import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CellStateProps } from "../Types";
import { borderWidth, cellSize } from "../Constants";
import SVGLoader from "./SVGLoader";

interface CellComponentProps extends CellStateProps {
    onCellPress: (isLongPress: boolean) => void,
    fontsLoaded: boolean,
}

function Cell({ onCellPress, fontsLoaded, ...cellStateProps }: CellComponentProps) {

    let showCell = !cellStateProps.isMine && cellStateProps.isRevealed;
    let showMine = cellStateProps.isMine && cellStateProps.isRevealed;

    return (
        <TouchableWithoutFeedback onPress={() => onCellPress(false)} onLongPress={() => onCellPress(true)} delayLongPress={300}>
            <View style={[styles.cell, cellStateProps.isRevealed ? styles.isRevealed : {}, cellStateProps.isFlagged ? styles.isFlagged : {}, cellStateProps.isMine ? styles.isMine : {}, (cellStateProps.isRevealed && cellStateProps.isMine) ? styles.isRevealedMine : {}]}>
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
    isFlagged: {
        paddingTop: 1 + (cellSize / 12),
        paddingLeft: 1 + (cellSize / 12),
        paddingRight: (cellSize / 12),
        paddingBottom: (cellSize / 12),
    },
    isMine: {
        paddingTop: 1 + (cellSize / 12),
        paddingLeft: 1 + (cellSize / 12),
        paddingRight: (cellSize / 12),
        paddingBottom: (cellSize / 12),
    },
    isRevealedMine: {
        backgroundColor: 'red',
        zIndex: -1,
    }
})