import * as React from "react";
import { Image, ImageProps, ImageRequireSource } from "react-native";
import * as shorthash from "shorthash";
import { FileSystem, Asset } from "expo";
import { State, Source } from "./types";

export default class Picache extends React.Component<ImageProps, State> {
    state = {
        source: {},
    };

    downloadRemoteImage = async (uri: string) => {
        const name = shorthash.unique(uri);
        const path = `${FileSystem.cacheDirectory}${name}.png`;
        const image = await FileSystem.getInfoAsync(path);

        if (image.exists) return image.uri;

        const newImage = await FileSystem.downloadAsync(uri, path);
        return newImage.uri;
    };

    downloadLocalImage = async (source: ImageRequireSource) => {
        const asset = await Asset.fromModule(source);

        if (!asset.localUri) await asset.downloadAsync();

        this.setState({
            source: {
                uri: asset.localUri,
            },
        });
    };

    returnNull = async () => null;

    downloadImage = async (source: Source) => {
        if (typeof source === "number") {
            // local image require('./image.png')
            this.downloadLocalImage(source);
        } else if (Array.isArray(source)) {
            const newUris = await Promise.all(source.map((s) => (s.uri ? this.downloadRemoteImage(s.uri) : this.returnNull())));

            const newSources = [];

            for (let i = 0; i < source.length; i += 1) {
                const uri = newUris[i];
                if (uri) {
                    newSources.push({
                        ...source[i],
                        uri,
                    });
                }
            }

            this.setState({
                source: newSources,
            });
        } else if (source.uri) {
            const newUri = await this.downloadRemoteImage(source.uri);

            this.setState({
                source: {
                    ...source,
                    uri: newUri,
                },
            });
        }
    };

    componentWillReceiveProps = async (nextProps: ImageProps, props: ImageProps) => {
        if (nextProps.source === props.source) return;
        this.downloadImage(nextProps.source);
    };

    componentDidMount = async () => this.downloadImage(this.props.source);

    render = () => {
        const { source, ...otherProps } = this.props;
        return <Image source={this.state.source} {...otherProps} />;
    };
}
