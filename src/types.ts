import {
  ImageURISource,
  ImagePropertiesIOS,
  ImagePropertiesAndroid,
  AccessibilityProperties,
  LayoutChangeEvent,
  StyleProp,
  ImageStyle
} from "react-native";

export interface ImageProps
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

export interface CustomProps {
  uri: string;
}

export type Props = CustomProps & ImageProps;

export interface State {
  source: ImageURISource;
}
