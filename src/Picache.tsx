import * as React from "react";
import {
  Image,
  ImageURISource,
  ImagePropertiesIOS,
  ImagePropertiesAndroid,
  AccessibilityProperties,
  LayoutChangeEvent,
  StyleProp,
  ImageStyle
} from "react-native";
import * as shorthash from "shorthash";
import { FileSystem } from "expo";

export interface Props
  extends ImagePropertiesIOS,
    ImagePropertiesAndroid,
    AccessibilityProperties {
  onLayout?: (event: LayoutChangeEvent) => void;
  onError?: (error: { nativeEvent: any }) => void;
  onLoad?: () => void;
  onLoadEnd?: () => void;
  onLoadStart?: () => void;
  progressiveRenderingEnabled?: boolean;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  resizeMethod?: "auto" | "resize" | "scale";
  loadingIndicatorSource?: ImageURISource;
  style?: StyleProp<ImageStyle>;
  testID?: string;
  uri: string;
}

export interface State {
  source: ImageURISource;
}

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
