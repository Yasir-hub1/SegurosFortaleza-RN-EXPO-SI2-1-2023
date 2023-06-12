import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { urlImgVehiculo } from "../Util/Api";
import errorHandler from "../Util/AxiosErrorHandler";
import { eliminarVehiculo } from "../Services/AuthService";
import Toast from "react-native-root-toast";

const CardList = props => {
	const { data, onRefresh, navigation } = props;

	const [refreshing, setRefreshing] = useState(false);

	const handleShow = dataShow => {
		navigation.navigate("showVehiculo", { dataItems:dataShow });
	};

	const handleEdit = data => {
		navigation.navigate("editVehiculo", { dataItem:data });
	};

	const handleDelete = async(id) => {
		try {
			const _eliminar= await eliminarVehiculo(id);
			Toast.show("Deslice hacia abajo para recargar")
			console.log("desde Vista ",_eliminar);
		} catch (error) {
			throw errorHandler(error);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.cardContainer}>
			<View style={styles.cardBody}>
				<TouchableOpacity>
					<Image
						source={{ uri: item.path }}
						style={styles.image}
					/>
				</TouchableOpacity>
				<View style={{ flex: 1 }}>
					<Text style={{ fontWeight: "bold" }}>{item.marca}</Text>
					<Text>{item.descripcion}</Text>

					<View style={{ flexDirection: "row", marginTop: 10 }}>
						<TouchableOpacity onPress={() => handleShow(item)}>
							<FontAwesome
								name="eye"
								size={20}
								color={"#778beb"}
								style={{ marginRight: 10 }}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => handleEdit(item)}>
							<FontAwesome
								name="edit"
								size={20}
								color={"#f5cd79"}
								style={{ marginRight: 10 }}
							/>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => handleDelete(item.id)}>
							<FontAwesome name="trash" size={20} color={"#FC427B"} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			keyExtractor={item => item.id}
			contentContainerStyle={{ paddingVertical: 10 }}
		/>
	);
};

export default CardList;
const styles = StyleSheet.create({
	cardContainer: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "white",
		marginHorizontal: 5,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
		marginVertical: 8,
	},
	cardBody: {
		flexDirection: "row",
		marginBottom: 10,
	},
	image: {
		width: 80,
		height: 80,
		marginRight: 10,
		borderWidth: 1,
		borderRadius: 8,
	},
});
