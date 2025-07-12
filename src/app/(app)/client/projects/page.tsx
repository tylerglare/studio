
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/data";
import { Briefcase, Calendar, MessageSquare, DollarSign, XCircle } from "lucide-react";
import Link from "next/link";


const getStatusVariant = (status: string) => {
  switch (status) {
    case "In Progress":
      return "default";
    case "Completed":
      return "secondary";
    case "Cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card className="flex flex-col">
        <CardHeader>
            <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                    <Link href={`/client/freelancer/${project.freelancer.id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors">
                            {project.title}
                        </CardTitle>
                    </Link>
                    <CardDescription>Due by {project.dueDate}</CardDescription>
                </div>
                 <Badge variant={getStatusVariant(project.status) as any} className="shrink-0">{project.status}</Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
            <div className="flex items-center gap-4">
                 <Link href={`/client/freelancer/${project.freelancer.id}`}>
                    <Avatar>
                        <AvatarImage src={project.freelancer.image} alt={project.freelancer.name} data-ai-hint={project.freelancer.aiHint} />
                        <AvatarFallback>{project.freelancer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                 </Link>
                <div className="min-w-0">
                    <p className="font-semibold truncate">{project.freelancer.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{project.freelancer.title}</p>
                </div>
            </div>
            {project.status === 'In Progress' && (
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-semibold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                </div>
            )}
            
        </CardContent>
        <div className="border-t mt-4 p-6 pt-4">
            <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1 shrink-0">
                    <DollarSign className="w-4 h-4" />
                    <span>Budget: <span className="font-semibold text-foreground">${project.budget.toLocaleString()}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/client/messages">
                            <MessageSquare className="mr-2 h-4 w-4" /> Message
                        </Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href={`/client/freelancer/${project.freelancer.id}`}>View Profile</Link>
                    </Button>
                </div>
            </div>
        </div>
    </Card>
);


export default function ClientProjectsPage() {
    const ongoingProjects = projects.filter(p => p.status === 'In Progress');
    const completedProjects = projects.filter(p => p.status === 'Completed');
    const cancelledProjects = projects.filter(p => p.status === 'Cancelled');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-accent" />
          Services Acquired
        </h1>
        <p className="text-muted-foreground">Manage your ongoing and completed services.</p>
      </div>
      
      <Tabs defaultValue="ongoing">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="ongoing">Ongoing ({ongoingProjects.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledProjects.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {ongoingProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
                {ongoingProjects.length === 0 && (
                    <Card className="lg:col-span-2">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Briefcase className="w-12 h-12 mx-auto text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No Ongoing Projects</h3>
                            <p className="text-sm text-muted-foreground mt-1">Start a new project by hiring a freelancer.</p>
                            <Button asChild className="mt-4">
                                <Link href="/client/dashboard">Find Talent</Link>
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </TabsContent>
         <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {completedProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
                {completedProjects.length === 0 && (
                    <Card className="lg:col-span-2">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Calendar className="w-12 h-12 mx-auto text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No Completed Projects Yet</h3>
                            <p className="text-sm text-muted-foreground mt-1">Completed projects will appear here.</p>
                        </div>
                    </Card>
                )}
            </div>
        </TabsContent>
         <TabsContent value="cancelled" className="mt-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cancelledProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
                {cancelledProjects.length === 0 && (
                    <Card className="lg:col-span-2">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No Cancelled Projects</h3>
                            <p className="text-sm text-muted-foreground mt-1">Any cancelled projects will be shown here.</p>
                        </div>
                    </Card>
                )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
