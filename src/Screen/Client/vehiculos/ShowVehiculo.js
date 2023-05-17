import React from "react";
import {
	View,
	Image,
	TextInput,
	StyleSheet,
	ScrollView,
	Text,
} from "react-native";

const ShowVehiculo = ({ route, navigation }) => {
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
	} = route.params.dataItems;

	return (
		<ScrollView>
			<View style={styles.container}>
				<Image source={{ uri: path }} style={styles.image} />

				<View style={styles.textFieldsContainer}>
					<Text>Marca :</Text>
					<TextInput
						style={styles.textField}
						placeholder={marca}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Modelo :</Text>
					<TextInput
						style={styles.textField}
						placeholder={modelo}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Placa :</Text>
					<TextInput
						style={styles.textField}
						placeholder={placa}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Nro asientos :</Text>
					<TextInput
						style={styles.textField}
						placeholder={JSON.stringify(nro_asiento)}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Altura :</Text>
					<TextInput
						style={styles.textField}
						placeholder={JSON.stringify(altura)}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Anchura :</Text>
					<TextInput
						style={styles.textField}
						placeholder={JSON.stringify(anchura)}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Combustible :</Text>
					<TextInput
						style={styles.textField}
						placeholder={combustible}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Potencia :</Text>
					<TextInput
						style={styles.textField}
						placeholder={JSON.stringify(potencia)}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>

					<Text>Descripcion :</Text>
					<TextInput
						style={styles.textField}
						placeholder={descripcion}
						placeholderTextColor={"#2C3A47"}
						editable={false}
					/>


          <View style={{margin:25}}/>
				</View>
			</View>
		</ScrollView>
	);
};

export default ShowVehiculo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	image: {
		width: 270,
		height: 200,
		resizeMode: "cover",
		borderRadius: 8,
	},
	textFieldsContainer: {
		marginTop: 20,
		width: "100%",
	},
	textField: {
		height: 40,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "#999",
		borderRadius: 8,
	},
});
