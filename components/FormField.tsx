import { TextField } from "@material-ui/core";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
	name: string;
	label: string;
}

const FormField: FC<FormFieldProps> = ({ label, name }) => {
	const { register, formState } = useFormContext();
	return (
		<TextField
			{...register(name)}
			name={name}
			className="mb-20"
			size="small"
			label={label}
			variant="outlined"
			// helperText={formState.errors[name]?.message}
			error={!!formState.errors[name]?.message}
			fullWidth
		/>
	);
};

export default FormField;
