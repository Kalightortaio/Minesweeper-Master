import { Dimensions } from 'react-native';

export const numColumns = 16;
export const numRows = 30;
export const borderWidth = 3;
export const gridPadding = (Dimensions.get('window').width * 0.05);
export const cellSize = ((Dimensions.get('window').width - (2 * (gridPadding))) / numColumns);
