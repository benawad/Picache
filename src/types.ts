import { ImageURISource, ImageRequireSource } from "react-native";

export type Source = ImageURISource | ImageURISource[] | ImageRequireSource;

export interface State {
  source: Source;
}
