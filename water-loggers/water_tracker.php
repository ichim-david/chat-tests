<?php
session_start();

if (!isset($_SESSION['water_intake'])) {
    $_SESSION['water_intake'] = 0;
}

$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['amount'])) {
        $amount = intval($_POST['amount']);
        if ($amount > 0) {
            $_SESSION['water_intake'] += $amount;
            $message = "Successfully added $amount ml of water.";
        } else {
            $message = "Please enter a valid amount.";
        }
    } elseif (isset($_POST['reset'])) {
        $_SESSION['water_intake'] = 0;
        $message = "Daily total has been reset.";
    }
}

$daily_total = $_SESSION['water_intake'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Water Tracker</title>
    <style>
        body { font-family: Arial, sans-serif; }
        form { margin: 20px 0; }
        input[type="number"] { width: 100px; }
        .message { color: green; }
    </style>
</head>
<body>
    <h1>Water Tracker</h1>
    <p>Daily Water Intake: <?php echo $daily_total; ?> ml</p>
    <?php if ($message): ?>
        <p class="message"><?php echo $message; ?></p>
    <?php endif; ?>

    <form method="POST">
        <label for="amount">Add Water Intake (ml):</label>
        <input type="number" name="amount" id="amount" min="1" required>
        <button type="submit">Log Water</button>
    </form>

    <form method="POST" onsubmit="return confirm('Are you sure you want to reset the daily total?');">
        <input type="hidden" name="reset" value="1">
        <button type="submit">Reset Daily Total</button>
    </form>
</body>
</html>
