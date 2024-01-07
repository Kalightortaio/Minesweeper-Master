import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { cellSize, borderWidth, numColumns } from './Constants';
import { StyleKeys } from './Types';

type StylesType = {
    [key in StyleKeys]: ViewStyle | TextStyle | ImageStyle;
};

export const styles: StylesType = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: '#7D7D7D',
        borderRightColor: '#7D7D7D',
        backgroundColor: '#BDBDBD',
        justifyContent: 'space-evenly',
    },
    interface: {
        height: (2 * cellSize),
        width: ((2 * borderWidth) + (numColumns * cellSize)),
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        backgroundColor: '#BDBDBD',
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
    },
    gridRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
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
    isFlagged: {
        backgroundColor: 'red',
    }
});

export const computeStyle = (baseStyle: StyleKeys, states: { [key: string]: boolean }) => {
    if (!styles[baseStyle]) {
        console.warn(`Base style '${baseStyle}' not found.`);
        return {};
    }
    let style = styles[baseStyle];
    Object.keys(states).forEach(stateKey => {
        if (states[stateKey]) {
            if (!styles[stateKey as StyleKeys]) {
                console.warn(`Style for state '${stateKey}' not found.`);
            } else {
                style = { ...style, ...styles[stateKey as StyleKeys] };
            }
        }
    });
    return style;
};
