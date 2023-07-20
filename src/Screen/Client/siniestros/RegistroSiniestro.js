import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { showToast } from "../../../Components/funciones";
import SelectPikerLogin from "../../../Components/SelectPikerLogin";
import {
	listaVehiculos,
	registrarSiniestro,
} from "../../../Services/AuthService";
import TimePicker from "../../../Components/DateTimePiker";
import * as ImagePicker from "expo-image-picker";

const RegistroSiniestro = ({ navigation }) => {
	const [location, setLocation] = useState(null);
	const [vehiculos, setVehiculos] = useState([]);
	const [selectIdVehiculo, setSelectIdVehiculo] = useState("");
	const [fechaInicio, setFechaInicio] = useState("");
	const [Imagen, setImagen] = useState("");
	const [Detalle, setDetalle] = useState("");
	const [positionMarker, setPositionMarker] = useState({
		latitude: -17.776345587879888,
		longitude: -63.196318721211355,
	});

	const mapRef = useRef();

	useEffect(() => {
		(async () => {
			const resultPermiso = await Location.requestForegroundPermissionsAsync();

			const EstadoPermiso = resultPermiso.status;

			if (EstadoPermiso !== "granted") {
				showToast("Acepte los permisos de ubicacion", "#e74c3c");
			} else {
				const Userlocal = await Location.getCurrentPositionAsync({});

				setLocation({
					latitude: Userlocal.coords.latitude,
					longitude: Userlocal.coords.longitude,
				});
			}
		})();
	}, []);

	useEffect(() => {
		listaDeVehiculos();
	}, []);

	async function listaDeVehiculos() {
		try {
			let resp = await listaVehiculos();
			setVehiculos(resp);
		} catch (error) {
			console.log(error);
		}
	}

	const [estado] = useState({
		origen: {
			latitude: -17.776345587879888,
			longitude: -63.196318721211355,
			latitudeDelta: 0.00007,
			longitudeDelta: 0.00007,
		},
	});
	const { origen } = estado;
	const handleSelect = key => {
		setSelectIdVehiculo(key);
	};

	const handleSubmit = async () => {
		let localUri = Imagen;
		let nombreImagen = localUri.split("/").pop();
		const fileImage = {
			uri: localUri,
			name: nombreImagen,
			type: "image/jpg",
		};

		const data = {
			latitud: positionMarker.latitude,
			longitud: positionMarker.longitude,
			vehiculo: selectIdVehiculo,
			detalle: Detalle,
			fecha: fechaInicio,
			imagenes: fileImage,
		};

        if(data.detalle && data.latitud  && data.detalle && data.fecha  && data.imagenes){
            try {
                let resp = await registrarSiniestro(data);
                 if(resp.status==="Success"){
                   showToast("Se registro correctamente","#2ecc71");
                    navigation.navigate("inicioSiniestro");

                 }
            } catch (error) {
                console.log(error);
            }

        }else{
            showToast("Todos los datos son obligatorio","#e67e22")
        }

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
		<ScrollView contentContainerStyle={styles.container}>
			{/* Parte superior */}
			<View style={styles.topContainer}>
				<View style={[styles.row, { alignSelf: "center" }]}>
					<TimePicker
						tittle="Fecha Inicio"
						isMode="date"
						onTimeSelect={setFechaInicio}
					/>
				</View>
				<View style={styles.row}>
					<Input
						placeholder="Detalle"
						leftIcon={{ type: "font-awesome", name: "user" }}
						containerStyle={styles.inputContainer}
						onChangeText={text => setDetalle(text)}
					/>
					<Button title="Imagen" onPress={() => selecionarImagen()} />
				</View>
				<View style={{ bottom: 20 }}>
					<SelectPikerLogin options={vehiculos} onSelect={handleSelect} />
				</View>
			</View>

			{/* Espacio para MapView */}
			<View style={styles.mapContainer}>
				<MapView
					ref={mapRef}
					provider={"google"}
					userLocationPriority="high"
					zoomEnabled={true}
					zoomTapEnabled={true}
					loadingEnabled={true}
					showsUserLocation={true}
					toolbarEnabled={false}
					showsMyLocationButton={true}
					userLocationFastestInterval={5000}
					maxZoomLevel={17}
					minZoomLevel={5}
					mapPadding={{ top: 35 }}
					style={styles.map}
					initialRegion={origen}>
					<Marker
						tappable={true}
						coordinate={positionMarker}
						draggable={true}
						tracksInfoWindowChanges={true}
						onDragEnd={e => {
							// console.log("FIn", e.nativeEvent.coordinate);

							setPositionMarker({
								latitude: e.nativeEvent.coordinate.latitude,
								longitude: e.nativeEvent.coordinate.longitude,
							});
						}}>
						<Callout
							tooltip={false} /*  style={{ backgroundColor: "#0be881" }} */
						>
							<Text style={{ fontWeight: "bold" }}>ORIGEN</Text>
						</Callout>
					</Marker>
				</MapView>
			</View>

			{/* Botón de enviar */}
			<Button title="Enviar" containerStyle={styles.buttonContainer} onPress={()=>handleSubmit()} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	topContainer: {
		flexDirection: "column",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	inputContainer: {
		flex: 1,
		marginRight: 10,
	},
	mapContainer: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	buttonContainer: {
		margin: 20,
	},
});

export default RegistroSiniestro;
