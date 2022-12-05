import { TextField, Button } from "@material-ui/core";
import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../FormField";
import { useForm, FormProvider } from "react-hook-form";
import { registerSchema } from "../../../utils/yupSchemas";

interface IRegister {
	email: string;
	password: number;
	fullname: string;
}

interface RegisterFormProps {
	onRegisterOpen: () => void;
	openLogin: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onRegisterOpen, openLogin }) => {
	const form = useForm<IRegister>({
		mode: "onChange",
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = (data: IRegister) => console.log(data);
	console.log(!form.formState.isValid);
	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField name="fullName" label="Имя и фамилия" />
					<FormField name="email" label="Почта" />
					<FormField name="password" label="Пароль" />
					<Button
						type="submit"
						onClick={onRegisterOpen}
						color="primary"
						variant="contained"
						disabled={!form.formState.isValid}
					>
						Зарегестрироваться
					</Button>
					<Button onClick={openLogin} color="primary" variant="text">
						Войти
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default RegisterForm;
