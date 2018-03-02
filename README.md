# Picache

A React Native component that will automatically cache images

## Usage

```bash
yarn add picache
```


```js
import Picache from "picache";

const App = () => (
  <Picache
    style={{ height: 200, width: 200 }}
    uri="http://via.placeholder.com/200x200"
  />
);
```

We use `uri` instead of `source`, but other than that you can pass any prop that [Image](https://facebook.github.io/react-native/docs/image.html) would accept.
