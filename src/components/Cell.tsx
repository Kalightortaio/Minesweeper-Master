import React, { useState } from "react";
import { TouchableWithoutFeedback, Text, Vibration, View } from "react-native";
import { computeStyle } from "../Styles";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
}

function Cell({ rowIndex, columnIndex }: CellProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    function handlePress() {
        if (!isRevealed && !isFlagged) {
            setIsRevealed(true);
        }
        console.log('Cell pressed', rowIndex, columnIndex)
    }

    function handleLongPress() {
        if (!isRevealed) {
            setIsFlagged(!isFlagged);
            Vibration.vibrate(50);
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