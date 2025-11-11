"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteUpgrade = void 0;
const dao_1 = require("../lib/dao");
const commander_1 = require("commander");
const daoVoting = new dao_1.DAOVoting();
const voteUpgrade = async (wallet, proposal, vote) => {
    try {
        const result = await daoVoting.submitVote(wallet, proposal, vote);
        console.log(`Vote submitted successfully: ${result}`);
    }
    catch (error) {
        console.error('Error submitting vote:', error);
    }
};
exports.voteUpgrade = voteUpgrade;
// Command-line interface integration
const program = new commander_1.Command();
program
    .command('vote-upgrade')
    .requiredOption('--wallet <wallet>', 'Contributor identity wallet')
    .requiredOption('--proposal <proposal>', 'Proposal text or file')
    .requiredOption('--vote <vote>', 'Vote option: yes, no, or abstain')
    .action((options) => {
    (0, exports.voteUpgrade)(options.wallet, options.proposal, options.vote);
});
exports.default = program;
