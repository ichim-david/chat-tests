#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include <limits>

struct WaterLog {
    std::time_t timestamp;
    double amount; // in liters
};

class WaterLogger {
public:
    void logWaterUsage(double amount) {
        if (amount <= 0) {
            std::cout << "Amount must be greater than zero.\n";
            return;
        }
        WaterLog log;
        log.timestamp = std::time(nullptr);
        log.amount = amount;
        logs.push_back(log);
        std::cout << "Logged " << amount << " liters of water usage.\n";
    }

    void displayLogs() const {
        std::cout << "\nWater Usage Logs:\n";
        if (logs.empty()) {
            std::cout << "No logs available.\n";
            return;
        }
        for (const auto& log : logs) {
            std::cout << "Time: " << std::ctime(&log.timestamp)
                      << "Amount: " << log.amount << " liters\n";
        }
    }

private:
    std::vector<WaterLog> logs;
};

void displayMenu() {
    std::cout << "\nWater Logger Menu:\n";
    std::cout << "1. Log water usage\n";
    std::cout << "2. Display logs\n";
    std::cout << "3. Exit\n";
    std::cout << "Enter your choice: ";
}

int main() {
    WaterLogger logger;
    int choice;
    double amount;

    while (true) {
        displayMenu();
        std::cin >> choice;

        if (std::cin.fail()) {
            std::cin.clear(); // clear the error flag
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // discard invalid input
            std::cout << "Invalid input. Please enter a number.\n";
            continue;
        }

        switch (choice) {
            case 1:
                std::cout << "Enter amount of water used (in liters): ";
                std::cin >> amount;
                if (std::cin.fail()) {
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    std::cout << "Invalid input. Please enter a valid number.\n";
                } else {
                    logger.logWaterUsage(amount);
                }
                break;
            case 2:
                logger.displayLogs();
                break;
            case 3:
                std::cout << "Exiting...\n";
                std::cout << "Thank you for using the Water Logger!\n";
                return 0;
            default:
                std::cout << "Invalid choice. Please try again.\n";
        }
    }
}
