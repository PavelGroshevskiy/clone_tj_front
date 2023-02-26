import { GetServerSideProps } from "next";
import { Post } from "../components/Post";
import { MainLayout } from "../layouts/MainLayout";
import { wrapper } from "../redux/store";
import { parseCookies } from "nookies";
import { userApi } from "../utils/api";
import { setUserData } from "../redux/slices/user";

export default function Home() {
	return (
		<MainLayout>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		try {
			const { authToken } = parseCookies(context);
			const userData = await userApi.getMe(authToken);
			store.dispatch(setUserData(userData));

			return { props: {} };
		} catch (err) {
			console.log(err);
			return { props: {} };
		}
	}
);
