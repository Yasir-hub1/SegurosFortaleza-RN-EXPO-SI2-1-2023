import React, { useState } from "react";
import {
	View,
	Button,
	Modal,
	TouchableOpacity,
	Text,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Input } from "react-native-elements";
import { crearCotizacion } from "../Services/AuthService";
import Toast from "react-native-root-toast";
import { showToast } from "./funciones";

const ModalCotizacion = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [isObligatorio, setIsObligatorio] = useState(false);
	const [nombre, setNombre] = useState("");
	const [correo, setCorreo] = useState("");
	const [telefono, setTelefono] = useState("");
	const [marca, setMarca] = useState("");
	const [modelo, setModelo] = useState("");
	const [cobertura, setCobertura] = useState("");
	const [anio, setAnio] = useState("");
	const [costo, setCosto] = useState("");

	const handleSave = async () => {
		let cotizacion = {
			name: nombre,
			email: correo,
			telefono: parseInt(telefono),
			marca: marca,
			modelo: modelo,
			cobertura: cobertura,
			anio: parseInt(anio),
			costo: costo,
		};

		if (
			cotizacion.name &&
			cotizacion.telefono &&
			cotizacion.modelo &&
			cotizacion.marca &&
			cotizacion.email &&
			cotizacion.costo &&
			cotizacion.cobertura &&
			cotizacion.anio
		) {
			console.log("handleSave", cotizacion);

			const resp = await crearCotizacion(cotizacion);
			if(resp.status==="Success"){

		   setModalVisible(false);
            setNombre("");
            setCorreo("");
            setTelefono("");
            setMarca("");
            setModelo("");
            setCobertura("");
            setAnio("");
            setCosto("");
            }
		} else {
			// showToast("Todos los campos son obligatorios", "#e67e22");
			setIsObligatorio(true);
		}

		
	};

	return (
		<View>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={{ marginLeft: 40 }} />
				<Text
					style={{ color: "#4169e1", fontWeight: "700", textAlign: "center" }}>
					{" "}
					Cotizar
				</Text>
			</TouchableOpacity>

			<Modal visible={modalVisible} animationType="slide">
				<View style={styles.modalContainer}>
                    {isObligatorio ? (
					<Text
						style={{
							fontSize: 18,
							fontWeight: "600",
							bottom: 15,
							textAlign: "center",
							color: "red",
						}}>
						Todos los campos son obligatorios*
					</Text>

                    ):null}
					<Text style={{ fontSize: 25, fontWeight: "800", bottom: 15 }}>
						Realizar Cotización:
					</Text>
					<View style={styles.rowContainer}>
						<View style={styles.fieldContainer}>
							<Text>Nombre:</Text>
							<Input value={nombre} onChangeText={text => setNombre(text)} />
						</View>
						<View style={styles.fieldContainer}>
							<Text>Correo:</Text>
							<Input value={correo} onChangeText={text => setCorreo(text)} />
						</View>
					</View>
					<View style={styles.rowContainer}>
						<View style={styles.fieldContainer}>
							<Text>Telefono:</Text>
							<Input
								value={telefono}
								keyboardType="numeric"
								onChangeText={text => setTelefono(text)}
							/>
						</View>
						<View style={styles.fieldContainer}>
							<Text>Marca:</Text>
							<Input value={marca} onChangeText={text => setMarca(text)} />
						</View>
					</View>
					<View style={styles.rowContainer}>
						<View style={styles.fieldContainer}>
							<Text>Modelo:</Text>
							<Input value={modelo} onChangeText={text => setModelo(text)} />
						</View>
						<View style={styles.fieldContainer}>
							<Text>Cobertura:</Text>
							<Input
								value={cobertura}
								onChangeText={text => setCobertura(text)}
							/>
						</View>
					</View>
					<View style={styles.rowContainer}>
						<View style={styles.fieldContainer}>
							<Text>Año:</Text>
							<Input
								value={anio}
								onChangeText={text => setAnio(text)}
								keyboardType="numeric"
							/>
						</View>
						<View style={styles.fieldContainer}>
							<Text>Costo:</Text>
							<Input
								value={costo}
								onChangeText={text => setCosto(text)}
								keyboardType="numeric"
							/>
						</View>
					</View>
					<View style={styles.rowContainer}>
						<Button title="Guardar" onPress={() => handleSave()} />
						<Text>{"\n"}</Text>
						<Button title="Cancelar" onPress={() => setModalVisible(false)} />
					</View>
				</View>
			</Modal>
		</View>
	);
};
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 15,
	},
	rowContainer: {
		flexDirection: "row",
		marginBottom: 10,
	},
	fieldContainer: {
		flex: 1,
		marginRight: 10,
	},
});

export default ModalCotizacion;
