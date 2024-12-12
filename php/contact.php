<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact_form_db"

// Create a connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data from POST request
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

    // Validate input
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO form_submissions (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        // Send the email
        $to = "parthasarker442@gmail.com";
        $subject = "New Contact Form Submission from $name";
        $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(['status' => 'success', 'message' => 'Thank you for your message']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Message sent but there was an error with the email.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error storing data in database.']);
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
