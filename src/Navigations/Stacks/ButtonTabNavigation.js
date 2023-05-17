import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import VehiculosStack from "./VehiculosStack";
import PolisaStack from "./PolisaStack";
import PagoStack from "./PagoStack";
import SiniestroStack from "./SiniestroStack";
import PerfilStack from "./PerfilStack";

const btnTabs = createBottomTabNavigator();

const TabBar = ({ appName }) => {
	const navigation = useNavigation();
	return (
		<btnTabs.Navigator
			initialRouteName="Vehiculos"
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ focused }) => verIcon(route, focused),
				tabBarStyle: {
					alignItems: "center",
					backgroundColor: "#ffffff",
					paddingTop: 5,
					position: "absolute",
					overflow: "hidden",
				},
			})}>
			<btnTabs.Screen
				name="Vehiculos"
				component={VehiculosStack}
				options={{
					headerTitle: "Bienvenido",
					// headerTitleAlign: "center",
					headerShown: true,
				}}
			/>
			<btnTabs.Screen
				name="Polisa"
				component={PolisaStack}
				/* options={{
					
					headerShown: false,
				}} */
			/>

			<btnTabs.Screen
				name="Pagos"
				component={PagoStack}
				options={{
					// headerTitle: "Contratos",
					// headerTitleAlign: "center",
					headerShown: true,
				}}
			/>

			<btnTabs.Screen
				name="Siniestros"
				component={SiniestroStack}
				options={{
					// headerTitle: "Contratos",
					// headerTitleAlign: "center",
					headerShown: true,
				}}
			/>

			<btnTabs.Screen
				name="Perfil"
				component={PerfilStack}
				options={{
					// headerTitle: "Contratos",
					// headerTitleAlign: "center",
					headerShown: true,
				}}
			/>
		</btnTabs.Navigator>
	);
};
export default TabBar;

const verIcon = (route, focused) => {
	let icon = "";
	switch (route.name) {
		case "Vehiculos": {
			icon = "car-sport";
			break;
		}
		case "Polisa": {
			icon = "card-sharp";
			break;
		}
		case "Pagos": {
			icon = "md-card-outline";
			break;
		}
		case "Siniestros": {
			icon = "car-sport";
			break;
		}
		case "Perfil": {
			icon = "person-sharp";
			break;
		}
	}
	return (
		<Icon
			name={icon}
			type="ionicon"
			color={focused ? "#3498db" : "#2f3542"}
			style={{ marginTop: 2 }}
		/>
	);
};

/* const menuIcon=(navigation)=>{
  return(
    <Icon
    name="menu"
    type="ionicon"
    size={30}
    color="black"
    style={{marginTop:2,marginRight:10}}
    onPress={()=>navigation.toggleDrawer()}

    />
  );

} */
