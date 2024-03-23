import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProvider } from '../components/NavigationContext';
import { useSounds } from "../components/SoundContext";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from '../Types';
import { borderWidth, gridHeight, gridMargin, gridOuterWidth, interfaceOuterHeight, scaleText } from "../Constants";

type QuickPlayProps = {
    navigation: StackNavigationProp<RootStackParamList, 'QuickPlay'>;
    route: RouteProp<RootStackParamList, 'QuickPlay'>;
};

export default function QuickPlay({ route, navigation }: QuickPlayProps) {
    const { playSound } = useSounds();
    const { gameMode } = route.params;
    
    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.quickplayContainer}>
                <View style={styles.interfaceContainer}>
                    <Text style={styles.titleText}>
                        Game Options
                    </Text>
                </View>
                <View style={styles.gridContainer}>
                    <Text style={styles.optionText}>
                        Test123
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            playSound('click');
                            navigation.navigate(gameMode);
                        }}
                        style={styles.menuButtons}
                    >
                        <Text style={styles.titleText}>{gameMode}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </NavigationProvider>
    )
}

const styles = StyleSheet.create({
    quickplayContainer: {
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
    },
    titleText: {
        fontFamily: 'MINESWEEPER',
        fontSize: scaleText(18),
    },
    optionText: {
        fontFamily: 'Tahoma',
        fontSize: scaleText(18),
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