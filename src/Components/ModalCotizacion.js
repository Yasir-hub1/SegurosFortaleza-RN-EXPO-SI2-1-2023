import React, { useEffect, useState } from "react";
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
import CustomSelect from "./CustomSelect";

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
	const [coberturaSelct,setCoberturaSelect] = useState (null);
	


	const handleSave = async () => {
		let cotizacion = {
			name: nombre,
			email: correo,
			telefono: parseInt(telefono),
			marca: marca,
			modelo: modelo,
			cobertura: coberturaSelct,
			anio: parseInt(anio),
		};


		if (
			cotizacion.name &&
			cotizacion.telefono &&
			cotizacion.modelo &&
			cotizacion.marca &&
			cotizacion.email &&
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
            }
		} else {
			// showToast("Todos los campos son obligatorios", "#e67e22");
			setIsObligatorio(true);
		}

		
	};

	const CoberturaSelect = [{key:1,value:"basica"},{key:2, value:"completa"},{key:3, value: "terceros"}];

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
							{/* <Input
								value={cobertura}
								onChangeText={text => setCobertura(text)}
							/> */}
							<CustomSelect options = {CoberturaSelect} onSelect={setCoberturaSelect}/>
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
