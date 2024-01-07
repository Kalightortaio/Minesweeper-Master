import { Text,View } from "react-native";
import { borderWidth, cellSize, screenWidth } from "../Constants";

interface NumericDisplayProps {
    value: number,
}

function NumericDisplay({ value }: NumericDisplayProps) {
    let display = formatNumber(value);
    return (
        <View style={{
            height: (2 * (cellSize - borderWidth)) - (screenWidth * 0.02),
            width: (screenWidth * 0.1475),
            padding: (screenWidth * 0.01),
            backgroundColor: 'black',
        }}
        >
            <View style={{ 
                flex: 1, 
                justifyContent: 'center',
                alignItems: 'flex-end',

            }}>
                <Text style={{
                    fontFamily: 'DSEG',
                    color: '#FF0000',
                    fontSize: (screenWidth * 0.05),
                }}
                >
                    {display}
                </Text>
                <Text style={{
                    position: 'absolute',
                    fontFamily: 'DSEG',
                    color: '#FF0000',
                    fontSize: (screenWidth * 0.05),
                    opacity: 0.5,
                    top: '50%',
                    right: 0,
                    transform: [{ translateY: -(screenWidth * 0.05) / 2 }],
                }}
                >
                    888
                </Text>
            </View>
        </View>
    );
}

export default NumericDisplay;

function formatNumber(num: number) {
    if (num < 1) {
        num = 0;
    }
    if (num > 999) {
    num = 999;
    }
    return num.toString().padStart(3, ' ');
}