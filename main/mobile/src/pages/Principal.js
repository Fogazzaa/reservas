import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import api from "../services/axios";

function Principal({ navigation }) {
  const [salas, setSalas] = useState([]);

  async function getSalas() {
    await api.getSalas().then(
      (response) => {
        setSalas(response.data.salas);
      },
      (error) => {
        console.log("Erro", error);
      }
    );
  }

  useEffect(() => {
    getSalas();
  }, []);

  const listSalas = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.tableCell, styles.nome]}>{item.nome}</Text>
      <Text style={[styles.tableCell, styles.descricao]}>{item.descricao}</Text>
      <Text style={[styles.tableCell, styles.bloco]}>{item.bloco}</Text>
      <Text style={[styles.tableCell, styles.tipo]}>{item.tipo}</Text>
      <Text style={[styles.tableCell, styles.capacidade]}>
        {item.capacidade}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../img/fundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Image source={require("../img/logo.png")} style={styles.logo} />
        <TouchableOpacity
          style={styles.buttonToHome}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../img/iconelogout.png")}
            style={styles.imageButtonToHome}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.headerNome]}>
            Nome
            </Text>
          <Text style={[styles.tableHeaderCell, styles.headerDescricao]}>
            Descrição
          </Text>
          <Text style={[styles.tableHeaderCell, styles.headerBloco]}>
            Bloco
          </Text>
          <Text style={[styles.tableHeaderCell, styles.headerTipo]}>
            Tipo
            </Text>
          <Text style={[styles.tableHeaderCell, styles.headerCapacidade]}>
            Capacidade
          </Text>
        </View>
        <FlatList
          data={salas}
          renderItem={listSalas}
          keyExtractor={(sala) => sala.id_sala.toString()}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.textDesenvolvido}>
          &copy; Desenvolvido por: Vinicius Fogaça, Maria Júlia e Maria Fernanda
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { height: "100vh" },
  header: {
    backgroundColor: "rgba(177, 16, 16, 1)",
    height: 60,
    borderBottomColor: "white",
    borderBottomWidth: 3,
    flexDirection: "row",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    width: 120,
    height: 34,
    marginTop: 12,
    marginLeft: 10,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 3,
  },
  buttonToHome: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    marginLeft: 300,
  },
  imageButtonToHome: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  body: {
    padding: 8,
    paddingTop: 10,
    paddingBottom: 180,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "gray",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  tableHeaderCell: {
    textAlign: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  headerNome: { width: 50, marginLeft: 25 },
  headerDescricao: { width: 100, marginLeft: 30 },
  headerBloco: { width: 70 },
  headerTipo: { width: 80, marginLeft: -5 },
  headerCapacidade: { width: 100, marginLeft: 1,},

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "white",
    backgroundColor: "#949494",
  },
  nome: {
    width: 100,
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRightWidth: 0.5,
    borderRightColor: "white",
    fontWeight: "bold",
  },
  descricao: {
    width: 120,
    flexWrap: "wrap",
    textAlign: "center",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: "white",
    borderRightWidth: 0.5,
    borderRightColor: "white",
  },
  bloco: {
    width: 50,
    flexWrap: "wrap",
    textAlign: "center",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: "white",
    borderRightWidth: 0.5,
    borderRightColor: "white",
  },
  tipo: {
    width: 80,
    flexWrap: "wrap",
    textAlign: "center",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: "white",
    borderRightWidth: 0.5,
    borderRightColor: "white",
    fontStyle: "italic",
  },
  capacidade: {
    width: 40,
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent:"center",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: "white",
  },
  footer: {
    backgroundColor: "rgb(166, 13, 13)",
    height: 50,
    borderTopColor: "white",
    borderTopWidth: 3,
    marginTop: -158,
    alignItems: "center",
    justifyContent: "center",
  },
  textDesenvolvido: { color: "white", fontWeight: "bold" },
});

export default Principal;
