import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import Picache from "picache";

export default class App extends React.Component {
  state = {
    people: []
  };

  async componentDidMount() {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const json = await response.json();
    this.setState({ people: json.results });
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <FlatList
          style={{ width: "100%" }}
          data={this.state.people}
          keyExtractor={x => x.email}
          renderItem={({ item }) => (
            <Picache
              style={{ width: 100, height: 100 }}
              source={{ uri: item.picture.large }}
            />
          )}
        />
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
