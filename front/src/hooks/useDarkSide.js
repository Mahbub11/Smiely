
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleMode } from "../redux/actions";

export default function useDarkSide() {
	const [theme, setTheme] = useState(localStorage.theme);
	const colorTheme = theme === "dark" ? "light" : "dark";
	const mode= useSelector(state=>state.app.common.dark)
	
  
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
		
	}, [theme, colorTheme]);

	return [colorTheme, setTheme]
}
