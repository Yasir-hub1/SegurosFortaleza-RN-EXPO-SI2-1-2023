import React from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const CardListPagos = (props) => {
    const { data, navigation }= props
	function cambiarEstato(estado) {
		if (estado == 1) {
			return "activo";
		} else {
			return "Inactivo";
		}
	}

	const redireccionar = (id,nro_poliza) => {
		navigation.navigate("detallePago", { id_pago: id, nro_poliza:nro_poliza});
	};
	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<Text style={styles.title}>Código Poliza: {item.nro_poliza}</Text>
			<Text style={styles.field}>Fecha de Contrato: {item.fecha_inicio}</Text>
			<Text style={styles.field}>Estado: {cambiarEstato(item.activo)}</Text>
			<Text style={styles.field}>Total: {item.prima_total}</Text>

			<TouchableOpacity style={styles.button} onPress={()=>redireccionar(item.id,item.nro_poliza)}>
				<Text style={styles.buttonText}>Pagar</Text>
			</TouchableOpacity>
		</View>
	);
	

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	listContainer: {
		flexDirection: "column",
	},
	card: {
		flex: 1,
		marginVertical: 8,
		padding: 16,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	field: {
		fontSize: 14,
		marginBottom: 4,
	},
	button: {
		backgroundColor: "#007bff",
		padding: 8,
		borderRadius: 8,
		marginTop: 8,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default CardListPagos;
