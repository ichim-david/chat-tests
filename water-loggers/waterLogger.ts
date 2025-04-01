class WaterLogger {
    private dailyIntake: number;

    constructor() {
        this.dailyIntake = 0;
    }

    public logIntake(amount: number): void {
        if (amount <= 0) {
            console.log("Please enter a valid amount of water.");
            return;
        }
        this.dailyIntake += amount;
        console.log(`Logged ${amount}ml of water. Total intake today: ${this.dailyIntake}ml`);
    }

    public getTotalIntake(): number {
        return this.dailyIntake;
    }

    public resetIntake(): void {
        this.dailyIntake = 0;
        console.log("Daily intake has been reset.");
    }
}

// Example usage
const logger = new WaterLogger();
logger.logIntake(250);
logger.logIntake(500);
console.log(`Total water intake for today: ${logger.getTotalIntake()}ml`);
logger.resetIntake();
