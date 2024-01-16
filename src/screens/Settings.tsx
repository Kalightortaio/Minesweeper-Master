import { View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { NavigationProvider } from '../components/NavigationContext';

type SettingsProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
};

export default function Settings({ navigation }: SettingsProps) {
    return (
        <NavigationProvider navigation={navigation}>
            <View>
                <Text>
                    Settings Screen Sample Text
                </Text>
            </View>
        </NavigationProvider>
    )
}