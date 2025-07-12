
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreateProposalDialog } from "@/components/governance/CreateProposalDialog";
import { Landmark, Check, X, FileText, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TOKEN_SYMBOL = "CLT";
const VOTE_COST = 50;

const initialProposals = [
  {
    id: "CIP-007",
    title: "Implement a New Fee Structure for a More Equitable Platform",
    status: "Active",
    votes: { for: 65000, against: 15000 },
    endDate: "in 3 days",
  },
  {
    id: "CIP-006",
    title: "Launch a Marketing Campaign to Attract More Enterprise Clients",
    status: "Passed",
    votes: { for: 120000, against: 10000 },
    endDate: "2 weeks ago",
  },
  {
    id: "CIP-005",
    title: "Integrate a Third-Party Escrow Service for Increased Security",
    status: "Failed",
    votes: { for: 40000, against: 55000 },
    endDate: "1 month ago",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-blue-500";
    case "Passed": return "bg-green-500";
    case "Failed": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

type VoteType = "for" | "against";

export default function GovernancePage() {
  const [proposals, setProposals] = useState(initialProposals);
  const [votedProposals, setVotedProposals] = useState<Record<string, VoteType>>({});
  const [loadingVote, setLoadingVote] = useState<string | null>(null);
  // Simulating user's balance
  const [userBalance, setUserBalance] = useState(1250); 
  const { toast } = useToast();

  const handleVote = (proposalId: string, voteType: VoteType) => {
    if (userBalance < VOTE_COST) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: `You need at least ${VOTE_COST} ${TOKEN_SYMBOL} to vote.`,
      });
      return;
    }
    setLoadingVote(`${proposalId}-${voteType}`);
    // Simulate API call for voting
    setTimeout(() => {
      setProposals(currentProposals =>
        currentProposals.map(p => {
          if (p.id === proposalId) {
            return {
              ...p,
              votes: {
                ...p.votes,
                [voteType]: p.votes[voteType] + VOTE_COST,
              },
            };
          }
          return p;
        })
      );
      setVotedProposals(prev => ({ ...prev, [proposalId]: voteType }));
      setUserBalance(prevBalance => prevBalance - VOTE_COST);
      setLoadingVote(null);
      toast({
        title: "Vote Cast!",
        description: `You voted '${voteType}' on proposal ${proposalId}. ${VOTE_COST} ${TOKEN_SYMBOL} was used.`,
      });
    }, 1500);
  };

  const VoteButtonTooltip = ({ children }: { children: React.ReactNode }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1.5 p-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-semibold">{VOTE_COST} {TOKEN_SYMBOL}</span>
            </div>
             <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Your Balance:</span>
              <span className="font-semibold">{userBalance.toLocaleString()} {TOKEN_SYMBOL}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Landmark className="w-8 h-8 text-accent" />
            Governance
          </h1>
          <p className="text-muted-foreground">Shape the future of the cooperative by submitting and voting on proposals.</p>
        </div>
        <CreateProposalDialog />
      </div>

      <div className="space-y-6">
        {proposals.map((proposal) => {
          const totalVotes = proposal.votes.for + proposal.votes.against;
          const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
          const againstPercentage = totalVotes > 0 ? (proposal.votes.against / totalVotes) * 100 : 0;
          const hasVoted = !!votedProposals[proposal.id];
          const canVote = userBalance >= VOTE_COST;

          return (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                     <CardDescription>{proposal.id}</CardDescription>
                     <CardTitle className="text-xl">{proposal.title}</CardTitle>
                  </div>
                   <Badge className={`${getStatusColor(proposal.status)} text-white shrink-0`}>{proposal.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600"/> For</span>
                    <span>{proposal.votes.for.toLocaleString()} {TOKEN_SYMBOL}</span>
                  </div>
                  <Progress value={forPercentage} className="h-2 [&>div]:bg-green-500" />
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-red-600"/> Against</span>
                     <span>{proposal.votes.against.toLocaleString()} {TOKEN_SYMBOL}</span>
                  </div>
                  <Progress value={againstPercentage} className="h-2 [&>div]:bg-red-500" />
                </div>
              </CardContent>
               <CardFooter className="flex flex-wrap gap-4 justify-between items-center text-sm text-muted-foreground">
                <p>Voting ends {proposal.endDate}</p>
                {proposal.status === "Active" ? (
                  <div className="flex gap-2">
                    <VoteButtonTooltip>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={hasVoted || !!loadingVote || !canVote}
                      >
                        {loadingVote === `${proposal.id}-against` ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Vote Against
                      </Button>
                    </VoteButtonTooltip>
                    <VoteButtonTooltip>
                      <Button 
                        size="sm" 
                        onClick={() => handleVote(proposal.id, "for")}
                        disabled={hasVoted || !!loadingVote || !canVote}
                      >
                        {loadingVote === `${proposal.id}-for` ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Vote For
                      </Button>
                    </VoteButtonTooltip>
                  </div>
                ) : (
                  <Button variant="secondary" size="sm" disabled>
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
