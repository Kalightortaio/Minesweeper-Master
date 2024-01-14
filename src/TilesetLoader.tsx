import React from 'react';
import { Image, ImageStyle } from 'react-native';

const source = require('../assets/game/tileset');

interface TileProps {
    tileX: number;
    tileY: number;
    tileWidth: number;
    tileHeight: number;
}

const Tile = ({ tileX, tileY, tileWidth, tileHeight }: TileProps) => {
    const style: ImageStyle = {
        width: tileWidth,
        height: tileHeight,
        resizeMode: 'stretch',
        transform: [{ translateX: -tileX }, { translateY: -tileY }],
    };

    return <Image source={source} style={style} />;
};

interface TileConfig {
    x: number;
    y: number;
    width: number;
    height: number;
}

const tileConfigs: Record<string, TileConfig> = {
    one: { x: 0, y: 0, width: 20, height: 20 },
    two: { x: 20, y: 0, width: 20, height: 20 },
};

const createTileComponent = (config: TileConfig) => {
    return () => <Tile tileX={config.x} tileY={config.y} tileWidth={config.width} tileHeight={config.height} />;
};

export const OneTile = createTileComponent(tileConfigs.one);
export const TwoTile = createTileComponent(tileConfigs.two);
