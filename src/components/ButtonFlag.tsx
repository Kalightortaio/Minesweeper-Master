import { TouchableWithoutFeedback, View, Text } from "react-native";
import { borderWidth, buttonLength } from "../Constants";

interface ButtonFlagProps {
    isFlagMode: boolean,
    onToggleFlagMode: () => void;
}

function ButtonFlag({ isFlagMode, onToggleFlagMode }: ButtonFlagProps) {

    return (
        <TouchableWithoutFeedback onPress={onToggleFlagMode}>
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
                {!isFlagMode && <Text>🚩</Text>}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonFlag;