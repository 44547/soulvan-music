export function voteUpgrade(wallet: string, proposal: string, vote: 'yes' | 'no' | 'abstain'): void {
    // Validate inputs
    if (!wallet || !proposal || !['yes', 'no', 'abstain'].includes(vote)) {
        throw new Error('Invalid input parameters');
    }

    // Logic to submit the vote
    console.log(`Wallet: ${wallet} is voting '${vote}' on proposal: ${proposal}`);

    // Here you would typically interact with the DAO voting module
    // to submit the vote and handle the response.
}