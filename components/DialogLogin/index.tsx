import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@material-ui/core";
import React from "react";

type Props = {};

const DialogLogin = (props: Props) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Dialog
				fullScreen
				open
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Let Google help apps determine location. This means sending anonymous location
						data to Google, even when no apps are running.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Disagree
					</Button>
					<Button onClick={handleClose} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DialogLogin;
