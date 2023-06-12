import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";

import { Base_URL } from "../../../Util/Api";

const RealizarPago = ({ route, navigation }) => {
	const { id_pago } = route.params;

	const [ImagenComprobante, setImagenComprobante] = useState(null);

	const handleSubmit = async () => {
		let localUri = ImagenComprobante;
		let nombreImagen = localUri.split("/").pop();
		const fileImage = {
			uri: localUri,
			name: nombreImagen,
			type: "image/jpg",
		};

		const url = `${Base_URL}/realizarPago`;

		const formData = new FormData();
		formData.append("id", id_pago);

		formData.append("imagen", fileImage);

		const options = {
			method: "POST",
			body: formData,
			Headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		};
		console.log(formData);

		await fetch(url, options)
			.then(res => res.json())
			.catch(error => console.error("Error", error))
			.then(response => {
				console.log("DESDE EL RESPONSE", response);
        Toast.show("Comprobante enviado");
        navigation.navigate("inicioPago");
			});
		console.log("enviado");
	};

	const selecionarImagen = async () => {
		try {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Toast.show("Por favor acepta los permisos para subir fotos");
				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,

				quality: 1,
			});

			if (!result.canceled) {
				setImagenComprobante(result.assets[0].uri); // Accede a la URI de la primera imagen seleccionada
				Toast.show("Imagen seleccionada");
			}
		} catch (error) {
			console.log("Error al selecionar imagen", error);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require("../../../Assets/qr.png")} // Cambia la ruta de la imagen según tu ubicación
				style={styles.image}
			/>
			<View style={styles.content}>
				<Text style={styles.description}>
					Por favor envie su comprobante luego de realizar el pago
				</Text>

				{ImagenComprobante != null ? (
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Enviar</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.button} onPress={selecionarImagen}>
						<Text style={styles.buttonText}>Seleccione una imagen</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default RealizarPago;

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: "contain",
	},
	content: {
		alignItems: "center",
		marginVertical: 20,
	},
	description: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#007bff",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
