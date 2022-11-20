import React from "react";

import { Typography } from "@material-ui/core";

import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import styles from "./AuthDialog.module.scss";
import Main from "./forms/Main";

import LoginForm from "./forms/Login";
import RegisterForm from "./forms/Register";

interface AuthDialogProps {
	onClose: () => void;
	open: boolean;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, open }) => {
	const [formType, setFormType] = React.useState<"main" | "login" | "register">("main");

	return (
		<Dialog fullWidth onClose={onClose} maxWidth="xs" open={open}>
			<DialogContent>
				<DialogContentText>
					<div className={styles.content}>
						<Typography className={styles.title}>
							{formType === "main" ? (
								"Вход в TJ"
							) : (
								<p onClick={() => setFormType("main")} className={styles.backTitle}>
									<ArrowBackIcon /> К авторизации
								</p>
							)}
						</Typography>
						{formType === "main" && <Main onOpenLogin={() => setFormType("login")} />}
						{formType === "login" && (
							<LoginForm onRegisterOpen={() => setFormType("register")} />
						)}
						{formType === "register" && (
							<RegisterForm
								onRegisterOpen={() => setFormType("register")}
								openLogin={() => {
									setFormType("login");
								}}
							/>
						)}
					</div>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};
