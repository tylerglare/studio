import { Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpDialog } from '@/components/web3/SignUpDialog';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-8 h-8"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <g transform="rotate(30 50 50) translate(0 -5)">
                <path 
                  d="M35,20 A15,15 0 0 1 35,80 L65,80 A15,15 0 0 1 65,20 L35,20 Z" 
                  stroke="hsl(var(--primary-foreground))" 
                  strokeWidth="10" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <path
                  d="M65,25 A15,15 0 0 1 65,75"
                  stroke="hsl(var(--accent))"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <h1 className="text-2xl font-bold font-headline">
              <span className="text-primary">CTRL</span><span className="text-foreground">CHAIN</span>
            </h1>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 font-headline tracking-tight">
            The Future of Freelancing is Cooperative.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            CtrlChain is a Web3-powered hub where freelancers and clients build, own, and govern together. Your work, your rules, your cooperative.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-left transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                    <Briefcase className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold font-headline">Join as a Talent</CardTitle>
                    <CardDescription>Offer your skills, find projects, and earn in a fair, decentralized ecosystem.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <SignUpDialog role="talent" redirectTo="/talent/dashboard" />
              </CardContent>
            </Card>

            <Card className="text-left transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                    <Users className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold font-headline">Join as a Client</CardTitle>
                    <CardDescription>Find top-tier talent, manage projects seamlessly, and be part of the community.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                 <SignUpDialog role="client" redirectTo="/client/dashboard" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CtrlChain. All rights reserved.</p>
      </footer>
    </div>
  );
}
