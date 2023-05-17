import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { listarVehiculos } from "../../../Services/AuthService";
import CardList from "../../../Components/CardList";

const InicioVehiculos = () => {
	const [listVehiculos, setListVehiculos] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const _listVehiculos = await listarVehiculos();
				console.log(_listVehiculos);
				setListVehiculos(_listVehiculos);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	

	const handlePressItem = item => {
		// Lógica para manejar el evento de pulsar una tarjeta
		console.log("Tarjeta seleccionada:", item);
	};

	return (
		<View style={{ flex: 1 }}>
			<CardList data={listVehiculos} onPressItem={handlePressItem} />
		</View>
	);
};

export default InicioVehiculos;

const styles = StyleSheet.create({});
