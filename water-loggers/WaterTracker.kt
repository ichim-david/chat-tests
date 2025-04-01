import java.util.Scanner

const val DAILY_GOAL = 2000.0 // Daily water intake goal in milliliters
const val WELCOME_MESSAGE = "Welcome to the Water Tracker App!"
const val EXIT_PROMPT = "Enter the amount of water you drank in ml (or type 'exit' to quit): "
const val INVALID_INPUT_MESSAGE = "Invalid input. Please enter a number."
const val POSITIVE_NUMBER_MESSAGE = "Please enter a positive number."
const val GOAL_REACHED_MESSAGE = "Congratulations! You've reached your daily goal!"
const val KEEP_GOING_MESSAGE = "Keep going! You still need %s ml to reach your goal."
const val THANK_YOU_MESSAGE = "Thank you for using the Water Tracker App! Your total intake today was %s ml."

fun main() {
    val scanner = Scanner(System.`in`)
    var totalWaterIntake = 0.0

    println(WELCOME_MESSAGE)
    println("Your daily goal is $DAILY_GOAL ml.")

    while (true) {
        println(EXIT_PROMPT)
        val input = scanner.nextLine()

        if (input.lowercase() == "exit") {
            break
        }

        val waterIntake = validateInput(input)
        if (waterIntake != null) {
            totalWaterIntake += waterIntake
            println("Total water intake: $totalWaterIntake ml")
            checkGoal(totalWaterIntake, DAILY_GOAL)
        }
    }

    println(THANK_YOU_MESSAGE.format(totalWaterIntake))
}

fun validateInput(input: String): Double? {
    return try {
        val waterIntake = input.toDouble()
        if (waterIntake < 0) {
            println(POSITIVE_NUMBER_MESSAGE)
            null
        } else {
            waterIntake
        }
    } catch (e: NumberFormatException) {
        println(INVALID_INPUT_MESSAGE)
        null
    }
}

fun checkGoal(totalIntake: Double, goal: Double) {
    if (totalIntake < goal) {
        println(KEEP_GOING_MESSAGE.format(goal - totalIntake))
    } else {
        println(GOAL_REACHED_MESSAGE)
    }
}
