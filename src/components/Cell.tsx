import React, { useState } from "react";
import { TouchableWithoutFeedback, Text, Vibration, View } from "react-native";
import { computeStyle } from "../Styles";

interface CellProps {
    rowIndex: number,
    columnIndex: number,
    onFirstPress: () => void,
}

function Cell({ rowIndex, columnIndex, onFirstPress }: CellProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    function handlePress() {
        if (!isRevealed && !isFlagged) {
            setIsRevealed(true);
            onFirstPress();
        }
        console.log('Cell pressed', rowIndex, columnIndex)
    }

    function handleLongPress() {
        if (!isRevealed) {
            setIsFlagged(!isFlagged);
            Vibration.vibrate(50);
            onFirstPress();
        }
        console.log('Cell long pressed', rowIndex, columnIndex)
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleLongPress}>
            <View style={computeStyle('cell', { isRevealed, isFlagged }) }>
                <Text>
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Cell;