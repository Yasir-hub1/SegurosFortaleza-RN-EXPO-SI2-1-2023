import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import ClienteStack from "./ClienteStack";

import React from "react";

const btnTabs = createBottomTabNavigator();
import { useNavigation } from "@react-navigation/native";
import Notificaciones from "../../Screen/Client/Notificaciones";
const TabBar = ({ appName }) => {
	const navigation = useNavigation();
	return (
		<btnTabs.Navigator
			initialRouteName="Cliente"
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
				name="Inicio"
				component={ClienteStack}
				options={{
					headerTitle: "Bienvenido",
					// headerTitleAlign: "center",
					headerShown: true,
				}}
			/>
			<btnTabs.Screen
				name="Notificaciones"
				component={Notificaciones}
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
		case "Inicio": {
			icon = "md-camera-outline";
			break;
		}
		case "Notificaciones": {
			icon = "notifications-circle-outline";
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
