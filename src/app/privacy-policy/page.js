import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Shield, Cookie, Database, Youtube, Globe, FileText } from "lucide-react";

export default function PrivacyPolicy() {
    const effectiveDate = "August 17, 2025 (IST)";

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-neutral-100">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <header className="mb-8 space-y-3 text-center">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300 shadow-sm">
                        <Shield className="h-3.5 w-3.5" />
                        Privacy First
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-styrene text-[#a9d47f]">
                        CLARIOAI Privacy Policy
                    </h1>
                    <p className="text-sm text-neutral-400">Effective: {effectiveDate}</p>
                </header>

                <Card className="border-neutral-800 bg-neutral-900/60 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neutral-100">
                            <FileText className="h-5 w-5" />
                            Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-neutral-300">
                        <p>
                            CLARIOAI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) helps learners turn scattered materials into a structured study plan.
                            This Privacy Policy explains what data we collect, how we use it, and the choices you have.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>We collect only what&apos;s needed to run the service and improve it.</li>
                            <li>We do <span className="font-semibold">not</span> sell your personal data.</li>
                            <li>You control your content and can request deletion.</li>
                            <li>We integrate with third-party services (e.g., YouTube) to fetch relevant content.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="my-8">
                    <Separator className="bg-neutral-800" />
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                    <AccordionItem value="what-we-collect" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            1) Information we collect
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <div className="grid gap-4">
                                <div className="flex items-start gap-3">
                                    <Database className="mt-1 h-5 w-5 shrink-0 text-neutral-400" />
                                    <div>
                                        <p className="font-medium">Account &amp; basic usage</p>
                                        <ul className="list-disc pl-5">
                                            <li>Account identifiers (e.g., email) if you sign up.</li>
                                            <li>Authentication and session data.</li>
                                            <li>Basic usage events (e.g., features used, rate-limit counters).</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FileText className="mt-1 h-5 w-5 shrink-0 text-neutral-400" />
                                    <div>
                                        <p className="font-medium">Study inputs</p>
                                        <ul className="list-disc pl-5">
                                            <li>Content you provide (e.g., syllabus text, topics, notes).</li>
                                            <li>Generated study plans, progress status, and selections (e.g., chosen videos).</li>
                                        </ul>
                                        <p className="mt-2 text-sm text-neutral-400">
                                            Note: Avoid including sensitive personal data in study inputs.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Cookie className="mt-1 h-5 w-5 shrink-0 text-neutral-400" />
                                    <div>
                                        <p className="font-medium">Cookies &amp; device data</p>
                                        <ul className="list-disc pl-5">
                                            <li>Cookies/local storage for sign-in, preferences, and performance.</li>
                                            <li>Device and browser metadata (e.g., type, version) and approximate region.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="how-we-use" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            2) How we use information
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Provide core features: create structured study plans, fetch videos, and save your progress.</li>
                                <li>Operate, maintain, and improve the platform (e.g., debugging, analytics in aggregate).</li>
                                <li>Enforce fair-use limits and protect against abuse and fraud.</li>
                                <li>Communicate service-related updates (e.g., changes, outages, policy updates).</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="third-parties" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            3) Third-party services
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300 space-y-3">
                            <div className="flex items-start gap-3">
                                <Youtube className="mt-1 h-5 w-5 shrink-0 text-neutral-400" />
                                <div>
                                    <p className="font-medium">YouTube Data API</p>
                                    <p>
                                        We use the YouTube Data API to fetch relevant videos for topics. By using these features, you agree to be bound by the{" "}
                                        <a
                                            className="mx-1 underline decoration-neutral-600 underline-offset-4"
                                            href="https://www.youtube.com/t/terms"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            YouTube Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            className="ml-1 underline decoration-neutral-600 underline-offset-4"
                                            href="https://policies.google.com/privacy"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Google Privacy Policy
                                        </a>.
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-400">
                                We may use cloud hosting, analytics, and error monitoring. These providers process data on our behalf under appropriate safeguards.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data-retention" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            4) Data retention &amp; deletion
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <ul className="list-disc pl-5">
                                <li>Study content and progress are stored so you can revisit your plan.</li>
                                <li>We retain logs and analytics for a limited period to secure and improve the service.</li>
                                <li>You can request deletion of your account and associated personal data (subject to lawful exceptions).</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            5) Security
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <p>
                                We use industry-standard safeguards (encryption in transit, access controls, backups). No method of transmission or storage is 100% secure; we continually improve our protections.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="children" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            6) Children&apos;s privacy
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <p>
                                CLARIOAI is designed for general audiences and students. If you are under the age required by your country to consent to online services,
                                please use CLARIOAI only with a parent/guardian or school&apos;s permission. If we become aware of unauthorized minor data, we will delete it.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="changes" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            7) Changes to this policy
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <p>
                                We may update this Privacy Policy from time to time. Material changes will be highlighted here with a new effective date.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="contact" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 px-4">
                        <AccordionTrigger className="font-styrene text-neutral-100">
                            8) Contact us
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-300">
                            <div className="space-y-2">
                                <p className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Email:{" "}
                                    <a
                                        className="underline decoration-neutral-600 underline-offset-4"
                                        href="mailto:contact-clarioai@gmail.com"
                                    >
                                        contact-clarioai@gmail.com
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" /> Website:{" "}
                                    <a
                                        className="underline decoration-neutral-600 underline-offset-4"
                                        href="https://clarioai.vercel.app"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        https://clarioai.vercel.app
                                    </a>
                                </p>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-neutral-800 text-neutral-200">
                                    Data Requests
                                </Badge>
                                <p className="text-sm text-neutral-400">
                                    To request account/data deletion, contact us with the subject &quot;Data Deletion Request&quot; from your registered email.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <footer className="mt-10 text-center text-xs text-neutral-500">
                    <p>
                        This page is provided for transparency and general information. It does not constitute legal advice. If your institution has specific
                        compliance requirements, please consult your legal counsel.
                    </p>
                </footer>
            </div>
        </div>
    );
}
