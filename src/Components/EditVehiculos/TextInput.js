import { StyleSheet,TextInput,} from "react-native";
import React from "react";

const CustomInput = ({value,onChangeText,placeholder}) => {
	return (
		<>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
			/>
		</>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
    input: {
		marginBottom: 10,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
	},
});
