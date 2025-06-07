'use client'

import Hero from "./components/hero/hero";
import NhisDetails from "./components/nhis details/nhisDetails";
import { useContext } from "react";
import { mainContext } from "../context/context";
import Disposition from "./components/disposition/disposition";
import VerificationSelection from "./components/verification selection/verificationSelection";
import Main from "./components/main/main";

export default function Home() {
	const { searchValue, setSearchValue, setShowNhisDetails, showNhisDetails } = useContext(mainContext)
	return (
		<>
			<NhisDetails />
			<Disposition />
			<Main />
		</>
	);
}
