import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { listarVehiculos } from "../../../Services/AuthService";
import CardList from "../../../Components/CardList";
import Toast from "react-native-root-toast";
const InicioVehiculos = ({navigation}) => {
	const [listVehiculos, setListVehiculos] = useState([]);
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		(async () => {
			try {
				const _listVehiculos = await listarVehiculos();
				
				setListVehiculos(_listVehiculos);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);


	const onRefresh = async () => {
		setRefreshing(true);
		try {
		  const _recargarVehiculos = await listarVehiculos();
		  setListVehiculos(_recargarVehiculos);
		  Toast.show("Cargando...");
	   
		} catch (error) {
		  console.error(error);
		} finally {
		  setRefreshing(false);
		}
	  };

	

	const handlePressItem = item => {
		// Lógica para manejar el evento de pulsar una tarjeta
		console.log("Tarjeta seleccionada:", item);
	};

	return (
		<View style={{ flex: 1 ,backgroundColor:"white"}}>
			<CardList data={listVehiculos} onRefresh={onRefresh} navigation={navigation} />
		</View>
	);
};

export default InicioVehiculos;

const styles = StyleSheet.create({});
