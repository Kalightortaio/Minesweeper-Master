import { TouchableWithoutFeedback, View, Text } from "react-native";
import { borderWidth, buttonLength } from "../Constants";
import SVGLoader from "./SVGLoader";

interface ButtonResetProps {
    onResetGame: () => void;
}

function ButtonReset({ onResetGame }: ButtonResetProps) {

    return (
        <TouchableWithoutFeedback onPress={onResetGame}>
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
                padding: (buttonLength / 15),
            }}>
                <SVGLoader
                    type="symbol"
                    name="faceSmiling"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonReset;