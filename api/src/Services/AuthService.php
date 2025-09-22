<?php
namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;

class AuthService{
    private $userModel;

    public function __construct(User $userModel) {
        $this->userModel = $userModel;
    }

    public function register($email, $password, $name){
        return $this->userModel->create($email,$password, $name);
    }

    public function login($email, $password) {
        $user = $this->userModel->getByEmail($email);
        if(!$user || !password_verify($password, $user['password'])) return false;

        $token = JWT::encode([
            'sub' => $user['id'],
            'email' => $user['email'],
            'exp' => time() + 3600
        ], $_ENV['JWT_SECRET'], 'HS256');

        return ['access_token' => $token];
    }
}