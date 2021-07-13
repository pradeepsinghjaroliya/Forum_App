import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import "./Header.css";

function Header() {
	const { user } = useContext(UserContext);
	return (
		<header className="header_container">
			<Link to={"/"} className="LogoLink logo">
				<FontAwesomeIcon icon={faCommentAlt} size="2x" />
				<span>Forum</span>
			</Link>
			{user && (
				<Link to={"/users/" + user.id} className="profile profile_link">
					{user.name || user.email}
				</Link>
			)}
			{!user && (
				<div>
					<Link to={"/login"} className="profile profile_link">
						Log in
					</Link>
					<Link to={"/register"} className="profile profile_link">
						Register
					</Link>
				</div>
			)}
		</header>
	);
}

export default Header;
