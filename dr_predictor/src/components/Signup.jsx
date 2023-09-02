import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    logout,
  } from "./firebase";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [medhist, setMedhist] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        logout()
        if (user) navigate("/home");
      }, [user, loading]);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DR Predictor</span>
                </a>
                </div>
            </nav>
            <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                    </label>
                    <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                    DOB
                    </label>
                    <div className="mt-2">
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                    Gender
                    </label>
                    <div className="mt-2">
                    <select id="gender" onChange={(e) => setGender(e.target.value)} required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    > 
                        <option value="">Select Gender</option>
                        <option name="male"> Male</option>
                        <option name="female">Female</option>
                        <option name="other">Other</option>
                    </select>
                    </div>
                </div>

            {/* <div>
                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                    </label>
                    <div className="mt-2">
                        <select
                        id="gender"
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            */}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Previous Medical History
                    </label>
                    <div className="mt-2">
                    <input
                        id="medhist"
                        name="medhist"
                        type="text"
                        onChange={(e) => setMedhist(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    onClick={() => registerWithEmailAndPassword(name, email, password, dob, gender, medhist)}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                </div>

            </div>
            </div>
        </>
    )
}

export default Signup