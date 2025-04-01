local waterTracker = {}
waterTracker.totalIntake = 0

local MENU_OPTIONS = {
    LOG_INTAKE = "1",
    VIEW_INTAKE = "2",
    RESET_INTAKE = "3",
    EXIT = "4"
}

function waterTracker.logIntake(amount)
    if amount > 0 then
        waterTracker.totalIntake = waterTracker.totalIntake + amount
        print("Logged " .. amount .. "ml of water.")
    else
        print("Please enter a valid amount.")
    end
end

function waterTracker.viewIntake()
    print("Total water intake for today: " .. waterTracker.totalIntake .. "ml")
end

function waterTracker.resetIntake()
    waterTracker.totalIntake = 0
    print("Water intake reset for the day.")
end

function waterTracker.showMenu()
    print("\nWater Tracker Menu:")
    print("1. Log water intake")
    print("2. View total intake")
    print("3. Reset water intake")
    print("4. Exit")
end

function waterTracker.getUserInput(prompt)
    print(prompt)
    return io.read()
end

while true do
    waterTracker.showMenu()
    local choice = waterTracker.getUserInput("Please select an option:")

    if choice == MENU_OPTIONS.LOG_INTAKE then
        local amount = tonumber(waterTracker.getUserInput("Enter amount of water in ml:"))
        if amount then
            waterTracker.logIntake(amount)
        else
            print("Invalid input. Please enter a numeric value.")
        end
    elseif choice == MENU_OPTIONS.VIEW_INTAKE then
        waterTracker.viewIntake()
    elseif choice == MENU_OPTIONS.RESET_INTAKE then
        waterTracker.resetIntake()
    elseif choice == MENU_OPTIONS.EXIT then
        print("Exiting the water tracker app.")
        break
    else
        print("Invalid choice. Please try again.")
    end
end
