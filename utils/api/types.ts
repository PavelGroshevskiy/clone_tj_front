export type loginUserDto = {
	email: string;
	password: string;
};

export type createUserDto = {
	fullName: string;
} & loginUserDto;

export type ResponseUser = {
	createdAt: string;
	email: string;
	fullName: string;
	id: number;
	commentsCount?: number;
	token: string;
	updatedAt: string;
};
