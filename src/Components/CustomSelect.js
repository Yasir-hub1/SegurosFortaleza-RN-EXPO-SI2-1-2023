import React from "react";

import { SelectList } from "react-native-dropdown-select-list";

const CustomSelect = ({
	data,
	search,
	placeholder,
	searchPlaceholder,
	save,
	notFoundText,
	setSelected,
	dropdownStyles,
	maxHeight,
}) => {
	return (
		<>
			<SelectList
				setSelected={val => setSelected(val)}
				data={data}
				search={search}
				placeholder={placeholder}
				searchPlaceholder={searchPlaceholder}
				save={save}
				notFoundText={notFoundText}
				dropdownStyles={dropdownStyles}
				// dropdownItemStyles={{width:"150%",zIndex:990,display:"flex",position:"absolute"}}
				maxHeight={maxHeight}
			/>
		</>
	);
};

export default CustomSelect;
