import axios from "axios";
import { createUserDto, loginUserDto, ResponseUser } from "./types";

const instance = axios.create({
	baseURL: "http://localhost:3001/",
});

export const userApi = {
	async register(dto: createUserDto) {
		const { data } = await instance.post<createUserDto, { data: ResponseUser }>(
			"auth/register",
			dto
		);
		return data;
	},

	async login(dto: loginUserDto) {
		const { data } = await instance.post<loginUserDto, { data: ResponseUser }>(
			"auth/login",
			dto
		);
		return data;
	},
};
