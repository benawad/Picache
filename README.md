# Picache

A React Native component that will automatically cache images.

## Usage

```bash
yarn add picache
```

Use Picache the same way you would add an `<Image />` component.

```js
import Picache from "picache";

const App = () => (
    <Picache
      style={{ height: 200, width: 200 }}
      source={{ uri: "http://via.placeholder.com/200x200" }}
    />
);
```


```js
import Picache from "picache";

const App = () => (
     <Picache
        style={{ height: 150, width: 350 }}
        source={require("./square.png")}
      />
);
```


```js
import Picache from "picache";

const App = () => (
      <Picache
        style={{ height: 50, width: 50 }}
        source={[
          {
            uri: "http://via.placeholder.com/25x25",
            height: 25,
            width: 25
          },
          {
            uri: "http://via.placeholder.com/50x50",
            height: 50,
            width: 50
          }
        ]}
      />
);
```
