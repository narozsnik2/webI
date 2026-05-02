<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

require "db.php";
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM tk");
        echo json_encode(["status" => "OK", "data" => $stmt->fetchAll()]);
        break;

    case 'POST':
        $stmt = $pdo->prepare("INSERT INTO tk (az, kiadoikod, cim, targy) VALUES (?, ?, ?, ?)");
        $stmt->execute([$input['az'], $input['kiadoikod'], $input['cim'], $input['targy']]);
        echo json_encode(["status" => "Sikeres mentés"]);
        break;

    case 'PUT':
        $stmt = $pdo->prepare("UPDATE tk SET kiadoikod=?, cim=?, targy=? WHERE az=?");
        $stmt->execute([$input['kiadoikod'], $input['cim'], $input['targy'], $input['az']]);
        echo json_encode(["status" => "Sikeres frissítés"]);
        break;

    case 'DELETE':
        $stmt = $pdo->prepare("DELETE FROM tk WHERE az=?");
        $stmt->execute([$input['az']]);
        echo json_encode(["status" => "Sikeres törlés"]);
        break;
}
?>