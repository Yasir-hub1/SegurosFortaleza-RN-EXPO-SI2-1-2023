import React from "react";
import {
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
import { urlImgVehiculo } from "../Util/Api";

const CardList = ({ data, onPressItem }) => {
	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.card} onPress={() => onPressItem(item)}>
			<Image
				source={{ uri: urlImgVehiculo + item.imagen }}
				style={styles.image}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{item.marca}</Text>
				<Text style={styles.description}>{item.descripcion}</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => onPressItem(item)}>
					<Text style={styles.buttonText}>Ver Detalles</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 8,
		marginBottom: 16,
		padding: 16,
		elevation: 4,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 8,
		marginBottom: 8,
	},
	contentContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	description: {
		fontSize: 16,
		marginBottom: 8,
	},
	button: {
		backgroundColor: "#007aff",
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 4,
	},
	buttonText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default CardList;
