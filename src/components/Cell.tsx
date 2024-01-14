import React from "react";
import { Text, Vibration, View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CellStateProps } from "../Types";
import { borderWidth, cellSize } from "../Constants";

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

    return (
        <GestureDetector gesture={Gesture.Exclusive(doubleTapGesture, tapGesture)}>
            <View style={[styles.cell, cellStateProps.isRevealed ? styles.isRevealed : {}]}>
                {fontsLoaded && !cellStateProps.isMine && (cellStateProps.neighbors != 0) && cellStateProps.isRevealed && <Text style={{
                    fontFamily: 'MINESWEEPER',
                }}>
                    {cellStateProps.neighbors}
                </Text>}
                {fontsLoaded && cellStateProps.isMine && cellStateProps.isRevealed && <Text style={{
                    fontFamily: 'MINESWEEPER',
                }}>
                    {'*'}
                </Text>}
                {cellStateProps.isFlagged && <Text>
                    🚩
                </Text>}
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
    },
})