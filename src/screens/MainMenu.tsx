import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { borderWidth } from "../Constants";

type MainMenuProps = {
    navigation: StackNavigationProp<RootStackParamList, 'MainMenu'>;
};

export default function MainMenu({ navigation }: MainMenuProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ClassicMode')}
                style={styles.menuButtons}
            >
                <Text>Classic Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('HighScores')}
                style={styles.menuButtons}
            >
                <Text>Practice Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('HighScores')}
                style={styles.menuButtons}
            >
                <Text>Challenge Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('HighScores')}
                style={styles.menuButtons}
            >
                <Text>High Scores</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('HighScores')}
                style={styles.menuButtons}
            >
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    menuButtons: {
        padding: 10,
        borderColor: 'red',
        borderWidth: borderWidth,
    }
})