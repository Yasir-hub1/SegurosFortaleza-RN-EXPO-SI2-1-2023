import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioPago from "../../Screen/Client/pagos/InicioPago";

const Stack = createNativeStackNavigator();

const PagoStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="inicioPago" component={InicioPago} />
		</Stack.Navigator>
	);
};
export default PagoStack;
