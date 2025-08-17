import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export default function TermsOfService() {
    const effectiveDate = "August 17, 2025 (IST)";

    const termsSections = [
        {
            id: "acceptance",
            title: "1) Acceptance of Terms",
            content:
                'By accessing or using CLARIOAI (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.',
        },
        {
            id: "eligibility",
            title: "2) Eligibility",
            content:
                "You must be of legal age in your country to form a binding contract or use CLARIOAI with parental/guardian or institutional consent if underage.",
        },
        {
            id: "usage",
            title: "3) Use of Service",
            content:
                "You agree to use the Service only for lawful purposes. Do not misuse features, attempt to disrupt systems, or bypass limits.",
        },
        {
            id: "content",
            title: "4) User Content",
            content:
                "You are responsible for any text, syllabus, or content you submit. Do not include sensitive or unlawful material. CLARIOAI does not claim ownership of your study inputs.",
        },
        {
            id: "limitations",
            title: "5) Limitations",
            content:
                "The Service is provided free with daily usage limits. Excessive use may be temporarily restricted to ensure fair access for all users.",
        },
        {
            id: "thirdparty",
            title: "6) Third-Party Services",
            content:
                "CLARIOAI integrates with external platforms (e.g., YouTube). Your use of such features is subject to their respective Terms of Service and Privacy Policies.",
        },
        {
            id: "termination",
            title: "7) Termination",
            content:
                "We may suspend or terminate access if you violate these Terms or abuse the Service. You may also discontinue use at any time.",
        },
        {
            id: "disclaimer",
            title: "8) Disclaimer of Warranties",
            content:
                'The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted, error-free operation or accuracy of generated content.',
        },
        {
            id: "liability",
            title: "9) Limitation of Liability",
            content:
                "To the maximum extent permitted by law, CLARIOAI and its creators are not liable for indirect, incidental, or consequential damages resulting from use of the Service.",
        },
        {
            id: "changes",
            title: "10) Changes to Terms",
            content:
                "We may update these Terms from time to time. Continued use of the Service after changes indicates acceptance of the revised Terms.",
        },
        {
            id: "contact",
            title: "11) Contact",
            content:
                "For questions regarding these Terms, contact us at contact-clarioai@gmail.com (replace with your official email).",
        },
    ];


    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-neutral-100">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <header className="mb-8 space-y-3 text-center">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300 shadow-sm">
                        Terms of Service
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-styrene text-[#a9d47f]">CLARIOAI Terms of Service</h1>
                    <p className="text-sm text-neutral-400">Effective: {effectiveDate}</p>
                </header>

                <Card className="border-neutral-800 bg-neutral-900/60 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neutral-100">
                            <FileText className="h-5 w-5" />
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-neutral-300">
                        <p>
                            These Terms govern your use of CLARIOAI. Please read them carefully. By accessing our Service, you confirm your understanding and agreement.
                        </p>
                    </CardContent>
                </Card>

                <div className="my-8">
                    <Separator className="bg-neutral-800" />
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                    {termsSections.map((section) => (
                        <AccordionItem
                            key={section.id}
                            value={section.id}
                            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4"
                        >
                            <AccordionTrigger className="text-neutral-100 font-styrene">{section.title}</AccordionTrigger>
                            <AccordionContent className="text-neutral-300">{section.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <footer className="mt-10 text-center text-xs text-neutral-500">
                    <p>
                        This Terms of Service page is for general guidance only and does not substitute legal advice. For specific requirements, consult your legal counsel.
                    </p>
                </footer>
            </div>
        </div>
    );
}
