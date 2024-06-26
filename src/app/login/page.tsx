"use client";

import React from "react";
import { authenticate } from "@/app/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../layout";
import { useRouter } from "next/navigation";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Image from "next/image";
export type User = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { username, setUsername } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const router = useRouter();

  async function submit() {
    const data: User = {
      name: name,
      email: email,
      password: password,
    };
    const reponse = await fetch("/api/connection", {
      method: "POST",
      body: JSON.stringify(data), // data is the data i wrote during the connection data ={name: '', email: 'd@gmail.com', password: 'd'}
    });
    const user: User = await reponse.json(); // user = {id: 9, email: 'd@gmail.com', password: '$2a$10$ef8NqhrjtlF8RyPwjP1rluD9v.MIfbn8CZFFUQxF1/6CMJDWpZff6', name: 'd'}
    // debugger;
    if (user) {
      setUsername(user.name);
      router.push("/");
    }
    // console.log(data);
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="
        relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10
      "
      >
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Login</h2>
          <p className="mt-2 text-gray-500">
            Sign in below to access your account
          </p>
          {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            height={100}
            width={100}
            className="mx-auto w-auto"
            src="/images/logo.png"
          />
        </div> */}
          <form action={dispatch} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 border rounded-md"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        /> */}
            <div className="relative">
              <input
                className="p-2 border rounded-md w-full"
                type={type}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </span>
            </div>
            <div className="my-6">
              <button
                type="submit"
                onClick={submit}
                className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-3 text-xs flex justify-between">
            <p className="text-center text-sm text-gray-500">
              Don&#x27;t have an account yet? &nbsp;
              <a
                href="#!"
                onClick={() => {
                  router.push("/login/createAccount");
                }}
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign up
              </a>
              .
            </p>
            {/* <p>If you don't have an account..</p>

            <button
              onClick={() => {
                router.push("/login/createAccount");
              }}
              className="py-2 px-5 bg-white border rounded-md"
            >
              Register
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
function setUsername(arg0: string) {
  throw new Error("Function not implemented.");
}
