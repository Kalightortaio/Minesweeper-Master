import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { borderWidth, gridHeight, gridMargin, gridWidth, interfaceHeight } from "../Constants";
import { NavigationProvider } from '../components/NavigationContext';

type MainMenuProps = {
    navigation: StackNavigationProp<RootStackParamList, 'MainMenu'>;
};

export default function MainMenu({ navigation }: MainMenuProps) {
    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.menuContainer}>
                <View style={styles.interface}>
                    <Text style={styles.titleText}>
                        Minesweeper Master
                    </Text>
                </View>
                <View style={styles.grid}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ClassicMode')}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.titleText}>Classic Mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ChallengeMode')}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.titleText}>Eternity Mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ChallengeMode')}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.titleText}>Master Mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('HighScores')}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.titleText}>Achievements</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('HighScores')}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.titleText}>High Scores</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Settings')}
                            style={styles.menuButtons}
                        >
                            <Text style={styles.titleText}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </NavigationProvider>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: '#7D7D7D',
        borderRightColor: '#7D7D7D',
        backgroundColor: '#BDBDBD',
    },
    interface: {
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        backgroundColor: '#BDBDBD',
        alignItems: 'center',
        justifyContent: 'center',
        height: interfaceHeight,
        width: '100%',
        maxWidth: gridWidth,
        marginTop: gridMargin,
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        height: gridHeight,
        width: '100%',
        maxWidth: gridWidth,
        marginVertical: gridMargin,
    },
    titleText: {
        fontFamily: 'MINESWEEPER',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    menuButtons: {
        padding: 10,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: '#7D7D7D',
        borderRightColor: '#7D7D7D',
        borderWidth: borderWidth,
    },
})