import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioVehiculos from "../../Screen/Client/vehiculos/InicioVehiculo";

const Stack = createNativeStackNavigator();

const VehiculosStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="inicioVehiculo">
			<Stack.Screen name="inicioVehiculo" component={InicioVehiculos} />
		</Stack.Navigator>
	);
};
export default VehiculosStack;
