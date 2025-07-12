
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, MessageSquare, Briefcase, DollarSign, User, Award, Layers } from "lucide-react";
import { freelancers } from "@/lib/data";

const TOKEN_SYMBOL = "CLT";

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const freelancer = freelancers.find(f => f.id === params.id);

  if (!freelancer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <Image
          src={freelancer.banner}
          alt={`${freelancer.name}'s banner`}
          width={1200}
          height={300}
          className="w-full h-48 object-cover"
          data-ai-hint="abstract professional background"
        />
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 -mt-24 items-start">
            <Avatar className="h-36 w-36 border-4 border-background shrink-0">
              <AvatarImage src={freelancer.image} alt={freelancer.name} data-ai-hint={freelancer.aiHint} />
              <AvatarFallback>{freelancer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pt-16 sm:pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-headline">{freelancer.name}</h1>
                  <p className="text-lg text-muted-foreground">{freelancer.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-accent fill-accent" />
                      <span className="font-semibold text-lg">{freelancer.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({freelancer.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto shrink-0">
                  <Button variant="outline" className="flex-1 sm:flex-none"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
                  <Button className="flex-1 sm:flex-none"><Briefcase className="mr-2 h-4 w-4" /> Hire Me</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-6 h-6 text-primary" /> About {freelancer.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">{freelancer.about}</p>
            </CardContent>
          </Card>

          {/* Portfolio Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="w-6 h-6 text-primary" /> Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {freelancer.portfolio.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden group">
                  <Image src={item.image} alt={item.title} width={400} height={300} className="w-full object-cover group-hover:scale-105 transition-transform" data-ai-hint={item.aiHint}/>
                  <div className="p-4 bg-background">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="w-6 h-6 text-primary" /> Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {freelancer.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Layers className="w-6 h-6 text-primary" /> Services Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {freelancer.services.map((service, index) => (
                <div key={index} className="flex justify-between items-start p-3 rounded-lg border bg-secondary/30">
                  <div>
                    <h4 className="font-semibold">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Badge variant="outline" className="text-md py-1 px-3 bg-background shrink-0 ml-2">
                    {service.price} <span className="font-light ml-1.5">{TOKEN_SYMBOL}</span>
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
