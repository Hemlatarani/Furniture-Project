"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/thankyou");
        }, 3000);
    }, []);

    return (
        <h1>Thank You...</h1>
    );
}
