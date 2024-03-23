import { TouchableWithoutFeedback, View } from "react-native";
import { borderWidth, interfaceComponentHeight } from "../Constants";
import { useSounds } from "./SoundContext";
import SVGLoader from "./SVGLoader";

interface ButtonResetProps {
    onResetGame: () => void;
    faceState: string
}

function ButtonReset({ onResetGame, faceState }: ButtonResetProps) {
    const { playSound } = useSounds();

    return (
        <TouchableWithoutFeedback onPress={() => {
            playSound('click');
            onResetGame();
        }}>
            <View style={{
                height: interfaceComponentHeight,
                width: interfaceComponentHeight,
                alignItems: 'center',
                borderWidth: borderWidth,
                borderTopColor: '#fff',
                borderLeftColor: '#fff',
                borderBottomColor: '#7D7D7D',
                borderRightColor: '#7D7D7D',
                backgroundColor: '#BDBDBD',
                padding: (interfaceComponentHeight / 15),
            }}>
                <SVGLoader
                    type="symbol"
                    name={faceState}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonReset;