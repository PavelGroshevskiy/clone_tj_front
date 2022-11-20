import { Button } from "@material-ui/core";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/yupSchemas";
import FormField from "../../FormField";

interface ILogin {
	email: string;
	password: number;
}

interface LoginFormProps {
	onRegisterOpen: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onRegisterOpen }) => {
	const form = useForm<ILogin>({
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = (data: ILogin) => console.log(data);

	return (
		<>
			<div>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField name="email" label="Почта" />
						<FormField name="password" label="Пароль" />
						<Button
							disabled={!form.formState.isValid}
							type="submit"
							color="primary"
							variant="contained"
						>
							Войти
						</Button>
						<Button
							onClick={onRegisterOpen}
							color="primary"
							variant="outlined"
							className="ml-10"
						>
							Регистрация
						</Button>
					</form>
				</FormProvider>
			</div>
		</>
	);
};

export default LoginForm;
