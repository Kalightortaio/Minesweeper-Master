import React from 'react';
import { Dimensions } from 'react-native';

export const numColumns = 16;
export const numRows = 30;
export const difficulty = 2;
export const numMines = Math.floor(numColumns * numRows * difficulty * 0.06875);
export const borderWidth = 3;
export const screenWidth = Dimensions.get('window').width;
export const gridPadding = (screenWidth * 0.05);
export const cellSize = ((screenWidth - (2 * (gridPadding))) / numColumns);
export const gridWidth = ((2 * borderWidth) + (numColumns * cellSize));
export const interfaceMargin = (screenWidth - gridWidth) / 2;
export const boardWidth = numColumns * cellSize;
export const boardHeight = numRows * cellSize;
export const buttonLength = (2 * (cellSize - borderWidth)) - (screenWidth * 0.02);
export const FontsLoadedContext = React.createContext(false);