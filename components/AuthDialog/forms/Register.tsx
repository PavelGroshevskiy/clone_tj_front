import { Button } from "@material-ui/core";
import { setCookie } from "nookies";
import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../FormField";
import { useForm, FormProvider } from "react-hook-form";
import { registerSchema } from "../../../utils/yupSchemas";
import { userApi } from "../../../utils/api/index";
import { createUserDto } from "../../../utils/api/types";

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
	const [errorMessage, setErrorMessage] = React.useState("");
	const form = useForm<IRegister>({
		mode: "onChange",
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = async (dto: createUserDto) => {
		try {
			const data = await userApi.register(dto);
			setCookie(null, "authToken", data.authToken, {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			});
			setErrorMessage("");
		} catch (err) {
			err.response && setErrorMessage(err.response.data.message);
		}
	};

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
						disabled={!form.formState.isValid || form.formState.isSubmitting}
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
