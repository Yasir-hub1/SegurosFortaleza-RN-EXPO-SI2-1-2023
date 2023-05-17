import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../../Screen/Client/Inicio";

const Stack = createNativeStackNavigator();

const ClienteStack = () => {
	<Stack.Navigator screenOptions={{ headerShown: true }}>
		

		<Stack.Screen
			name="Inicio"
			component={Inicio}
			options={{
				headerTitleAlign: "center",
				headerTitle: "Inicio",
				headerTintColor: "#ff7f50",
			}}
		/>
	</Stack.Navigator>;
};
export default ClienteStack;
