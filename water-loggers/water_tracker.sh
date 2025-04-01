#!/bin/bash

# File to store water intake data
DATA_FILE="water_intake.txt"

# Function to log water intake
log_water() {
    echo "Enter the amount of water (in ounces) you drank:"
    read amount
    if [[ "$amount" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
        echo "$amount" >> "$DATA_FILE" || { echo "Error logging water intake."; return; }
        echo "Logged $amount ounces of water."
    else
        echo "Please enter a valid number (e.g., 8 or 8.5)."
    fi
}

# Function to display total water intake
show_total() {
    if [[ -f "$DATA_FILE" ]]; then
        total=$(awk '{sum += $1} END {print sum}' "$DATA_FILE")
        echo "Total water intake: $total ounces"
    else
        echo "No water intake logged yet."
    fi
}

# Function to display the main menu
display_menu() {
    echo "Water Tracker"
    echo "1. Log water intake"
    echo "2. Show total water intake"
    echo "3. Exit"
}

# Main menu loop
while true; do
    display_menu
    read -p "Choose an option: " option

    case $option in
        1)
            log_water
            ;;
        2)
            show_total
            ;;
        3)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid option. Please try again."
            ;;
    esac
done
