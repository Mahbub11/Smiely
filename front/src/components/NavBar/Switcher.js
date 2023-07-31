import { useState } from "react";
import { useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from '../../hooks/useDarkSide'
import useSettings from '../../hooks/useSettings';
import { ToggleMode } from "../../redux/actions";

export default function Switcher() {
	const [colorTheme, setTheme] = useDarkSide();
	const { onToggleMode } = useSettings();
	const dispatch= useDispatch()
	const [darkSide, setDarkSide] = useState(
		colorTheme === "light" ? true : false
	);

	const toggleDarkMode = (checked) => {
		setTheme(colorTheme);
		setDarkSide(checked);
		onToggleMode()
		dispatch(ToggleMode())
	};

	return (
		<>
			<DarkModeSwitch
				style={{ marginBottom: "2rem" }}
				checked={darkSide}
				onChange={toggleDarkMode}
				size={25}
			/>
		</>
	);
}
