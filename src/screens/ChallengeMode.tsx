import { View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { NavigationProvider } from '../NavigationContext';

type ChallengeModeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ChallengeMode'>;
};

export default function ChallengeMode({ navigation }:ChallengeModeProps) {
    return (
        <NavigationProvider navigation={navigation}>
            <View>
                <Text>
                    ChallengeMode Screen Sample Text
                </Text>
            </View>
        </NavigationProvider>
    )
}