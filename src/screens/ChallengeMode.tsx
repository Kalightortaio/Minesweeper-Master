import { View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';

type ChallengeModeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ChallengeMode'>;
};

export default function ChallengeMode({ navigation }:ChallengeModeProps) {
    return (
        <View>
            <Text>
                ChallengeMode Screen Sample Text
            </Text>
        </View>
    )
}