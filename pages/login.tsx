import type { NextPage } from "next";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
    return(
        <form className={styles.login_form} action="/api/login" method="post">
            <label>Enter your email address or username:
                <input
                    className="login_identifier_input"
                    name="login_identifier_input"
                    type="text"
                    placeholder="Email or username"
                    required />
            </label>

            <label>Enter your password:
                <input
                    className="login_password_input"
                    name="login_password_input"
                    type="password"
                    placeholder="Password"
                    required />
            </label>
            <button type="submit" className="login_submit_button">Login</button>
        </form>
    )
}

export default Login;