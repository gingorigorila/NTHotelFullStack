/* eslint-disable react/jsx-no-undef */
import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate,NavLink } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: "Bạn đã đăng xuất!" } })
	}

	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Thông tin tài khoản
				</Link>
			</li>
			{isLoggedIn && userRole === "ROLE_ADMIN" && (
				<li className="nav-item">
					<NavLink className="nav-link" aria-current="page" to={"/admin"}>
						Admin
					</NavLink>
				</li>
				)}
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				Đăng xuất
			</button>
		</>
	)
}

export default Logout