export class Scheduler {
    private schedule: Map<number, Function[]>;

    constructor() {
        this.schedule = new Map();
    }

    public addEvent(time: number, callback: Function): void {
        if (!this.schedule.has(time)) {
            this.schedule.set(time, []);
        }
        this.schedule.get(time)?.push(callback);
    }

    public start(): void {
        const times = Array.from(this.schedule.keys()).sort((a, b) => a - b);
        let currentTime = 0;

        const scheduleNextEvent = () => {
            if (times.length === 0) return;

            const nextTime = times[0];
            const delay = nextTime - currentTime;

            if (delay > 0) {
                setTimeout(() => {
                    this.executeEvents(nextTime);
                    currentTime = nextTime;
                    times.shift();
                    scheduleNextEvent();
                }, delay);
            } else {
                this.executeEvents(nextTime);
                currentTime = nextTime;
                times.shift();
                scheduleNextEvent();
            }
        };

        scheduleNextEvent();
    }

    private executeEvents(time: number): void {
        const events = this.schedule.get(time);
        if (events) {
            events.forEach(callback => callback());
        }
    }
}