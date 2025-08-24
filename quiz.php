<?php
// Datenbankverbindung herstellen
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quiz_app";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Datenbankverbindung fehlgeschlagen: " . $conn->connect_error);
}

// Ergebnisse abrufen
$sql = "SELECT username, score, total_questions, created_at FROM quiz_results ORDER BY created_at DESC";
$result = $conn->query($sql);

echo "<h1>Ergebnisse der 5-Sinne-Rallye</h1>";
echo "<table border='1'>
<tr>
    <th>Username</th>
    <th>Score</th>
    <th>Fragenanzahl</th>
    <th>Datum</th>
</tr>";

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>" . htmlspecialchars($row['username']) . "</td>
            <td>" . $row['score'] . "</td>
            <td>" . $row['total_questions'] . "</td>
            <td>" . $row['created_at'] . "</td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='4'>Keine Ergebnisse vorhanden</td></tr>";
}
echo "</table>";

// Verbindung schließen
$conn->close();
?>
