import AuthNavigation from "./AuthNavigation";
import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import ButtonTabNavigation from "../Navigations/Stacks/ButtonTabNavigation";
import AuthStack from "./Stacks/AuthStack";

export default function Wrapper({ userToken }) {
	return (
		<NavigationContainer>
			<AppNavigation userToken={userToken} />
		</NavigationContainer>
	);
}

const AppNavigation = ({ userToken }) => {
	let user = false;

	return <>{user == true ? <AuthStack /> : <ButtonTabNavigation />}</>;
};
