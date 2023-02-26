import { Button } from "@material-ui/core";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/yupSchemas";
import FormField from "../../FormField";
import { loginUserDto } from "../../../utils/api/types";
import { userApi } from "../../../utils/api";
import { setCookie } from "nookies";
import Alert from "@material-ui/lab/Alert";
import { useAppDispatch } from "../../../redux/hooks.";
import { setUserData } from "../../../redux/slices/user";

interface ILogin {
	email: string;
	password: number;
}

interface LoginFormProps {
	onRegisterOpen: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onRegisterOpen }) => {
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = React.useState("");
	const form = useForm<ILogin>({
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (dto: loginUserDto) => {
		try {
			const data = await userApi.login(dto);
			setCookie(null, "authToken", data.authToken, {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			});
			setErrorMessage("");
			dispatch(setUserData(data));
		} catch (err) {
			err.response && setErrorMessage(err.response.data.message);
		}
	};

	return (
		<>
			<div>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField name="email" label="Почта" />
						<FormField name="password" label="Пароль" />
						{errorMessage && (
							<Alert severity="warning" className="mb-20">
								{errorMessage}
							</Alert>
						)}
						<Button
							disabled={!form.formState.isValid || form.formState.isSubmitting}
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
