import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Globe, Github, Linkedin, MapPin, Calendar } from "lucide-react"

const teamMembers = [
    {
        name: "Tanishq Kashla",
        role: "Full Stack Developer",
        about:
            "Passionate about creating scalable web applications, I love solving complex problems and new challenges.",
        techStack: ["Next.js", "AI", "TypeScript", "Tailwind", "DevOps"],
        profileImage: "/landingpage/devs/tanishq.png",
        website: "https://dev-tanishq.vercel.app",
        github: "https://github.com/TanishqKashla",
        linkedin: "https://www.linkedin.com/in/tanishqkashla",
    },
    {
        name: "Sushmayana Mishra",
        role: "Full Stack AI Developer",
        about:
            "Junior Engineer Building Intelligent Retail Systems | AI Implementation Specialist",
        techStack: ["Python", "React", "Docker", "Airflow", "LLMs"],
        profileImage: "/landingpage/devs/sushmayana.jpeg",
        github: "https://github.com/Sushi2003",
        linkedin: "https://www.linkedin.com/in/sushmayana-mishra-999225319",
    },
]


export function ProfileCard() {

    return (
        <div className="py-10 pb-12">
            <h2 className="font-styrene text-3xl md:text-5xl font-medium text-center pb-10">Meet the Devs</h2>
            <div className="flex flex-row flex-wrap sm:flex-nowrap  items-center justify-center gap-5 md:gap-8">
                {
                    teamMembers.map((member, index) => (
                        <Card key={index} className="bg-card border-[#a9d47f] text-card-foreground p-4 md:p-8 w-[250px] md:w-[400px] lg:w-[500px]">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-full flex justify-center md:justify-between ">
                                    {/* Profile Picture */}
                                    <Avatar className="w-24 h-24 md:w-32 md:h-32">
                                        <AvatarImage src={member.profileImage || "/placeholder.svg"} alt={member.name} />
                                        <AvatarFallback className="bg-secondary text-secondary-foreground text-lg font-semibold">
                                            {member.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Social Links wide screen*/}
                                    <div className="hidden md:flex md:flex-row gap-3">
                                        {member.website && (
                                            <Button size="sm" variant="outline" className="p-2 bg-transparent" asChild>
                                                <a href={member.website} target="_blank" rel="noopener noreferrer" aria-label="Personal website">
                                                    <Globe className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                        {member.github && (
                                            <Button size="sm" variant="outline" className="p-2 bg-transparent" asChild>
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                        {member.linkedin && (
                                            <Button size="sm" variant="outline" className="p-2 bg-transparent" asChild>
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>


                                <div className="w-full flex flex-col md:items-start">

                                    {/* Name and Role */}
                                    <div className="space-y-1 w-full text-center md:text-left flex flex-col md:items-start">
                                        <h3 className="text-xl md:text-3xl font-bold font-styrene">{member.name}</h3>
                                        <p className="text-muted-foreground font-medium">{member.role}</p>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>Delhi, India</span>
                                        </div>
                                    </div>

                                    {/* Social Links small screen*/}
                                    <div className="flex md:hidden w-full justify-center  gap-2 pt-2">
                                        {member.website && (
                                            <Button size="sm" variant="outline" className="p-2 bg-transparent" asChild>
                                                <a href={member.website} target="_blank" rel="noopener noreferrer" aria-label="Personal website">
                                                    <Globe className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                        {member.github && (
                                            <Button size="sm" variant="outline" className="p-2 bg-transparent" asChild>
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                        {member.linkedin && (
                                            <Button size="sm" variant="outline" className="p-2 bg-transparent" asChild>
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>


                                {/* About */}
                                <p className="text-sm w-full leading-relaxed">{member.about}</p>

                                <div className="flex gap-1 flex-wrap w-full">
                                    {member.techStack.map((tech, index) => (
                                        <div key={index} className="text-xs  rounded-full p-1 px-2 bg-[#c9ff9441] cursor-default">

                                            {tech}
                                        </div>

                                    ))}
                                </div>

                            </div>
                        </Card>
                    ))
                }
            </div>
        </div>

    )
}
