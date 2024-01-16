import { View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { NavigationProvider } from '../components/NavigationContext';

type HighScoreProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HighScores'>;
};

export default function HighScores({ navigation }:HighScoreProps) {
    return (
        <NavigationProvider navigation={navigation}>
            <View>
                <Text>
                    HighScores Screen Sample Text
                </Text>
            </View>
        </NavigationProvider>
    )
}