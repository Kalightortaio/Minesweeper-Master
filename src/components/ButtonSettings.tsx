import { TouchableWithoutFeedback, View} from "react-native";
import { borderWidth, interfaceComponentHeight } from "../Constants";
import { useNavigationContext } from './NavigationContext';
import { useSounds } from "./SoundContext";
import SVGLoader from "./SVGLoader";

function ButtonSettings() {
    const navigation = useNavigationContext();
    const { playSound } = useSounds();

    return (
        <TouchableWithoutFeedback onPress={() => {
            playSound('click');
            navigation.navigate('Settings');
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
                paddingTop: 1 + (interfaceComponentHeight / 12),
                paddingLeft: 1 + (interfaceComponentHeight / 12),
                paddingRight: (interfaceComponentHeight / 12),
                paddingBottom: (interfaceComponentHeight / 12),
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