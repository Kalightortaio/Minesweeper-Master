import { TouchableWithoutFeedback, View, Text } from "react-native";
import { borderWidth, buttonLength } from "../Constants";
import { useNavigationContext } from '../NavigationContext';

function ButtonSettings() {
    const navigation = useNavigationContext();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
            <View style={{
                height: buttonLength,
                width: buttonLength,
                alignItems: 'center',
                borderWidth: borderWidth,
                borderTopColor: '#fff',
                borderLeftColor: '#fff',
                borderBottomColor: '#7D7D7D',
                borderRightColor: '#7D7D7D',
                backgroundColor: '#BDBDBD',
            }}>
                <Text>⚙️</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonSettings;