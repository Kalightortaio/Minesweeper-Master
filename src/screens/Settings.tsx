import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { borderWidth, gridHeight, gridMargin, gridOuterWidth, interfaceOuterHeight, scaleText } from "../Constants";
import { NavigationProvider } from '../components/NavigationContext';

type SettingsProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
};

export default function Settings({ navigation }: SettingsProps) {
    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.SettingsContainer}>
                <View style={styles.interfaceContainer}>
                    <Text style={styles.titleText}>
                        Settings
                    </Text>
                </View>
                <View style={styles.gridContainer}>
                    
                </View>
            </View>
        </NavigationProvider>
    )
}

const styles = StyleSheet.create({
    SettingsContainer: {
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
    interfaceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        backgroundColor: '#BDBDBD',
        width: '100%',
        maxWidth: gridOuterWidth,
        marginTop: gridMargin,
        height: interfaceOuterHeight,
        maxHeight: '7%',
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: borderWidth,
        borderTopColor: '#7D7D7D',
        borderLeftColor: '#7D7D7D',
        borderBottomColor: '#fff',
        borderRightColor: '#fff',
        height: gridHeight,
        width: '100%',
        maxWidth: gridOuterWidth,
        marginVertical: gridMargin,
        maxHeight: '88%',
        overflow: 'hidden',
    },
    titleText: {
        fontFamily: 'MINESWEEPER',
        fontSize: scaleText(18),
    },
})