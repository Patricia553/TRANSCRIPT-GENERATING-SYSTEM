<?php
require '../includes/auth.php';
requireAdmin();

// Get stats
$stmt = $pdo->query("SELECT COUNT(*) FROM students");
$totalStudents = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM transcript_requests WHERE status = 'approved'");
$completedTranscripts = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM transcript_requests WHERE status = 'pending'");
$pendingRequests = $stmt->fetchColumn();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - FSS Ibadan</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <div class="container">
        <h1>Admin Dashboard</h1>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Students</h3>
                <p><?= $totalStudents ?></p>
            </div>
            
            <div class="stat-card">
                <h3>Transcripts Generated</h3>
                <p><?= $completedTranscripts ?></p>
            </div>
            
            <div class="stat-card">
                <h3>Pending Requests</h3>
                <p><?= $pendingRequests ?></p>
            </div>
        </div>
        
        <div class="admin-actions">
            <a href="students.php" class="btn btn-primary">Manage Students</a>
            <a href="transcripts.php" class="btn btn-primary">Process Transcripts</a>
        </div>
    </div>
    
    <script src="../assets/js/script.js"></script>
</body>
</html>