import React from "react";
import {
    ImageBackground,
    StyleSheet,
    View
} from "react-native";

function Home() {

  return (
    <ImageBackground
      source={require("../../img/fundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
      </View>
      <ImageBackground
      source={require("../../img/2fundoinicial.png")}
      style={styles.backgroundBody}
      resizeMode="cover"
    >
      <View style={styles.body}>

      </View>
      </ImageBackground>
      <View style={styles.footer}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { height: "150%" },
  header: {
    backgroundColor: "rgba(177, 16, 16, 1)",
    height: 60,
    borderBottomColor: "white",
    borderBottomWidth: 3,
  },
  backgroundBody: { height: "70%" },
  body: {},

  footer: {
    backgroundColor: "rgba(177, 16, 16, 1)",
    height: 80,
    borderTopColor: "white",
    borderTopWidth: 3,
  },
});

export default Home;
