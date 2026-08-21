import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../context/Maincontext";

export default function Login() {
    const navigate = useNavigate();
    const { id, setid } = useContext(LoginContext);

    const [error, seterror] = useState("");
    const apibaseurl = import.meta.env.VITE_APIBASEURL;

    const checklogin = async (e) => {
        e.preventDefault();
        seterror("");

        const formValue = new FormData(e.target);

        try {
            const res = await axios.post(`${apibaseurl}/auth/login`, formValue);
            const finalRes = res.data;

            if (finalRes.status === 0) {
                seterror(finalRes.message);
            } else {
                // If your backend sends token
                if (finalRes.token) {
                    localStorage.setItem("token", finalRes.token);
                }

                setid(finalRes.admin._id);
            }
        } catch (err) {
            seterror("Server error. Please try again.");
        }
    };

    useEffect(() => {
        if (id) {
            navigate("/dashboard");
        }
    }, [id, navigate]);

    return (
        <section className="bg-gray-50 dark:bg-gray-800 shadow-2xl pb-10">
            <div className="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">

                <div className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                        src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
                        alt="Logo"
                        className="h-[120px] w-[120px] mr-2"
                    />
                    Welcome!
                </div>

                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-6 sm:p-8">

                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <form onSubmit={checklogin} className="space-y-4">

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    id="email"
                                    required
                                    placeholder="name@company.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="adminPassword"
                                    id="password"
                                    required
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 text-gray-500 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <span className="text-blue-600 hover:underline cursor-pointer">
                                    Forgot password?
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-red-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Login
                            </button>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                                    Sign up
                                </span>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}