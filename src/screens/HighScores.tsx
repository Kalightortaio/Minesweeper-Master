import { View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';

type HighScoreProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HighScores'>;
};

export default function HighScores({ navigation }:HighScoreProps) {
    return (
        <View>
            <Text>
                HighScores Screen Sample Text
            </Text>
        </View>
    )
}