export type StyleKeys = 'container' | 'interface' | 'grid' | 'gridLineX' | 'gridLineY' | 'gridRow' | 'cell' | 'isRevealed' | 'isFlagged' | 'isMine';
export interface CellStateProps {
    rowIndex: number;
    columnIndex: number;
    isRevealed: boolean;
    isFlagged: boolean;
    isMine: boolean;
    isCorner: boolean;
    neighbors: number;
}