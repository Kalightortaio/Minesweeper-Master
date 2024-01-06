import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Vibration } from "react-native";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
    cellSize: number;
    borderWidth: number,
}

function Cell({ rowIndex, columnIndex, cellSize, borderWidth }: CellProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    const computeStyle = (isRevealed: boolean, isFlagged: boolean) => {
        let style = styles.cell;
        if (isRevealed) {
            style = { ...style, ...styles.revealed };
        }
        if (isFlagged) {
            style = { ...style, ...styles.flagged };
        }
        return style;
    };

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
            activeOpacity: 1,
        },
        revealed: {
            borderWidth: 1,
            borderTopColor: '#7D7D7D',
            borderLeftColor: '#7D7D7D',
            borderBottomColor: 'transparent',
            borderRightColor: 'transparent',
        },
        flagged: {
            backgroundColor: 'red',
        }
    });

    return (
        <TouchableOpacity
            style={computeStyle(isRevealed, isFlagged)}
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