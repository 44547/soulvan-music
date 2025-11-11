import { DAOVoting } from '../lib/dao';
import { Command } from 'commander';

const daoVoting = new DAOVoting();

export const voteUpgrade = async (wallet: string, proposal: string, vote: 'yes' | 'no' | 'abstain') => {
    try {
        const result = await daoVoting.submitVote(wallet, proposal, vote);
        console.log(`Vote submitted successfully: ${result}`);
    } catch (error) {
        console.error('Error submitting vote:', error);
    }
};

// Command-line interface integration
const program = new Command();

program
    .command('vote-upgrade')
    .requiredOption('--wallet <wallet>', 'Contributor identity wallet')
    .requiredOption('--proposal <proposal>', 'Proposal text or file')
    .requiredOption('--vote <vote>', 'Vote option: yes, no, or abstain')
    .action((options) => {
        voteUpgrade(options.wallet, options.proposal, options.vote);
    });

export default program;