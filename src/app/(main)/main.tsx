'use client'

import Hero from "./components/hero/hero";
import NhisDetails from "./components/nhis details/nhisDetails";
import Disposition from "./components/disposition/disposition";
import VerificationSelection from "./components/verification selection/verificationSelection";
import Main from "./components/main/main";

export default function Home() {
	return (
		<>
			<Disposition />
			<Main />
		</>
	);
}
