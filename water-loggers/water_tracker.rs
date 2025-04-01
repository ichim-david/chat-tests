use std::io;

const WELCOME_MESSAGE: &str = "Welcome to the Water Tracker App!";
const PROMPT_MESSAGE: &str = "Enter the amount of water you drank in liters (type 'exit' to quit):";
const POSITIVE_NUMBER_MESSAGE: &str = "Please enter a positive number.";
const INVALID_INPUT_MESSAGE: &str = "Invalid input. Please enter a number or 'exit' to quit.";
const TOTAL_INTAKE_MESSAGE: &str = "Your total water intake for today is: {:.2} liters.";

fn main() {
    let mut total_water: f32 = 0.0;

    println!("{}", WELCOME_MESSAGE);
    println!("{}", PROMPT_MESSAGE);

    loop {
        let input = get_user_input();

        if input.eq_ignore_ascii_case("exit") {
            break;
        }

        match parse_input(&input) {
            Ok(amount) if amount > 0.0 => {
                total_water += amount;
                println!("Added {:.2} liters. Total water intake: {:.2} liters.", amount, total_water);
            }
            Ok(_) => {
                println!("{}", POSITIVE_NUMBER_MESSAGE);
            }
            Err(_) => {
                println!("{}", INVALID_INPUT_MESSAGE);
            }
        }
    }

    println!(TOTAL_INTAKE_MESSAGE, total_water);
}

fn get_user_input() -> String {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    input.trim().to_string()
}

fn parse_input(input: &str) -> Result<f32, std::num::ParseFloatError> {
    input.parse::<f32>()
}
