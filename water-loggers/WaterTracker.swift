import SwiftUI

struct ContentView: View {
    @State private var waterIntake: Double = 0
    @State private var dailyTotal: Double = 0 {
        didSet {
            UserDefaults.standard.set(dailyTotal, forKey: "dailyTotal")
        }
    }
    @State private var intakeAmount: String = ""
    @State private var message: String = ""

    var body: some View {
        VStack {
            Text("Water Tracker")
                .font(.largeTitle)
                .padding()

            Text("Daily Total: \(dailyTotal, specifier: "%.1f") liters")
                .font(.headline)
                .padding()

            TextField("Enter amount in liters", text: $intakeAmount)
                .keyboardType(.decimalPad)
                .padding()
                .textFieldStyle(RoundedBorderTextFieldStyle())

            Button(action: addWater) {
                Text("Add Water")
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .padding()

            Text(message)
                .foregroundColor(.green)
                .padding()

            Spacer()
        }
        .padding()
        .onAppear {
            dailyTotal = UserDefaults.standard.double(forKey: "dailyTotal")
        }
    }

    func addWater() {
        guard let amount = Double(intakeAmount), amount > 0 else {
            message = "Please enter a valid positive amount."
            return
        }
        dailyTotal += amount
        intakeAmount = ""
        message = "Added \(amount) liters!"
    }
}

@main
struct WaterTrackerApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
