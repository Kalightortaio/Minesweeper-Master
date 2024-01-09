import React, { useState } from "react";
import { Text, Vibration, View } from "react-native";
import { computeStyle } from "../Styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";


interface CellProps {
    rowIndex: number,
    columnIndex: number,
    onFirstPress: () => void,
    isPanOrPinchActive: boolean,
}

function Cell({ rowIndex, columnIndex, onFirstPress, isPanOrPinchActive }: CellProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    const tapGesture = Gesture.Tap()
        .runOnJS(true)
        .onStart(() => {
            if (!isPanOrPinchActive) {
                if (!isRevealed && !isFlagged) {
                    setIsRevealed(true);
                    onFirstPress();
                    console.log('Cell pressed', rowIndex, columnIndex);
                }
            }
        });

    const longPressGesture = Gesture.LongPress()
        .runOnJS(true)
        .minDuration(200)
        .onStart(() => {
            if (!isPanOrPinchActive) {
                if (!isRevealed) {
                    setIsFlagged(!isFlagged);
                    onFirstPress();
                    Vibration.vibrate(80);
                    console.log('Cell long pressed', rowIndex, columnIndex);
                }
            }
        });

    return (
        <GestureDetector gesture={Gesture.Exclusive(tapGesture, longPressGesture)}>
            <View style={computeStyle('cell', { isRevealed, isFlagged })}>
                <Text>
                    {/* Cell content */}
                </Text>
            </View>
        </GestureDetector>
    );
}

export default Cell;