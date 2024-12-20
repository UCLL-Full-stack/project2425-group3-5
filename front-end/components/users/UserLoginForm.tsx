import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";


const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [UsernameError, setUserNameError] = useState<string | null>(null);
    const [PasswordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setUserNameError(null);
        setPasswordError(null)
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!username && username.trim() === "") {
            setUserNameError("User name is required.");
            result = false;
        }
        if (!password && password.trim() === "") {
            setPasswordError("Password is required");
            result = false;
        }
        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        clearErrors();
        
        if (!validate()){
            return;
        }

        const loginUser = {
            username: username,
            password: password,
        }
        const response = await UserService.login(loginUser);
        if (response.status === 200){
            setStatusMessages([
                {
                    message: "Login Success",
                    type: "success",
                }
            ])
            const user = await response.json();
            sessionStorage.setItem("loggedInUser", JSON.stringify({
                username: user.username,
                token: user.token,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            }))
            setTimeout(() => {
                router.push("/");
            }, 2000)
        }
        else {
            setStatusMessages([
                {
                    message: "Login error",
                    type: "error",
                }
            ])
        }
    }
    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    Username:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="userNameInput"
                        type="text"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                            setUserNameError(null);
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                </div>
                {UsernameError && <p className="text-red-800">{UsernameError}</p>}

                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="passwordInput"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setUserNameError(null);
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                </div>
                {PasswordError && <p className="text-red-800">{PasswordError}</p>}
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
            <tr>
                <th className="text-center">username</th>
                <th className="text-center">password</th>
                <th className="text-center">role</th>
            </tr>
            </thead>
            <tbody>
                    <tr key={1}>
                            <td className="text-center">admin</td>
                            <td className="text-center">admin123</td>
                            <td className="text-center">admin</td>
                    </tr>
            </tbody>
            </table>
        </>
    );
};

export default UserLoginForm;
