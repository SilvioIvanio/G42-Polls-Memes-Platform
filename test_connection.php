<?php
// Test database connection and show detected port
require_once 'API/config.php';
require_once 'API/db.php';

echo "<h2>Campus Pulse - Database Connection Test</h2>";
echo "<p><strong>Detected MySQL Host:</strong> " . DB_HOST . "</p>";
echo "<p><strong>Database Name:</strong> " . DB_NAME . "</p>";
echo "<p><strong>Database User:</strong> " . DB_USER . "</p>";

try {
    $conn = getDbConnection();
    echo "<p style='color: green;'><strong>✓ Database connection successful!</strong></p>";
    echo "<p>The application is ready to use.</p>";
    
    // Test a simple query
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Database Tables:</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        echo "<li>$table</li>";
    }
    echo "</ul>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'><strong>✗ Database connection failed!</strong></p>";
    echo "<p>Error: " . $e->getMessage() . "</p>";
    echo "<p>Please check your MySQL service is running and database 'campus_pulse' exists.</p>";
}
?>
