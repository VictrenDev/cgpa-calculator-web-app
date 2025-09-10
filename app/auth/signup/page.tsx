"use client";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signup() {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!firstName || !lastName || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        try {
            setIsSigningUp(true);

            // Show loading toast
            const loadingToast = toast.loading("Creating your account...");

            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("password", password);

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData,
            });

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            if (res.ok) {
                const { email: userEmail, password: userPassword } = await res.json();

                toast.success("Account created successfully! Logging you in...");

                const result = await signIn("credentials", {
                    email: userEmail,
                    password: userPassword,
                    redirect: false,
                });

                if (result?.error) {
                    toast.error("Login failed after signup. Please try logging in manually.");
                    router.push("/auth/login");
                } else {
                    router.push("/dashboard");
                }
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <section className="w-full min-h-[100dvh] fixed top-0 bg-gray-300/30 flex justify-center items-center p-4">
            <div className="w-full max-w-md p-6 bg-white rounded-xl text-gray-700 shadow-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h1>

                <form onSubmit={handleSubmit} className="text-sm md:text-base space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="text-sm font-medium">
                                First Name
                            </label>
                            <input
                                ref={firstNameRef}
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="input-default-style"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="text-sm font-medium">
                                Last Name
                            </label>
                            <input ref={lastNameRef} name="lastName" type="text" placeholder="Last Name" className="input-default-style" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <input ref={emailRef} type="email" name="email" placeholder="Email Address" className="input-default-style" required />
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
                                required
                                minLength={8}
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

                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className={`w-full p-3 rounded-lg flex justify-center items-center text-white font-medium ${
                            isSigningUp ? "bg-gray-800" : "bg-black"
                        } hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md mt-4 cursor-pointer`}>
                        {isSigningUp ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?
                    <Link href="/auth/login" className="ml-1 underline font-medium">
                        Login
                    </Link>
                </p>

                {/* Optional: Social login buttons */}
                {/* <div className="flex justify-between gap-6 my-6 items-center">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <p className="text-gray-500 text-xs whitespace-nowrap w-fit">or register with</p>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                </div>
                <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="border border-gray-300 rounded-md w-full p-2 flex items-center justify-center gap-2 transition-colors duration-200 ease-in-out cursor-pointer hover:bg-gray-50"
                >
                    <Image src="/search.png" alt="Google logo" width={24} height={24} />
                    Google
                </button> */}
            </div>
        </section>
    );
}
