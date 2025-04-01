// water_logger.c
#include <stdio.h>
#include <time.h>

#define MAX_ENTRIES 100

typedef struct {
    float amount; // Amount of water in liters
    time_t timestamp; // Time of logging
} WaterEntry;

WaterEntry entries[MAX_ENTRIES];
int entryCount = 0;

void logWater(float amount) {
    if (entryCount < MAX_ENTRIES) {
        entries[entryCount].amount = amount;
        entries[entryCount].timestamp = time(NULL); // Log current time
        entryCount++;
        printf("Logged %.2f liters of water at %s", amount, ctime(&entries[entryCount - 1].timestamp));
    } else {
        printf("Maximum entries reached. Cannot log more water.\n");
    }
}

void displayTotal() {
    float total = 0.0;
    for (int i = 0; i < entryCount; i++) {
        total += entries[i].amount;
    }
    printf("Total water logged: %.2f liters\n", total);
}

void displayEntries() {
    printf("\nLogged Water Entries:\n");
    for (int i = 0; i < entryCount; i++) {
        printf("Entry %d: %.2f liters at %s", i + 1, entries[i].amount, ctime(&entries[i].timestamp));
    }
}

int main() {
    int choice;
    float amount;

    do {
        printf("\nWater Logger Menu:\n");
        printf("1. Log water intake\n");
        printf("2. Display total water logged\n");
        printf("3. Display all logged entries\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter amount of water in liters: ");
                scanf("%f", &amount);
                logWater(amount);
                break;
            case 2:
                displayTotal();
                break;
            case 3:
                displayEntries();
                break;
            case 4:
                printf("Exiting the program.\n");

                printf("Thank you for using the Water Logger!\n");
                break;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    } while (choice != 4);

    return 0;
}