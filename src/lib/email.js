"use server";

import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { z } from "zod";
// import { formSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData) => {
    try {
        // TODO: Add this emailFormData to some database

        const { error } = await resend.emails.send({
            from: `Tanishq <${process.env.RESEND_FROM_EMAIL}>`,
            to: [emailFormData.email],
            subject: "Welcome",
            react: EmailTemplate({ name: emailFormData.name }),
        });


        if (error) {
            console.error("ERROR IS", error);
            throw error;
        }
    } catch (e) {
        console.error("SECOND ERROR IS", e);
        throw e;
    }
};