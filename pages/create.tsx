import type { NextPage } from "next";
import styles from "../styles/CreateUser.module.css";

const CreateUser: NextPage = () => {
    return(
        <form className={styles.create_user_form} action="/api/create" method="post">
            <label>Enter your email address:
                <input
                    className="create_user_email_input"
                    name="create_user_identifier_input"
                    type="text"
                    placeholder="user@address.com"
                    required />
            </label>

            <label>Create a unique and permanent user handle:
                @
                <input
                    className="create_user_handle_input"
                    name="create_user_handle_input"
                    type="text"
                    placeholder="myName"
                    required />
            </label>

            <label>Create a nickname. This can be changed at any time and is not unique to each user:
                <input
                    className="create_user_nickname_input"
                    name="create_user_nickname_input"
                    type="text"
                    placeholder="myName"
                    required />
            </label>

            <label>Enter your password:
                <input
                    className="create_user_password_input"
                    name="create_user_password_input"
                    type="password"
                    placeholder="Password"
                    required />
            </label>

            <label>Confirm your password:
                <input
                    className="create_user_password_input"
                    name="create_user_password_input"
                    type="password"
                    placeholder="Type the same password"
                    required />
            </label>
            <button type="submit" className="login_submit_button">Create User</button>
        </form>
    )
}

export default CreateUser;