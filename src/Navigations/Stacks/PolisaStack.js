import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioPolisa from "../../Screen/Client/polisa/InicioPolisa";

const Stack = createNativeStackNavigator();

const PolisaStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="inicioPolisa" component={InicioPolisa} />
		</Stack.Navigator>
	);
};
export default PolisaStack;
