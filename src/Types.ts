export interface CellStateProps {
    rowIndex: number;
    columnIndex: number;
    isRevealed: boolean;
    isFlagged: boolean;
    isMine: boolean;
    isCorner: boolean;
    neighbors: number;
}
export type RootStackParamList = {
    MainMenu: undefined;
    ClassicMode: undefined;
    HighScores: undefined;
    ChallengeMode: undefined;
    Settings: undefined;
};