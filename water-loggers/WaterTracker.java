import java.util.InputMismatchException;
import java.util.Scanner;

public class WaterTracker {
    private static int totalWaterIntake = 0;
    private static final String ADD_COMMAND = "add";
    private static final String VIEW_COMMAND = "view";
    private static final String EXIT_COMMAND = "exit";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String command;

        System.out.println("Welcome to the Water Tracker App!");

        do {
            command = getUserCommand(scanner);
            processCommand(command, scanner);
        } while (!command.equals(EXIT_COMMAND));

        scanner.close();
    }

    private static String getUserCommand(Scanner scanner) {
        System.out.println("Enter 'add' to log water intake, 'view' to see total intake, or 'exit' to quit:");
        return scanner.nextLine().toLowerCase();
    }

    private static void processCommand(String command, Scanner scanner) {
        switch (command) {
            case ADD_COMMAND:
                addWaterAmount(scanner);
                break;
            case VIEW_COMMAND:
                viewTotalIntake();
                break;
            case EXIT_COMMAND:
                System.out.println("Exiting the Water Tracker App. Stay hydrated!");
                break;
            default:
                System.out.println("Invalid command. Please try again.");
        }
    }

    private static void addWaterAmount(Scanner scanner) {
        System.out.print("Enter amount of water in milliliters: ");
        try {
            int amount = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            addWater(amount);
        } catch (InputMismatchException e) {
            System.out.println("Invalid input. Please enter a valid number without any letters or symbols.");
            scanner.nextLine(); // Clear the invalid input
        }
    }

    private static void addWater(int amount) {
        if (amount > 0) {
            totalWaterIntake += amount;
            System.out.println(amount + " ml added to your intake.");
        } else {
            System.out.println("Please enter a positive amount.");
        }
    }

    private static void viewTotalIntake() {
        System.out.println("Total water intake today: " + totalWaterIntake + " ml");
    }
}
