import { Proposal, Vote } from '../../types'; // Import necessary types

class Voting {
    private proposals: Proposal[] = [];
    private votes: Vote[] = [];

    // Method to submit a new proposal
    public submitProposal(proposal: Proposal): void {
        this.proposals.push(proposal);
    }

    // Method to vote on a proposal
    public voteOnProposal(vote: Vote): void {
        this.votes.push(vote);
    }

    // Method to get all proposals
    public getProposals(): Proposal[] {
        return this.proposals;
    }

    // Method to get all votes for a specific proposal
    public getVotesForProposal(proposalId: string): Vote[] {
        return this.votes.filter(vote => vote.proposalId === proposalId);
    }

    // Method to count votes for a specific proposal
    public countVotes(proposalId: string): { yes: number; no: number; abstain: number } {
        const votesForProposal = this.getVotesForProposal(proposalId);
        const yesVotes = votesForProposal.filter(vote => vote.vote === 'yes').length;
        const noVotes = votesForProposal.filter(vote => vote.vote === 'no').length;
        const abstainVotes = votesForProposal.filter(vote => vote.vote === 'abstain').length;

        return { yes: yesVotes, no: noVotes, abstain: abstainVotes };
    }
}

export default Voting;