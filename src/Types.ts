export interface CellStateProps {
    rowIndex: number;
    columnIndex: number;
    isRevealed: boolean;
    isFlagged: boolean;
    isMine: boolean;
    isTriggeredMine: boolean;
    isCorner: boolean;
    isEdge: boolean;
    neighbors: number;
    adjacentCells: Array<{row: number, col: number}>;
}
export type RootStackParamList = {
    MainMenu: undefined;
    QuickPlay: {
        gameMode: 'Classic Mode'|'Eternity Mode'|'Master Mode';
    }
    'Classic Mode': undefined;
    'Eternity Mode': undefined;
    'Master Mode': undefined;
    Achievements: undefined;
    'High Scores': undefined;
    Settings: undefined;
};