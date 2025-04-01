defmodule WaterTracker do
  @moduledoc """
  A simple command-line application to track water intake.
  """

  defstruct total_intake: 0, daily_goal: 2000

  @doc """
  Starts the Water Tracker application.
  """
  def start do
    IO.puts("Welcome to the Water Tracker!")
    loop(%WaterTracker{})
  end

  defp loop(%WaterTracker{total_intake: total, daily_goal: goal} = tracker) do
    display_status(total, goal)
    IO.puts("Enter the amount of water consumed in ml (or type 'exit' to quit):")

    case IO.gets("> ") |> String.trim() do
      "exit" ->
        IO.puts("Goodbye! Your total intake was #{total} ml.")

      input ->
        handle_input(input, total, tracker)
    end
  end

  defp display_status(total, goal) do
    IO.puts("Current total intake: #{total} ml")
    IO.puts("Daily goal: #{goal} ml")
    if total >= goal do
      IO.puts("Congratulations! You've reached your daily goal!")
    end
  end

  defp handle_input(input, total, tracker) do
    case parse_input(input) do
      {:ok, amount} ->
        new_total = total + amount
        loop(%WaterTracker{tracker | total_intake: new_total})

      {:error, reason} ->
        IO.puts(reason)
        loop(tracker)
    end
  end

  defp parse_input(input) when input =~ ~r/^\d+$/ do
    amount = String.to_integer(input)
    if amount > 0 do
      {:ok, amount}
    else
      {:error, "Please enter a positive number."}
    end
  end

  defp parse_input(_) do
    {:error, "Invalid input. Please enter a positive number without any commas or 'exit'."}
  end
end

WaterTracker.start()
