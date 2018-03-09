import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Picache from "./lib/Picache";

export default class App extends React.Component {
  state = {
    show: false
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="toggle picture"
          onPress={() => this.setState({ show: !this.state.show })}
        />
        {this.state.show ? (
          <React.Fragment>
            <Picache
              style={{ height: 200, width: 200 }}
              source={{ uri: "http://via.placeholder.com/200x200" }}
            />
            <Picache
              style={{ height: 150, width: 350 }}
              source={require("./square.png")}
            />
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
          </React.Fragment>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
