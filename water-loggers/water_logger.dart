import 'dart:io';

void main() {
  List<double> waterIntakes = [];
  printWelcomeMessage();

  while (true) {
    String? input = stdin.readLineSync();
    if (input == null || input.isEmpty) {
      continue;
    }

    if (input.toLowerCase() == 'exit') {
      break;
    } else if (input.toLowerCase() == 'total') {
      printTotalIntake(waterIntakes);
    } else {
      logWaterIntake(input, waterIntakes);
    }
  }

  print('Thank you for using the Water Logger. Stay hydrated!');
}

void printWelcomeMessage() {
  print('Welcome to the Water Logger!');
  print('Enter your water intake in liters (type "exit" to quit, "total" to see total intake):');
}

void printTotalIntake(List<double> waterIntakes) {
  double total = waterIntakes.fold(0, (sum, intake) => sum + intake);
  print('Total water intake for today: ${total.toStringAsFixed(2)} liters');
}

void logWaterIntake(String input, List<double> waterIntakes) {
  try {
    double intake = double.parse(input);
    if (intake < 0) {
      print('Please enter a positive number.');
    } else {
      waterIntakes.add(intake);
      print('Logged: $intake liters');
      print('Current total intake: ${waterIntakes.fold(0, (sum, intake) => sum + intake).toStringAsFixed(2)} liters');
    }
  } catch (e) {
    print('Invalid input. Please enter a valid number or a command. Type "exit" to quit.');
  }
}
