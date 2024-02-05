import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { NavigationProvider } from '../components/NavigationContext';
type SplashProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SplashScreen'>;
};

export default function Splash({ navigation }: SplashProps) {
    return (
        <NavigationProvider navigation={navigation}>
            <View style={styles.splashContainer}>
            </View>
        </NavigationProvider>
    )
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center',
    }
})