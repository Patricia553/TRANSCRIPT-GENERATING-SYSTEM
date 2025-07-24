<?php
require '../includes/auth.php';
requireLogin();

if (isAdmin()) {
    header('Location: ../admin/dashboard.php');
    exit;
}

// Get student details
$stmt = $pdo->prepare("SELECT * FROM students WHERE user_id = ?");
$stmt->execute([$_SESSION['user_id']]);
$student = $stmt->fetch();

if (!$student) {
    die("Student record not found");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $purpose = $_POST['purpose'];
    $token = generateToken();
    
    try {
        $pdo->beginTransaction();
        
        $stmt = $pdo->prepare("INSERT INTO transcript_requests (student_id, purpose, download_token) VALUES (?, ?, ?)");
        $stmt->execute([$student['id'], $purpose, $token]);
        
        $requestId = $pdo->lastInsertId();
        $pdo->commit();
        
        $_SESSION['success'] = "Transcript request submitted successfully!";
        header("Location: download.php?request_id=$requestId");
        exit;
    } catch (PDOException $e) {
        $pdo->rollBack();
        $error = "Failed to submit request: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Request Transcript - FSS Ibadan</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <div class="container">
        <div class="card">
            <h2>Request Official Transcript</h2>
            
            <?php if (isset($error)): ?>
                <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            
            <form method="POST" id="transcript-request-form">
                <div class="form-group">
                    <label>Matric Number</label>
                    <input type="text" value="<?= htmlspecialchars($student['matric_number']) ?>" readonly>
                </div>
                
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" value="<?= htmlspecialchars($student['full_name']) ?>" readonly>
                </div>
                
                <div class="form-group">
                    <label for="purpose">Purpose of Request</label>
                    <select name="purpose" id="purpose" required>
                        <option value="">-- Select Purpose --</option>
                        <option value="Further Studies">Further Studies</option>
                        <option value="Employment">Employment</option>
                        <option value="Scholarship">Scholarship</option>
                        <option value="Personal Use">Personal Use</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit Request</button>
            </form>
        </div>
    </div>
    
    <script src="../assets/js/script.js"></script>
</body>
</html>