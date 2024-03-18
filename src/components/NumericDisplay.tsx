import { Text, View } from "react-native";
import { interfaceComponentHeight, interfacePadding, scaleText, screenWidth } from "../Constants";

interface NumericDisplayProps {
    value: number,
    shouldRender: boolean,
}

function NumericDisplay({ value, shouldRender }: NumericDisplayProps) {
    const formatNumber = (num: number): string => {
        return Math.max(0, Math.min(999, num)).toString().padStart(3, '0');
    };

    const formattedValue = formatNumber(value);
    const digits = formattedValue.split('');
    const opacityForDigit = (digit: string, index: number, encounteredNonZero: boolean, isZeroValue: boolean): number => {
        if (isZeroValue && index === digits.length - 1) return 1;
        if (encounteredNonZero) return 1;
        if (digit !== '0') return 1;
        return 0;
    };

    const isZeroValue = value === 0;
    let encounteredNonZero = false;

    return (
        <View style={{
            height: interfaceComponentHeight,
            maxHeight: interfaceComponentHeight,
            backgroundColor: 'black',
            justifyContent: 'center',
            paddingHorizontal: interfacePadding,
        }}
        >
            <View style={{ 
                justifyContent: 'center',
                alignItems: 'flex-end',
                flexDirection: 'row',
            }}>
                {shouldRender && digits.map((digit, index) => {
                    if (digit !== '0') encounteredNonZero = true;

                    return (
                        <Text key={index} style={{
                            fontFamily: 'DSEG',
                            color: '#FF0000',
                            fontSize: scaleText(24),
                            opacity: opacityForDigit(digit, index, encounteredNonZero, isZeroValue),
                        }}>
                            {digit}
                        </Text>
                    );
                })}
                {shouldRender && <Text numberOfLines={1} style={{
                    position: 'absolute',
                    fontFamily: 'DSEG',
                    color: '#FF0000',
                    fontSize: scaleText(24),
                    opacity: 0.5,
                    top: '50%',
                    right: 0,
                    transform: [{ translateY: -1 * scaleText(24) / 2 }],
                }}
                >
                    888
                </Text>}
            </View>
        </View>
    );
}

export default NumericDisplay;