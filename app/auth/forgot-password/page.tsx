"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSigningIn(true);
            const res = await axios.post("/api/auth/forgot-password", {
                email: emailRef.current?.value,
            });

            if (res.data?.success) {
                toast.success("Password reset link sent. Please check your email.");
                setDisabled(true);
                setCountdown(20); // start 20s countdown
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                toast.error("Sorry! An unexpected error occurred");
            }
        } finally {
            setIsSigningIn(false);
        }
    };

    // countdown effect
    useEffect(() => {
        if (!disabled || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setDisabled(false); // re-enable when done
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [disabled, countdown]);

    return (
        <form onSubmit={handleResetPassword} className="w-full min-h-[100dvh] fixed top-0 bg-gray-300/30 flex justify-center items-center">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-xl text-gray-700 container">
                <p className="text-3xl text-gray-800 mb-8 text-center">Reset Password</p>

                <div className="text-sm md:text-base">
                    <fieldset className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </label>
                            <input ref={emailRef} type="email" name="email" placeholder="Email Address" className="input-default-style" />
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        disabled={isSigningIn || disabled}
                        className={`w-full p-3 rounded-lg flex justify-center items-center text-white font-medium ${
                            isSigningIn ? "bg-gray-800" : "bg-black"
                        } hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md mt-8 mb-4 cursor-pointer`}>
                        {isSigningIn ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                            </>
                        ) : disabled ? (
                            `Wait ${countdown}s`
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
