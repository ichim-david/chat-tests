def my_function():
    """
    This function calculates the sum of 1 and 2, prints the result, and returns it.
    """
    result = 1 + 2
    print(f"The result is: {result}")
    return result


def another_function(input_string: str) -> str:
    uppercase_string = input_string.upper()
    print(f"Uppercase: {uppercase_string}")
    return uppercase_string


if __name__ == "__main__":
    # Example usage
    sum_result = my_function(5, 3)
    print(f"Result of my_function: {sum_result}")

    uppercase_result = another_function("hello world")
    print(f"Result of another_function: {uppercase_result}")
