using System;
using System.Collections.Generic;

class WaterLogger
{
    private readonly List<int> waterIntakes;

    public WaterLogger()
    {
        waterIntakes = new List<int>();
    }

    public void LogWater(int amount)
    {
        if (amount > 0)
        {
            waterIntakes.Add(amount);
            Console.WriteLine($"{amount} ml of water logged.");
        }
        else
        {
            Console.WriteLine("Please enter a positive amount.");
            Console.WriteLine("Usage: log [amount] where amount is in milliliters.");
        }
    }

    public int TotalIntake => CalculateTotalIntake();

    private int CalculateTotalIntake()
    {
        int total = 0;
        foreach (var intake in waterIntakes)
        {
            total += intake;
        }
        return total;
    }

    public void ShowTotalIntake()
    {
        Console.WriteLine($"Total water intake today: {TotalIntake} ml");
    }

    public void ShowAllIntakes()
    {
        Console.WriteLine("Water intakes logged:");
        foreach (var intake in waterIntakes)
        {
            Console.WriteLine($"{intake} ml");
        }
    }

    static void Main(string[] args)
    {
        WaterLogger logger = new WaterLogger();
        string command;

        Console.WriteLine("Welcome to the Water Logger!");
        Console.WriteLine("Type 'log [amount]' to log water intake, 'total' to see total intake, or 'all' to see all intakes. Type 'exit' to quit.");

        while (true)
        {
            Console.Write("> ");
            command = Console.ReadLine();

            if (command.StartsWith("log"))
            {
                var parts = command.Split(' ');
                if (parts.Length == 2 && int.TryParse(parts[1], out int amount))
                {
                    logger.LogWater(amount);
                }
                else
                {
                    Console.WriteLine("Invalid command. Use 'log [amount]'.");
                }
            }
            else if (command == "total")
            {
                logger.ShowTotalIntake();
            }
            else if (command == "all")
            {
                logger.ShowAllIntakes();
            }
            else if (command == "exit")
            {
                break;
            }
            else
            {
                Console.WriteLine("Unknown command. Please try again.");
            }
        }
    }
}
