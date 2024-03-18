import Svg, { Path, G, Rect } from "react-native-svg";
import { backgroundColor } from "../Constants";

interface SVGLoaderProps {
    type: string;
    name: string;
    style?: object | Array<object>;
}

function SVGLoader({ type, name, style }: SVGLoaderProps) {
    const getViewBox = () => {
        switch (type) {
            case 'number':
                return "0 0 10 10";
            case 'symbol':
                switch (name) {
                    case 'faceSmiling':
                    case 'faceChilling':
                    case 'faceFrowning':
                        return "0 0 17 17";
                    case 'mine':
                        return "0 0 13 13";
                    default:
                        return "0 0 10 10";
                }
            default:
                return "0 0 10 10";
        }
    };

    let viewBox = getViewBox();

    function LoadSVG() {
        switch (type) {
            case 'number':
                switch (name) {
                    case '1':
                        return (
                            <G>
                                <Path
                                    d="M4.5,0 h2 v8 h2 v2 h-7 v-2 h2 v-4 h-2 v-1 h1 v-1 h1 v-1 h1 v-1"
                                    fill="blue"
                                />
                            </G>
                        );
                    case '2':
                        return (
                            <G>
                                <Path
                                    d="M1,0 h8 v1 h1 v3 h-1 v1 h-1 v1 h-2 v1 h-2 v1 h6 v2 h-10 v-3 h1 v-1 h2 v-1 h2 v-1 h2 v-2 h-4 v1 h-3 v-2 h1 v-1"
                                    fill="#008000"
                                />
                            </G>
                        );
                    case '3':
                        return (
                            <G>
                                <Path
                                    d="M0,0 h9 v1 h1 v3 h-1 v2 h1 v3 h-1 v1 h-9 v-2 h7 v-2 h-4 v-2 h4 v-2 h-7 v-2"
                                    fill="red"
                                />
                            </G>
                        );
                    case '4':
                        return (
                            <G>
                                <Path
                                    d="M2,0 h3 v2 h-1 v2 h2 v-4 h3 v4 h1 v2 h-1 v4 h-3 v-4 h-6 v-2 h1 v-2 h1 v-2"
                                    fill="#000080"
                                />
                            </G>
                        );
                    case '5':
                        return (
                            <G>
                                <Path
                                    d="M0,0 h10 v2 h-7 v2 h6 v1 h1 v4 h-1 v1 h-9 v-2 h7 v-2 h-7 v-6"
                                    fill="#800000"
                                />
                            </G>
                        );
                    case '6':
                        return (
                            <G>
                                <Path
                                    d="M1,0 h8 v2 h-6 v2 h6 v1 h1 v4 h-1 v1 h-8 v-1 h-1 v-8 h1 v-1"
                                    fill="#008080"
                                />
                                <Rect x="3" y="6" width="4" height="2" fill={backgroundColor} />
                            </G>
                        );
                    case '7':
                        return (
                            <G>
                                <Path
                                    d="M0,0 h10 v4 h-1 v2 h-1 v2 h-1 v2 h-3 v-2 h1 v-2 h1 v-2 h1 v-2 h-7 v-2"
                                    fill="#000000"
                                />
                            </G>
                        );
                    case '8':
                        return (
                            <G>
                                <Path
                                    d="M1,0 h8  v1  h1  v3 h-1  v2  h1  v3 h-1  v1 h-8 v-1 h-1 v-3  h1 v-2 h-1 v-3  h1 v-1"
                                    fill="#808080"
                                />
                                <Rect x="3" y="2" width="4" height="2" fill={backgroundColor} />
                                <Rect x="3" y="6" width="4" height="2" fill={backgroundColor} />
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
                            <G>
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
                    case 'mine':
                        return (
                            <G>
                                <Path
                                    d="M6,0 h1 v2 h2 v1 h1 v1 h1 v2 h2 v1 h-2 v2 h-1 v1 h-1 v1 h-2 v2 h-1 v-2 h-2 v-1 h-1 v-1 h-1 v-2 h-2 v-1 h2 v-2 h1 v-1 h1 v-1 h2 v-2"
                                    fill="black"
                                />
                                <Rect x="4" y="4" width="2" height="2" fill="white" />
                                <Rect x="2" y="2" width="1" height="1" fill="black" />
                                <Rect x="10" y="2" width="1" height="1" fill="black" />
                                <Rect x="2" y="10" width="1" height="1" fill="black" />
                                <Rect x="10" y="10" width="1" height="1" fill="black" />
                            </G>
                        )
                    case 'faceSmiling':
                        return (
                            <G>
                                <Path
                                    d="M6,0 h5 v1 h2 v1 h1 v1 h1 v1 h1 v2 h1 v5 h-1 v2 h-1 v1 h-1 v1 h-1 v1 h-2 v1 h-5 v-1 h-2 v-1 h-1 v-1 h-1 v-1 h-1 v-2 h-1 v-5 h1 v-2 h1 v-1 h1 v-1 h1 v-1 h2 v-1"
                                    fill="black"
                                />
                                <Path
                                    d="M6,1 h5 v1 h2 v1 h1 v1 h1 v2 h1 v5 h-1 v2 h-1 v1 h-1 v1 h-2 v1 h-5 v-1 h-2 v-1 h-1 v-1 h-1 v-2 h-1 v-5 h1 v-2 h1 v-1 h1 v-1 h2 v-1"
                                    fill="yellow"
                                />
                                <Rect x="5" y="6" width="2" height="2" fill="black" />
                                <Rect x="10" y="6" width="2" height="2" fill="black" />
                                <Path
                                    d="M4,10 h1 v1 h1 v1 h5 v-1 h1 v-1 h1 v1 h-1 v1 h-1 v1 h-5 v-1 h-1 v-1 h-1 v-1"
                                    fill="black"
                                />
                            </G>
                        )
                    case 'faceFrowning':
                        return (
                            <G>
                                <Path
                                    d="M6,0 h5 v1 h2 v1 h1 v1 h1 v1 h1 v2 h1 v5 h-1 v2 h-1 v1 h-1 v1 h-1 v1 h-2 v1 h-5 v-1 h-2 v-1 h-1 v-1 h-1 v-1 h-1 v-2 h-1 v-5 h1 v-2 h1 v-1 h1 v-1 h1 v-1 h2 v-1"
                                    fill="black"
                                />
                                <Path
                                    d="M6,1 h5 v1 h2 v1 h1 v1 h1 v2 h1 v5 h-1 v2 h-1 v1 h-1 v1 h-2 v1 h-5 v-1 h-2 v-1 h-1 v-1 h-1 v-2 h-1 v-5 h1 v-2 h1 v-1 h1 v-1 h2 v-1"
                                    fill="yellow"
                                />
                                <Rect x="4" y="5" width="1" height="1" fill="black" />
                                <Rect x="4" y="7" width="1" height="1" fill="black" />
                                <Rect x="5" y="6" width="1" height="1" fill="black" />
                                <Rect x="6" y="5" width="1" height="1" fill="black" />
                                <Rect x="6" y="7" width="1" height="1" fill="black" />
                                <Rect x="10" y="5" width="1" height="1" fill="black" />
                                <Rect x="10" y="7" width="1" height="1" fill="black" />
                                <Rect x="11" y="6" width="1" height="1" fill="black" />
                                <Rect x="12" y="5" width="1" height="1" fill="black" />
                                <Rect x="12" y="7" width="1" height="1" fill="black" />
                                <Path
                                    d="M6,10 h5 v1 h1 v1 h1 v1 h-1 v-1 h-1 v-1 h-5 v1 h-1 v1 h-1 v-1 h1 v-1 h1"
                                    fill="black"
                                />
                            </G>
                        )
                    case 'faceChilling':
                        return (
                            <G>
                                <Path
                                    d="M6,0 h5 v1 h2 v1 h1 v1 h1 v1 h1 v2 h1 v5 h-1 v2 h-1 v1 h-1 v1 h-1 v1 h-2 v1 h-5 v-1 h-2 v-1 h-1 v-1 h-1 v-1 h-1 v-2 h-1 v-5 h1 v-2 h1 v-1 h1 v-1 h1 v-1 h2 v-1"
                                    fill="black"
                                />
                                <Path
                                    d="M6,1 h5 v1 h2 v1 h1 v1 h1 v2 h1 v5 h-1 v2 h-1 v1 h-1 v1 h-2 v1 h-5 v-1 h-2 v-1 h-1 v-1 h-1 v-2 h-1 v-5 h1 v-2 h1 v-1 h1 v-1 h2 v-1"
                                    fill="yellow"
                                />
                                <Path
                                    d="M4,5 h9 v1 h1 v1 h1 v1 h1 v1 h-1 v-1 h-1 v-1 h-1 v1 h-1 v1 h-2 v-1 h-1 v-2 h-1 v2 h-1 v1 h-2 v-1 h-1 v-1 h-1 v1 h-1 v1 h-1 v-1 h1 v-1 h1 v-1 h1 v-1"
                                    fill="black"
                                />
                                <Rect x="4" y="8" width="1" height="1" fill="#808000" />
                                <Rect x="12" y="8" width="1" height="1" fill="#808000" />
                                <Path
                                    d="M5,11 h1 v1 h5 v-1 h1 v1 h-1 v1 h-5 v-1 h-1 v-1"
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
        <Svg height="100%" width="100%" viewBox={viewBox} style={style}>
            {LoadSVG()}
        </Svg>
    )
};

export default SVGLoader;