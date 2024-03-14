import React from 'react';
import { Dimensions } from 'react-native';

export const numColumns = 16;
export const numRows = 30;
export const difficulty = 3;
export const numMines = Math.floor(numColumns * numRows * difficulty * 0.06875);
export const borderWidth = 3;
export const screenWidth = Dimensions.get('window').width;
export const gridWidth = Math.floor(screenWidth * 0.9);
export const gridMargin = ((screenWidth - gridWidth) / 2);
export const cellSize = ((gridWidth - (2 * borderWidth)) / numColumns);
export const gridHeight = (gridWidth * (30 / 16));
export const interfaceHeight = (2 * (cellSize - borderWidth));
export const boardWidth = numColumns * cellSize;
export const boardHeight = numRows * cellSize;
export const buttonLength = (2 * (cellSize - borderWidth)) - (screenWidth * 0.02);
export const FontsLoadedContext = React.createContext(false);