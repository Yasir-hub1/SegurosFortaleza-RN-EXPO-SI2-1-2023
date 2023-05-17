import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioPerfil from "../../Screen/Client/perfil/InicioPerfil";

const Stack = createNativeStackNavigator();

const PerfilStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="inicioPerfil">
			<Stack.Screen name="inicioPerfil" component={InicioPerfil} />
		</Stack.Navigator>
	);
};
export default PerfilStack;
