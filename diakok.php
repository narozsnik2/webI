<?php
header("Content-Type: application/json");
require "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $pdo->query("SELECT * FROM diak");
        $data = $stmt->fetchAll();
        echo json_encode(["status" => "OK", "readData" => $data]);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
    
        $stmt = $pdo->prepare("INSERT INTO diak (az, nev, osztaly) VALUES (?, ?, ?)");
        $stmt->execute([$data['az'], $data['nev'], $data['osztaly']]);
    
        echo json_encode(["status" => "Create success"]);
        break;
    
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
    
        $stmt = $pdo->prepare("UPDATE diak SET nev=?, osztaly=? WHERE az=?");
        $stmt->execute([$data['nev'], $data['osztaly'], $data['az']]);
    
        echo json_encode(["status" => "Update success"]);
        break;
    
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
    
        $stmt = $pdo->prepare("DELETE FROM diak WHERE az=?");
        $stmt->execute([$data['az']]);
    
        echo json_encode(["status" => "Delete success"]);
        break;
}
?>