<?php

namespace App\Models;

use PDO;

class User{
    private $conn;
    private $table = "users";

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }
    
    function create($email, $password, $name){
        $stmt = $this->conn->prepare("INSERT INTO {$this->table} (email, password, name)VALUE (?, ?, ?)");
        return $stmt->execute([$email, password_hash($password, PASSWORD_BCRYPT), $name]);
    }

    public function getByEmail($email) {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}

