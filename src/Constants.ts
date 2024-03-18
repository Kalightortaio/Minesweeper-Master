import React from 'react';
import { Dimensions } from 'react-native';

export const numColumns = 16;
export const numRows = 30;
export const practiceMode = false;
export const difficulty = 2; // 1 - Easy, 2 - Normal, 3 - Hard, 6 - Expert, 8 - Challenger   
export const numMines = Math.min(Math.max(Math.floor(numColumns * numRows * difficulty * 0.06875), 1), (numColumns * numRows * 0.5));
export const numLives = 3;
export const borderWidth = 3;
export const screenWidth = Dimensions.get('window').width;
export const gridOuterWidth = Math.floor(screenWidth * 0.9);
export const gridInnerWidth = (gridOuterWidth - (2 * borderWidth));
export const gridMargin = ((screenWidth - gridOuterWidth) / 2);
export const cellSize = (gridInnerWidth / numColumns);
export const gridHeight = (gridOuterWidth * (numRows / numColumns));
export const interfaceInnerHeight = (2 * cellSize);
export const interfaceOuterHeight = (interfaceInnerHeight + (2 * borderWidth));
export const interfacePadding = (0.25 * cellSize);
export const interfaceComponentHeight = (1.5 * cellSize);
export const boardWidth = numColumns * cellSize;
export const boardHeight = numRows * cellSize;
export const FontsLoadedContext = React.createContext(false);
export const backgroundColor: string = "#BDBDBD";

export const scaleText = (fontSize: number): number => {
    const baseScreenWidth = 450;
    const scale = screenWidth / baseScreenWidth;
    
    return Math.round(fontSize * scale);
};
