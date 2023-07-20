import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	TouchableOpacity,
	RefreshControl
} from "react-native";
import { listarSiniestros } from "../../../Services/AuthService";
import { useEffect } from "react";
import { Button } from "react-native-elements";
import { showToast } from "../../../Components/funciones";

const InicioSiniestro = ({ navigation }) => {
	//BOTON DE CONTINGENCIA
	const [refreshing, setRefreshing] = useState(false);

	const [listSiniestros, setlistSiniestros] = useState([]);
	useEffect(() => {
		listaDeSiniestros();
	}, []);

	async function listaDeSiniestros() {
		try {
			let resp = await listarSiniestros();
			setlistSiniestros(resp);
		} catch (error) {
			console.log(error);
		}
	}

	const onRefresh = async () => {
		setRefreshing(true);
		try {
			const resp = await listarSiniestros();
			setlistSiniestros(resp);
			showToast("Cargando...","#2ecc71");
		} catch (error) {
			console.error(error);
		} finally {
			setRefreshing(false);
		}
	};

	
	return (
		<>
			<View>
				<TouchableOpacity
					style={{
						backgroundColor: "#2980b9",
						padding: 10,
						borderRadius: 5,
						alignItems: "center",
					}}
					onPress={() => navigation.navigate("registroSiniestro")}>
					<Text style={{ color: "#fff" }}>Nuevo reporte</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				<FlatList
					style={styles.notificationList}
					enableEmptySections={true}
					data={listSiniestros}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					keyExtractor={item => item.id}
					renderItem={({ item }) => {
						return (
							<View style={styles.notificationBox}>
								<Text>Fecha: {item.fecha_siniestro}</Text>

								<Text>Detalle: {item.detalle}</Text>
								<Text>Estado: {item.activo}</Text>
							</View>
						);
					}}
				/>
			</View>
		</>
	);
};

export default InicioSiniestro;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DCDCDC",
	},
	notificationList: {
		marginTop: 20,
		padding: 10,
	},
	notificationBox: {
		padding: 20,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: "#FFFFFF",
		flexDirection: "column",
		borderRadius: 10,
	},
	icon: {
		width: 45,
		height: 45,
	},
	description: {
		fontSize: 18,
		color: "#3498db",
		marginLeft: 10,
	},
});
