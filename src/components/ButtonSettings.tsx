import { TouchableWithoutFeedback, View, Text } from "react-native";
import { borderWidth, buttonLength } from "../Constants";

interface ButtonSettingsProps {
    onSettingsModal: () => void;
}

function ButtonSettings({ onSettingsModal }: ButtonSettingsProps) {

    return (
        <TouchableWithoutFeedback onPress={onSettingsModal}>
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