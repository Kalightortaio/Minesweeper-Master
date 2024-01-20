import { TouchableWithoutFeedback, View, Text } from "react-native";
import { borderWidth, buttonLength } from "../Constants";
import { useNavigationContext } from './NavigationContext';
import SVGLoader from "./SVGLoader";

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
                paddingTop: 1 + (buttonLength / 12),
                paddingLeft: 1 + (buttonLength / 12),
                paddingRight: (buttonLength / 12),
                paddingBottom: (buttonLength / 12),
            }}>
                <SVGLoader
                    type="symbol"
                    name="mine"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonSettings;