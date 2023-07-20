import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioSiniestro from "../../Screen/Client/siniestros/InicioSiniestro";
import RegistroSiniestro from "../../Screen/Client/siniestros/RegistroSiniestro";

const Stack = createNativeStackNavigator();

const SiniestroStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="inicioSiniestro">
			<Stack.Screen name="inicioSiniestro" component={InicioSiniestro} />
			<Stack.Screen name="registroSiniestro" component={RegistroSiniestro} />
		</Stack.Navigator>
	);
};
export default SiniestroStack;
