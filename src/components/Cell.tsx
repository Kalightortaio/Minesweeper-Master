import React from "react";
import { Text, Vibration, View } from "react-native";
import { computeStyle } from "../Styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CellStateProps } from "../Types";

interface CellComponentProps extends CellStateProps {
    isPanOrPinchActive: boolean,
    revealCell: () => void,
    flagCell: () => void,
}

function Cell({ isPanOrPinchActive, revealCell, flagCell, ...cellStateProps }: CellComponentProps) {

    const tapGesture = Gesture.Tap()
        .runOnJS(true)
        .onStart(() => {
            if (!isPanOrPinchActive) {
                if (!cellStateProps.isRevealed && !cellStateProps.isFlagged) {
                    revealCell();
                }
            }
        });

    const longPressGesture = Gesture.LongPress()
        .runOnJS(true)
        .minDuration(300)
        .onStart(() => {
            if (!isPanOrPinchActive) {
                if (!cellStateProps.isRevealed) {
                    flagCell();
                    Vibration.vibrate(80);
                }
            }
        });

    return (
        <GestureDetector gesture={Gesture.Exclusive(tapGesture, longPressGesture)}>
            <View style={computeStyle('cell', { isRevealed: cellStateProps.isRevealed, isFlagged: cellStateProps.isFlagged })}>
                {cellStateProps.isMine || (cellStateProps.neighbors == 0) || !cellStateProps.isRevealed || <Text>
                    {cellStateProps.neighbors}
                </Text>}
                {cellStateProps.isMine && cellStateProps.isRevealed && <Text>
                    X
                </Text>}
            </View>
        </GestureDetector>
    );
}

export default Cell;