"use client";
import { useState } from "react";
import { deleteUser } from "./actions/actions";

export default function DeleteAccount() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUser();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };
    function toggleVisibility(e: React.MouseEvent) {
        e.preventDefault();
        if (e.target === e.currentTarget) setIsOpen((prev) => !prev);
    }

    return (
        <>
            <button
                onClick={toggleVisibility}
                disabled={isDeleting}
                className="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 hover:cursor-pointer">
                Delete Account
            </button>

            <section
                onClick={toggleVisibility}
                className={`${!isOpen ? "hidden" : ""} w-full h-[100dvh]  fixed top-0 left-0 z-50 bg-gray-300/30 flex justify-center items-center`}>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="w-120 p-4 md:p-8 mx-4 bg-white rounded-xl text-gray-700">
                    <p className="text-lg md:text-xl font-bold mb-4">Delete Account?</p>
                    <p>Are you sure you want to Delete Your Account?</p>
                    <div className="mt-8 flex gap-4 justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="py-3 px-6 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out  hover:cursor-pointer">
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`py-3 px-6 text-sm rounded-lg bg-red-50 ${
                                isDeleting ? "text-red-400 " : "text-red-700 "
                            }  hover:bg-red-100 transition-colors duration-300 ease-in-out hover:cursor-pointer`}>
                            {isDeleting ? "Deleting Account..." : "Delete Account"}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
