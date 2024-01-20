export interface CellStateProps {
    rowIndex: number;
    columnIndex: number;
    isRevealed: boolean;
    isFlagged: boolean;
    isMine: boolean;
    isCorner: boolean;
    neighbors: number;
    adjacentCells: Array<{ row: number, col: number }>;
}
export type RootStackParamList = {
    SplashScreen: undefined;
    MainMenu: undefined;
    ClassicMode: undefined;
    HighScores: undefined;
    ChallengeMode: undefined;
    Settings: undefined;
};