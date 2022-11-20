import * as yup from "yup";

export const loginSchema = yup
	.object({
		email: yup.string().email("Неверный email").required("Обязатльное поле"),
		password: yup.string().min(5, "min 5 symbols").required("Обязатльное поле"),
	})
	.required();

export const registerSchema = yup
	.object({
		fullName: yup.string().required("Обязатльное поле"),
	})
	.concat(loginSchema)
	.required();
