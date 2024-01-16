import Svg, { Path, G, Rect } from "react-native-svg";

interface SVGLoaderProps {
    type: string;
    name: string;
    scale?: number;
    style?: object | Array<object>;
}

function SVGLoader({ type, name, scale = 1, style }: SVGLoaderProps) {
    const transform = `scale(${scale})`;

    function LoadSVG() {
        switch (type) {
            case 'number':
                switch (name) {
                    case '1':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M4.5,0 h2 v8 h2 v2 h-7 v-2 h2 v-4 h-2 v-1 h1 v-1 h1 v-1 h1 v-1"
                                    fill="blue"
                                />
                            </G>
                        );
                    case '2':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M1,0 h8 v1 h1 v3 h-1 v1 h-1 v1 h-2 v1 h-2 v1 h6 v2 h-10 v-3 h1 v-1 h2 v-1 h2 v-1 h2 v-2 h-4 v1 h-3 v-2 h1 v-1"
                                    fill="#008000"
                                />
                            </G>
                        );
                    case '3':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M0,0 h9 v1 h1 v3 h-1 v2 h1 v3 h-1 v1 h-9 v-2 h7 v-2 h-4 v-2 h4 v-2 h-7 v-2"
                                    fill="red"
                                />
                            </G>
                        );
                    case '4':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M2,0 h3 v2 h-1 v2 h2 v-4 h3 v4 h1 v2 h-1 v4 h-3 v-4 h-6 v-2 h1 v-2 h1 v-2"
                                    fill="#000080"
                                />
                            </G>
                        );
                    case '5':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M0,0 h10 v2 h-7 v2 h6 v1 h1 v4 h-1 v1 h-9 v-2 h7 v-2 h-7 v-6"
                                    fill="#800000"
                                />
                            </G>
                        );
                    case '6':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M1,0 h8 v2 h-6 v2 h6 v1 h1 v4 h-1 v1 h-8 v-1 h-1 v-8 h1 v-1"
                                    fill="#008080"
                                />
                                <Rect x="3" y="6" width="4" height="2" fill="black" />
                            </G>
                        );
                    case '7':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M0,0 h10 v4 h-1 v2 h-1 v2 h-1 v2 h-3 v-2 h1 v-2 h1 v-2 h1 v-2 h-7 v-2"
                                    fill="#000000"
                                />
                            </G>
                        );
                    case '8':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M1,0 h8  v1  h1  v3 h-1  v2  h1  v3 h-1  v1 h-8 v-1 h-1 v-3  h1 v-2 h-1 v-3  h1 v-1"
                                    fill="#808080"
                                />
                                <Rect x="3" y="2" width="4" height="2" fill="white" />
                                <Rect x="3" y="6" width="4" height="2" fill="white" />
                            </G>
                        );
                    default:
                        console.warn(`Unknown name '${name}' for type 'number'`);
                        return (
                            <G />
                        );
                }
            case 'symbol':
                switch(name) {
                    case 'flag':
                        return (
                            <G transform={transform}>
                                <Path
                                    d="M4,0 h2 v5 h-2 v-1 h-2 v-1 h-1 v-1 h1 v-1 h2 v-1"
                                    fill="red"
                                />
                                <Path
                                    d="M5,5 h1 v2 h1 v1 h2 v2 h-8 v-2 h2 v-1 h2 v-2"
                                    fill="black"
                                />
                            </G>
                        )
                    default:
                        console.warn(`Unknown name '${name}' for type 'symbol'`);
                        return (
                            <G />
                        );
                }
            default:
                console.warn(`Unknown type '${type}'`);
                return (
                    <G />
                );
        }
    }

    return (
        <Svg height="100%" width="100%" viewBox="0 0 10 10" style={style}>
            {LoadSVG()}
        </Svg>
    )
};

export default SVGLoader;