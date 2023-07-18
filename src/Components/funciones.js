import Toast from "react-native-root-toast";

export const showToast = (titulo, bgColor) => {
	Toast.show(titulo, {
		duration: Toast.durations.LONG,
		position: 70,
        backgroundColor:bgColor,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
	});
};
