import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
    const router = useRouter();
    const [formState, setFormState] = useState({
        login_identifier_input: "",
        login_password_input: "",
    });

    function handleFormChange(evt: any) {
        const name = evt.target.name;
        const value = evt.target.value;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    function handleUserLoginSubmission(evt: SyntheticEvent) {
        evt.preventDefault();

        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(formState),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            return resp.json();
        })
        .then(resp => {
            if(resp.data.valid) {
                router.push("/profile");
            }
        })
        .catch(err => console.error(`UI ERR: ${err}`))
    };
    
    return(
        <form className={styles.login_form} name="user_login_form" onSubmit={handleUserLoginSubmission}>
            <label>Enter your email address or username:
                <input
                    className="login_identifier_input"
                    name="login_identifier_input"
                    value={formState.login_identifier_input}
                    type="text"
                    placeholder="Enter your email or user handle"
                    onChange={handleFormChange}
                    required />
            </label>

            <label>Enter your password:
                <input
                    className="login_password_input"
                    name="login_password_input"
                    value={formState.login_password_input}
                    type="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                    required />
            </label>
            <button type="submit" className="login_submit_button">Login</button>
        </form>
    )
}

export default Login;