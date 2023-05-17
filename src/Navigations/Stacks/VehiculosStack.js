import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioVehiculos from "../../Screen/Client/vehiculos/InicioVehiculo";
import EditVehiculo from "../../Screen/Client/vehiculos/EditVehiculo";
import ShowVehiculo from "../../Screen/Client/vehiculos/ShowVehiculo";

const Stack = createNativeStackNavigator();

const VehiculosStack = ({ navigation }) => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: true }}
			initialRouteName="inicioVehiculo">
			<Stack.Screen
				name="inicioVehiculo"
				component={InicioVehiculos}
				options={{ headerTitle: "Vehiculos", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="editVehiculo"
				component={EditVehiculo}
				options={{ headerTitle: "Actualizar", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="showVehiculo"
				component={ShowVehiculo}
				options={{ headerTitle: "Informacion", headerTitleAlign: "center" }}
			/>
		</Stack.Navigator>
	);
};
export default VehiculosStack;
