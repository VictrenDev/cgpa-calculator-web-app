"use client";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export default function ResetPassword() {
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPassword = passwordRef.current?.value;
        const confirmNewPassword = confirmPasswordRef.current?.value;

        if (!newPassword || !confirmNewPassword) {
            toast.error("Email and password are required");
            return;
        }
        try {
            const res = await axios.post("/api/auth/reset-password", {
                token,
                password: passwordRef.current?.value,
            });
            if (res.data.success) {
                toast.success("Password reset was successful. Redirecting to login page...");
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
                            <label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </label>
                            <input
                                ref={passwordRef}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="New Password   "
                                className="input-default-style"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    ref={confirmPasswordRef}
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input-default-style pr-10"
                                />
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
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Password...{" "}
                            </>
                        ) : (
                            "Create New Password"
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
