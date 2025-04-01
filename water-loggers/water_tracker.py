import datetime
import json
import os

class WaterTracker:
    def __init__(self, storage_file='water_intake.json'):
        self.storage_file = storage_file
        self.water_intake = self.load_water_intake()

    def load_water_intake(self):
        if os.path.exists(self.storage_file):
            with open(self.storage_file, 'r') as file:
                return json.load(file)
        return {}

    def save_water_intake(self):
        with open(self.storage_file, 'w') as file:
            json.dump(self.water_intake, file)

    def log_water(self, amount):
        if amount <= 0:
            print("Please enter a positive amount of water.")
            return

        date_today = str(datetime.date.today())
        if date_today in self.water_intake:
            self.water_intake[date_today] += amount
        else:
            self.water_intake[date_today] = amount
        self.save_water_intake()
        print(f"Logged {amount} ml of water.")

    def get_daily_total(self):
        date_today = str(datetime.date.today())
        return self.water_intake.get(date_today, 0)

    def display_intake(self):
        date_today = str(datetime.date.today())
        total = self.get_daily_total()
        print(f"Total water intake for {date_today}: {total} ml")

def main():
    tracker = WaterTracker()
    while True:
        print("\nWater Tracker")
        print("1. Log water intake")
        print("2. View daily total water intake")
        print("3. Exit")
        choice = input("Choose an option: ")

        if choice == '1':
            try:
                amount = int(input("Enter amount of water in ml: "))
                tracker.log_water(amount)
            except ValueError:
                print("Please enter a valid integer.")
        elif choice == '2':
            tracker.display_intake()
        elif choice == '3':
            print("Exiting the Water Tracker. Stay hydrated!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
