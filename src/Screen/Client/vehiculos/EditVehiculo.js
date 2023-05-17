import React, { useState } from "react";
import {
	View,
	TextInput,
	Button,
	Image,
	StyleSheet,
	Text,
	ScrollView,
} from "react-native";
import { Base_URL, urlImgVehiculo } from "../../../Util/Api";
import CustomInput from "../../../Components/EditVehiculos/TextInput";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";

const EditVehiculo = ({ route, navigation }) => {
	const {
		id, //number
		altura, // number
		anchura, // number
		combustible, //string
		descripcion, // string
		path, // string
		imagen,
		marca, // string
		modelo, // string
		nro_asiento, // number
		placa, // string
		potencia, // number
		users_id, //number
	} = route.params.dataItem;

	const [Altura, setAltura] = useState();
	const [Anchura, setAnchura] = useState();
	const [Combustible, setCombustible] = useState("");
	const [Descripcion, setDescripcion] = useState("");
	const [Imagen, setImagen] = useState(path);
	const [Marca, setMarca] = useState("");
	const [Modelo, setModelo] = useState("");
	const [Nro_asiento, setNro_asiento] = useState();

	const [Placa, setPlaca] = useState("");
	const [Potencia, setPotencia] = useState();

	console.log(Imagen.split("/").pop());

	const handleSubmit =async () => {
		let localUri = Imagen;
		let nombreImagen = localUri.split("/").pop();
		const fileImage = {
			uri: localUri,
			name: nombreImagen,
			type: "image/jpg",
		};

		const url = `${Base_URL}/editarVehiculos`;

		const formData = new FormData();
		formData.append("id", id);
		formData.append("altura", Altura);
		formData.append("anchura", Anchura);
		formData.append("combustible", Combustible);
		formData.append("descripcion", Descripcion);
		formData.append("imagen", fileImage);
		formData.append("marca", Marca);
		formData.append("modelo", Modelo);
		formData.append("nro_asiento", Nro_asiento);
		formData.append("placa", Placa);
		formData.append("potencia", Potencia);
		formData.append("users_id", users_id);

		const options = {
			method: "POST",
			body: formData,
			Headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
				// 'Content-Type': 'application/json',
				// "Content-Type": "application/x-amz-json-1.1",
			},
		};
		console.log(formData);

		await fetch(url, options)
			.then(res => res.json())
			.catch(error => console.error("Error", error))
			.then(response => {
				console.log("DESDE EL RESPONSE", response);
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
				aspect: [1, 1],
				quality: 1,
			});

			if (!result.canceled) {
				setImagen(result.assets[0].uri); // Accede a la URI de la primera imagen seleccionada
			}
		} catch (error) {
			console.log("Error al selecionar imagen", error);
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				{/* Campo para visualizar la imagen */}
				<View style={styles.imageContainer}>
					{imagen != null ? (
						<Image
							source={{ uri: Imagen ? Imagen : null }}
							style={styles.image}
						/>
					) : (
						<Text style={styles.imagePlaceholder}>No hay imagen</Text>
					)}
				</View>

				{/* Campo de texto */}
				<Text>Descripcion :</Text>
				<CustomInput
					onChangeText={text => setDescripcion(text)}
					placeholder={descripcion}
				/>

				<Text>Marca :</Text>
				<CustomInput
					onChangeText={text => setMarca(text)}
					placeholder={marca}
				/>

				<Text>Modelo :</Text>
				<CustomInput
					onChangeText={text => setModelo(text)}
					placeholder={modelo}
				/>

				<Text>Placa :</Text>
				<CustomInput
					onChangeText={text => setPlaca(text)}
					placeholder={placa}
				/>

				<Text>Combustible :</Text>
				<CustomInput
					onChangeText={text => setCombustible(text)}
					placeholder={combustible}
				/>

				{/* Campo Númerico */}
				<Text>Altura :</Text>
				<TextInput
					style={styles.input}
					placeholder={JSON.stringify(altura)}
					onChangeText={number => setAltura(number)}
					keyboardType="phone-pad"
				/>
				<Text>Anchura :</Text>
				<TextInput
					style={styles.input}
					placeholder={JSON.stringify(anchura)}
					onChangeText={number => setAnchura(number)}
					keyboardType="phone-pad"
				/>
				<Text>Potencia :</Text>
				<TextInput
					style={styles.input}
					placeholder={JSON.stringify(potencia)}
					onChangeText={number => setPotencia(number)}
					keyboardType="phone-pad"
				/>

				<Text>Nª de asientos :</Text>
				<TextInput
					style={styles.input}
					placeholder={JSON.stringify(nro_asiento)}
					onChangeText={number => setNro_asiento(number)}
					keyboardType="phone-pad"
				/>

				<View style={{ flexDirection: "row" }}>
					{/* Botón para seleccionar y actualizar la foto */}
					<Button title="Seleccionar foto" onPress={selecionarImagen} />
					<View style={{ margin: 10 }} />
					{/* Botón para enviar el formulario */}
					<Button
						title="Enviar"
						onPress={() => {
							handleSubmit();
							navigation.goBack();
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		justifyContent: "center",
		backgroundColor: "#fff",
		paddingBottom: 55,
	},

	imageContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	image: {
		width: 250,
		height: 200,
		borderRadius: 8,
		resizeMode: "cover",
	},
	imagePlaceholder: {
		fontSize: 16,
		color: "#999",
	},
	input: {
		marginBottom: 10,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
	},
});

export default EditVehiculo;
