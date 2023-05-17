import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioVehiculos from "../../Screen/Client/vehiculos/InicioVehiculo";
import EditVehiculo from "../../Screen/Client/vehiculos/EditVehiculo";
import ShowVehiculo from "../../Screen/Client/vehiculos/ShowVehiculo";

const Stack = createNativeStackNavigator();

const VehiculosStack = ({navigation}) => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="inicioVehiculo"
			
			>
			<Stack.Screen name="inicioVehiculo" component={InicioVehiculos}  />
			<Stack.Screen name="editVehiculo" component={EditVehiculo} />
			<Stack.Screen name="showVehiculo" component={ShowVehiculo} />
		</Stack.Navigator>
	);
};
export default VehiculosStack;
