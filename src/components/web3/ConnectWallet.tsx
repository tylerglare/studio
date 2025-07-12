
'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Zap, LogOut, ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function ConnectWallet() {
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const injectedConnector = connectors.find((c) => c.id === 'injected');

  if (!isClient) {
    return <Skeleton className="h-10 w-40" />;
  }

  if (isConnected && address) {
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <Zap className="mr-2 h-4 w-4" />
            {truncatedAddress}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => disconnect()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      disabled={!injectedConnector}
    >
      <Zap className="mr-2 h-4 w-4" /> Connect Wallet
    </Button>
  );
}
