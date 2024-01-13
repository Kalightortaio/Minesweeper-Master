import { View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';

type SettingsProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
};

export default function Settings({ navigation }: SettingsProps) {
    return (
        <View>
            <Text>
                Settings Screen Sample Text
            </Text>
        </View>
    )
}