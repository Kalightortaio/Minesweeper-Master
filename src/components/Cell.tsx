import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Vibration } from "react-native";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
    size: number;
}

function Cell({ rowIndex, columnIndex, size }: CellProps) {
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

    const styles = StyleSheet.create({
        cell: {
            height: size,
            width: size,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#B6B6B6',
        },
    });

    return (
        <TouchableOpacity
            style={styles.cell}
            onPress={handlePress}
            onLongPress={handleLongPress}
        >
            <Text>
                {isFlagged ? '!' : (isRevealed ? '0' : '')}
            </Text>
        </TouchableOpacity>
    )
}

export default Cell;