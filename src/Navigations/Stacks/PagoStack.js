import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioPago from "../../Screen/Client/pagos/InicioPago";
import DetallePago from "../../Screen/Client/pagos/DetallePago";
import RealizarPago from "../../Screen/Client/pagos/RealizarPago";

const Stack = createNativeStackNavigator();

const PagoStack = () => {
	return (
		<Stack.Navigator initialRouteName="inicioPago" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="inicioPago" component={InicioPago} />
			<Stack.Screen name="detallePago" component={DetallePago} />
			<Stack.Screen name="realizarPago" component={RealizarPago} />
		
		</Stack.Navigator>
	);
};
export default PagoStack;
