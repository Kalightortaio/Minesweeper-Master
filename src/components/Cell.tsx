import React from "react";
import { Text, Vibration, View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CellStateProps } from "../Types";
import { borderWidth, cellSize } from "../Constants";
import SVGLoader from "./SVGLoader";

interface CellComponentProps extends CellStateProps {
    isPanOrPinchActive: boolean,
    isFlagMode: boolean,
    fontsLoaded: boolean,
    revealCell: () => void,
    flagCell: () => void,
}

function Cell({ isPanOrPinchActive, isFlagMode, fontsLoaded, revealCell, flagCell, ...cellStateProps }: CellComponentProps) {

    const tapGesture = React.useMemo(
        () =>
        Gesture.Tap()
        .runOnJS(true)
        .onStart(() => {
            if (!isPanOrPinchActive) {
                if (isFlagMode) {
                    if (!cellStateProps.isRevealed) {
                        flagCell();
                        Vibration.vibrate(100);
                    }
                } else {
                    if (!cellStateProps.isRevealed && !cellStateProps.isFlagged) {
                        revealCell();
                    }
                }
            }
        }),
        [isPanOrPinchActive, cellStateProps, isFlagMode, flagCell, revealCell]  
    );

    const doubleTapGesture = React.useMemo(
        () =>
            Gesture.Tap()
                .runOnJS(true)
                .maxDelay(200)
                .numberOfTaps(2)
                .onStart(() => {
                    if (!isPanOrPinchActive) {
                        if (isFlagMode) {
                            if (!cellStateProps.isRevealed && !cellStateProps.isFlagged) {
                                revealCell();
                            }
                        } else {
                            if (!cellStateProps.isRevealed) {
                                flagCell();
                                Vibration.vibrate(100);
                            }
                        }
                    }
                }),
        [isPanOrPinchActive, cellStateProps, isFlagMode, flagCell, revealCell] 
    );

    let showCell = !cellStateProps.isMine && cellStateProps.isRevealed;
    let showMine = cellStateProps.isMine && cellStateProps.isRevealed;

    return (
        <GestureDetector gesture={Gesture.Exclusive(doubleTapGesture, tapGesture)}>
            <View style={[styles.cell, cellStateProps.isRevealed ? styles.isRevealed : {}, cellStateProps.isFlagged ? styles.isFlagged : {}]}>
                {showCell && (cellStateProps.neighbors != 0) && (
                    <SVGLoader
                        type="number"
                        name={cellStateProps.neighbors.toString()}
                    />
                )}
                {showMine && <Text>
                    {'*'}
                </Text>}
                {cellStateProps.isFlagged && (
                    <SVGLoader
                        type="symbol"
                        name="flag"
                    />
                )}
            </View>
        </GestureDetector>
    );
}

export default Cell;

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
    }
})