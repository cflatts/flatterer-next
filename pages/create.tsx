import type { NextPage } from "next";
import type { IUser } from "../db/models/user";
import { SyntheticEvent, useState} from "react";
import styles from "../styles/CreateUser.module.css";

const CreateUser: NextPage = () => {

    const [formState, setFormState] = useState({
        create_user_email_input: "",
        create_user_handle_input: "",
        create_user_nickname_input: "",
        create_user_password_input: "",
        create_user_password_confirmation_input: ""
    });

    const [userHandleUnique, setHandleUniqueness] = useState(true);
    const [emailUnique, setEmailUnique] = useState(true);

    function handleFormChange(evt: any) {
        evt.preventDefault();

        const name = evt.target.name;
        const value = evt.target.value;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        const validateData = {
            [name]: value
        }
        fetch("/api/validate/user", {
            method: "POST",
            body: JSON.stringify(validateData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            evt.target.name === "create_user_email_input" ? setEmailUnique(resp.data.unique) : setHandleUniqueness(resp.data.uniq);
        }).catch(err => console.error(`UI ERR: ${err}`))
    };

    
    function handleCreateUserSubmission(evt: SyntheticEvent) {
        evt.preventDefault();

        let requestParams: IUser = {
            userHandle: formState.create_user_handle_input,
            nickname: formState.create_user_nickname_input,
            email: formState.create_user_email_input,
            password: formState.create_user_password_input,
        };
         
        fetch("/api/create/user", {
            method: "POST",
            body: JSON.stringify(requestParams),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => {
            return resp.json();
        })
        .then((resp) => {
            window.localStorage.setItem("data", JSON.stringify(resp.data));
        })
        .catch(err => console.error(`UI ERR: ${err}`))
    };

    return(
        <form id="create_user_form" name="create_user_form" className={styles.create_user_form} onSubmit={handleCreateUserSubmission}>
            <label>Enter your email address:
                <input
                    className="create_user_email_input"
                    name="create_user_email_input"
                    value={formState.create_user_email_input}
                    type="email"
                    placeholder="user@address.com"
                    onChange={handleFormChange}
                    required />
            </label>

            <label>Create a unique and permanent user handle:
                @
                <input
                    className="create_user_handle_input"
                    name="create_user_handle_input"
                    value={formState.create_user_handle_input}
                    type="text"
                    placeholder="myName"
                    onChange={handleFormChange}
                    required />
            </label>

            <label>Create a nickname. This can be changed at any time and is not unique to each user:
                <input
                    className="create_user_nickname_input"
                    name="create_user_nickname_input"
                    value={formState.create_user_nickname_input}
                    type="text"
                    placeholder="myName"
                    onChange={handleFormChange}
                    required />
            </label>

            <label>Enter your password:
                <input
                    className="create_user_password_input"
                    name="create_user_password_input"
                    value={formState.create_user_password_input}
                    type="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                    required />
            </label>

            <label>Confirm your password:
                <input
                    className="create_user_password_confirmation_input"
                    name="create_user_password_confirmation_input"
                    value={formState.create_user_password_confirmation_input}
                    type="password"
                    placeholder="Type the same password"
                    onChange={handleFormChange}
                    required />
            </label>
            <button type="submit" className="login_submit_button">Create User</button>
        </form>
    )
}

export default CreateUser;