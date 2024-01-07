import { Dimensions } from 'react-native';

export const numColumns = 16;
export const numRows = 30;
export const borderWidth = 3;
export const screenWidth = Dimensions.get('window').width;
export const gridPadding = (screenWidth * 0.05);
export const cellSize = ((screenWidth - (2 * (gridPadding))) / numColumns);
