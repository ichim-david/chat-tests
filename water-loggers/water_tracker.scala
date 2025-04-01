import scala.io.StdIn._

object WaterTracker {
  var totalWaterIntake: Double = 0.0
  val logOption = "1"
  val viewOption = "2"
  val exitOption = "3"

  def main(args: Array[String]): Unit = {
    println("Welcome to the Water Tracker App!")
    var running = true

    while (running) {
      displayMenu()
      val choice = readLine()

      choice match {
        case `logOption` => logWaterIntake()
        case `viewOption` => viewTotalWaterIntake()
        case `exitOption` => 
          running = false
          println("Exiting the Water Tracker App. Stay hydrated!")
        case _ => println("Invalid option. Please try again.")
      }
    }
  }

  def displayMenu(): Unit = {
    println("\nPlease choose an option:")
    println("1. Log water intake")
    println("2. View total water intake")
    println("3. Exit")
  }

  def logWaterIntake(): Unit = {
    println("Enter the amount of water (in liters) you drank:")
    try {
      val amount = readLine().toDouble
      if (amount < 0) {
        println("Please enter a positive number.")
      } else {
        totalWaterIntake += amount
        println(s"You have logged $amount liters of water.")
        println(s"Total water intake is now $totalWaterIntake liters.")
      }
    } catch {
      case _: NumberFormatException => println("Invalid input. Please enter a numeric value.")
    }
  }

  def viewTotalWaterIntake(): Unit = {
    println(f"Your total water intake today is $totalWaterIntake%.2f liters.")
  }
}
