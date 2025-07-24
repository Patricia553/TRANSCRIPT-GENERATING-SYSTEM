<?php
require '../includes/auth.php';
requireLogin();

if (isAdmin()) {
    header('Location: ../admin/dashboard.php');
    exit;
}

$requestId = $_GET['request_id'] ?? 0;

// Get request details
$stmt = $pdo->prepare("SELECT r.*, s.matric_number, s.full_name 
                      FROM transcript_requests r
                      JOIN students s ON r.student_id = s.id
                      WHERE r.id = ? AND s.user_id = ?");
$stmt->execute([$requestId, $_SESSION['user_id']]);
$request = $stmt->fetch();

if (!$request) {
    die("Invalid transcript request");
}

// Generate PDF transcript (simplified example)
function generateTranscriptPDF($request) {
    // In a real system, use a library like TCPDF or DomPDF
    $filename = "transcript_" . $request['matric_number'] . "_" . date('Ymd') . ".pdf";
    
    // This would be replaced with actual PDF generation code
    return [
        'filename' => $filename,
        'content' => "SIMULATED PDF CONTENT FOR DEMONSTRATION"
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $request['status'] === 'approved') {
    $transcript = generateTranscriptPDF($request);
    
    // In a real system, you would force download the PDF
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $transcript['filename'] . '"');
    echo $transcript['content'];
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Download Transcript - FSS Ibadan</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <div class="container">
        <div class="card">
            <h2>Transcript Request Status</h2>
            
            <?php if (isset($_SESSION['success'])): ?>
                <div class="alert alert-success"><?= $_SESSION['success'] ?></div>
                <?php unset($_SESSION['success']); ?>
            <?php endif; ?>
            
            <div class="request-details">
                <p><strong>Matric Number:</strong> <?= htmlspecialchars($request['matric_number']) ?></p>
                <p><strong>Student Name:</strong> <?= htmlspecialchars($request['full_name']) ?></p>
                <p><strong>Request Date:</strong> <?= date('j F Y', strtotime($request['request_date'])) ?></p>
                <p><strong>Purpose:</strong> <?= htmlspecialchars($request['purpose']) ?></p>
                <p><strong>Status:</strong> 
                    <span class="status-badge <?= $request['status'] ?>">
                        <?= ucfirst($request['status']) ?>
                    </span>
                </p>
            </div>
            
            <?php if ($request['status'] === 'approved'): ?>
                <form method="POST">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-download"></i> Download Transcript
                    </button>
                </form>
            <?php elseif ($request['status'] === 'pending'): ?>
                <div class="alert alert-info">
                    Your request is being processed. Please check back later.
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    Your request was rejected. Please contact the registry for more information.
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <script src="../assets/js/script.js"></script>
</body>
</html>