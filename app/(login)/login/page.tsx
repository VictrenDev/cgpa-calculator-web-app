"use client";
import Link from "next/link";
// import Image from "next/image";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }
        try {
            setIsSigningIn(true);
            const result = await signIn("credentials", {
                redirect: false, // We’ll redirect manually
                email,
                password,
            });

            if (result?.error) {
                toast.error("Invalid login details. Please check your login credentials again");
            } else {
                toast.success("Please wait while we log you in...");
                router.push("/dashboard");
            }
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <section className="w-full min-h-[100dvh] fixed top-0 bg-gray-300/30 flex justify-center items-center">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-xl text-gray-700 container">
                <p className="text-3xl text-gray-800 mb-8 text-center">Login</p>

                <form onSubmit={handleSubmit} className="text-sm md:text-base">
                    <fieldset className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </label>
                            <input ref={emailRef} type="email" name="email" placeholder="Email Address" className="input-default-style" />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    ref={passwordRef}
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input-default-style pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    className="cursor-pointer"
                                    checked={showPassword}
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                />
                                <label htmlFor="showPassword" className="text-gray-500 text-sm cursor-pointer">
                                    Show Password
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`w-full p-3 rounded-lg flex justify-center items-center text-white font-medium ${
                            isSigningIn ? "bg-gray-800" : "bg-black"
                        } hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md mt-8 mb-4 cursor-pointer`}>
                        {isSigningIn ? (
                            <>
                                {" "}
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...{" "}
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                    <p className="text-sm text-center text-gray-600 ">
                        Don&apos;t have an account?
                        <u className="inline-block ml-2">
                            <Link href="/signup">Signup</Link>
                        </u>
                    </p>

                    {/* <div className="flex justify-between gap-6 my-4 mt-2 items-center">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <p className="text-gray-300 text-xs whitespace-nowrap w-fit">or login with</p>
                        <div className="w-full h-[1px] bg-gray-300"></div>
                    </div> */}

                    {/* <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="border border-gray-300 rounded-md w-full p-2 flex items-center justify-center gap-2 transition-colors duration-800 ease-in-out">
                        <Image src="/search.png" alt="Google logo" width={24} height={24} />
                        Google
                    </button> */}
                </form>
            </div>
        </section>
    );
}
