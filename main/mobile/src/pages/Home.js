import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

function Home({ navigation }) {
  return (
    <ImageBackground
      source={require("../img/fundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Image source={require("../img/logo.png")} style={styles.logo} />
        <TouchableOpacity
          style={styles.buttonToCadastro}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.textButtonToCadastro}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonToLogin}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textButtonToLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.textBody}>
          Seja Bem-vindo ao site de Reservas do SENAI
        </Text>
      </View>

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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    width: 205,
    height: 55,
    marginBottom: 25,
    marginTop: 16,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 4,
  },
  buttonToCadastro: {
    backgroundColor: "rgb(250, 24, 24)",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    borderWidth: 0,
    alignItems: "center",
    marginRight: 20,
  },
  textButtonToCadastro: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  buttonToLogin: {
    backgroundColor: "rgb(250, 24, 24)",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    borderWidth: 0,
    alignItems: "center",
    marginRight: 20,
  },
  textButtonToLogin: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  backgroundBody: { height: "70%" },
  body: {},
  textBody: {
    color: "white",
    fontSize: 80,
    fontWeight: "bold",
    marginLeft: 50,
    marginTop: 130,
  },

  footer: {
    backgroundColor: "rgba(177, 16, 16, 1)",
    height: 80,
    borderTopColor: "white",
    borderTopWidth: 3,
    marginTop: 150,
  },
});

export default Home;
