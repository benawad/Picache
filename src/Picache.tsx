import * as React from "react";
import { Image } from "react-native";
import * as shorthash from "shorthash";
import { FileSystem } from "expo";
import { Props, State } from "./types";

export default class Picache extends React.Component<Props, State> {
  state = {
    source: {}
  };

  async downloadImage(uri: string) {
    const name = shorthash.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}.png`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      this.setState({
        source: {
          uri: image.uri
        }
      });
      return;
    }

    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri
      }
    });
  }

  async componentWillReceiveProps(nextProps: Props, props: Props) {
    if (nextProps.uri === props.uri) {
      return;
    }
    this.downloadImage(nextProps.uri);
  }

  async componentDidMount() {
    this.downloadImage(this.props.uri);
  }

  render() {
    const { uri, ...otherProps } = this.props;
    return <Image source={this.state.source} {...otherProps} />;
  }
}
