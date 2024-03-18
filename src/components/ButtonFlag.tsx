import { TouchableWithoutFeedback, View } from "react-native";
import { borderWidth, interfaceComponentHeight } from "../Constants";
import SVGLoader from "./SVGLoader";

interface ButtonFlagProps {
    isFlagMode: boolean,
    onToggleFlagMode: () => void;
}

function ButtonFlag({ isFlagMode, onToggleFlagMode }: ButtonFlagProps) {

    return (
        <TouchableWithoutFeedback onPress={onToggleFlagMode}>
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
                {isFlagMode && (
                    <SVGLoader
                        type="symbol"
                        name="flag"
                    />
                )}
                {!isFlagMode && (
                    <SVGLoader
                        type="symbol"
                        name="flag"
                        style={{
                            opacity: 0.5
                        }}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonFlag;