import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class AutoUpdater {
    private currentVersion: string;
    private updateUrl: string;

    constructor(currentVersion: string, updateUrl: string) {
        this.currentVersion = currentVersion;
        this.updateUrl = updateUrl;
    }

    public async checkForUpdates(): Promise<void> {
        try {
            const { stdout } = await execAsync(`curl -s ${this.updateUrl}/latest`);
            const latestVersion = stdout.trim();

            if (this.isNewVersionAvailable(latestVersion)) {
                console.log(`New version available: ${latestVersion}`);
                await this.applyUpdate(latestVersion);
            } else {
                console.log('You are using the latest version.');
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    }

    private isNewVersionAvailable(latestVersion: string): boolean {
        return this.currentVersion !== latestVersion;
    }

    private async applyUpdate(latestVersion: string): Promise<void> {
        try {
            console.log(`Updating to version ${latestVersion}...`);
            await execAsync(`curl -L ${this.updateUrl}/download/${latestVersion} -o ./soulmusic-cli.tar.gz`);
            await execAsync('tar -xzf ./soulmusic-cli.tar.gz -C ./');
            console.log('Update applied successfully.');
        } catch (error) {
            console.error('Error applying update:', error);
        }
    }
}

export default AutoUpdater;