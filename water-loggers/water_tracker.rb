class WaterTracker
  def initialize
    @intake = []
  end

  def log_water(amount)
    if valid_amount?(amount)
      @intake << amount
      puts "Logged #{amount} ml of water."
    else
      puts "Please enter a valid positive number."
    end
  end

  def total_intake
    @intake.sum
  end

  def display_intake
    puts "Total water intake today: #{total_intake} ml"
  end

  def run
    loop do
      display_menu
      choice = gets.chomp.to_i

      case choice
      when 1
        log_water_input
      when 2
        display_intake
      when 3
        puts "Goodbye!"
        break
      else
        puts "Invalid option. Please try again."
      end
    end
  end

  private

  def display_menu
    puts "\nWater Tracker"
    puts "1. Log water intake"
    puts "2. View total intake"
    puts "3. Exit"
    print "Choose an option: "
  end

  def log_water_input
    print "Enter amount of water in ml: "
    amount = gets.chomp.to_i
    log_water(amount)
  end

  def valid_amount?(amount)
    amount.is_a?(Integer) && amount > 0
  end
end

if __FILE__ == $0
  tracker = WaterTracker.new
  tracker.run
end
