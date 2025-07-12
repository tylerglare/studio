
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Loader2 } from 'lucide-react';
import { Separator } from '../ui/separator';

interface SignUpDialogProps {
  role: 'talent' | 'client';
  redirectTo: string;
}

export function SignUpDialog({ role, redirectTo }: SignUpDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [action, setAction] = useState<'signup' | 'login' | null>(null);

  const router = useRouter();
  const { isConnected } = useAccount();
  const { connect, connectors, status } = useConnect();

  const injectedConnector = connectors.find((c) => c.id === 'injected');

  const buttonLabel = role === 'talent' ? "I'm a Freelancer" : "I'm a Client";
  
  const isTalentFormComplete = role === 'talent' && name && email && contactNumber && jobTitle && location;
  const isClientFormComplete = role === 'client' && name && email;
  const isFormComplete = isTalentFormComplete || isClientFormComplete;

  useEffect(() => {
    if (isConnected && isConnecting) {
      // Wallet is connected, now we can redirect
      setOpen(false);
      router.push(redirectTo);
    }
  }, [isConnected, isConnecting, redirectTo, router]);

  useEffect(() => {
    // If connection process ends (e.g. user rejects), reset loading state
    if (status === 'idle' || status === 'error') {
      setIsConnecting(false);
      setAction(null);
    }
  }, [status]);


  const handleCreateAccount = () => {
    setAction('signup');
    setIsConnecting(true);
    if (!isConnected) {
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      } else {
        // Handle case where no injected provider is found
        console.error("No wallet provider found. Please install a wallet extension like MetaMask.");
        setIsConnecting(false);
        setAction(null);
      }
    } else {
      // Already connected, can proceed
      router.push(redirectTo);
    }
  };

  const handleLogin = () => {
    setAction('login');
    setIsConnecting(true);
    if (!isConnected) {
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      } else {
        console.error("No wallet provider found.");
        setIsConnecting(false);
        setAction(null);
      }
    } else {
      router.push(redirectTo);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Your {role === 'talent' ? 'Talent' : 'Client'} Profile</DialogTitle>
          <DialogDescription>
            Set up your profile, then connect your wallet to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          {role === 'talent' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact No.</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Your contact number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Frontend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter className="flex-col gap-2">
          <Button
            onClick={handleCreateAccount}
            disabled={!injectedConnector || isConnecting || !isFormComplete}
            className="w-full"
          >
            {isConnecting && action === 'signup' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Connect Wallet & Create Account
              </>
            )}
          </Button>

          <div className="relative my-2">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
          </div>
          
          <Button
            onClick={handleLogin}
            variant="secondary"
            disabled={!injectedConnector || isConnecting}
            className="w-full"
          >
            {isConnecting && action === 'login' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Log In with Wallet'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
