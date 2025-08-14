"use client";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function ClientWrapper({ children }) {

    const pathname = usePathname();
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {pathname == "/" ? (
                    <>
                        <header className="flex h-16 items-center gap-2 border-b px-4 fixed top-0 w-[100%] z-50 bg-background/60 backdrop-blur-md">
                            <div className="flex items-center gap-2 justify-between  w-full ">
                                <div className="flex items-center gap-2">

                                    <div className="flex gap-3 items-center">
                                        <img
                                            src="/logo.svg"
                                            alt="ClarioAI Logo"
                                            width={25}
                                            height={25}
                                            className="rounded-full cursor-pointer"
                                            onClick={() => router.push('/')}
                                            style={{ width: 25, height: 25 }}
                                        />
                                        <span
                                            className="font-styrene font-bold text-xl text-center cursor-pointer"
                                            onClick={() => {
                                                router.push('/');
                                            }}
                                        >
                                            ClarioAI
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ModeToggle />
                                    <Button asChild>
                                        <Link href="/login" className="ml-2">
                                            Login
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </header>
                        <main className="mt-16">{children}</main>
                    </>
                ) : (
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>

                            <header className="flex h-16 items-center gap-2 border-b px-4 w-[100%] z-10 bg-background/60 backdrop-blur-md">
                                <div className="flex items-center gap-2 justify-between w-full ">
                                    <div className="flex items-center gap-2">

                                        <SidebarTrigger className="-ml-1" />
                                        <Separator orientation="vertical" className="mr-2 h-4" />
                                        <ModeToggle />
                                    </div>
                                    <div>
                                        checking
                                    </div>
                                </div>
                            </header>
                            <main className="mt-16">{children}</main>
                        </SidebarInset>
                        <Toaster />
                    </SidebarProvider>
                )
                }
            </ThemeProvider>
        </SessionProvider>
    )
};