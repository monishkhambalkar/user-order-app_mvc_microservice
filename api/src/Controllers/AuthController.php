<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\AuthService;

class AuthController{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $req, Response $res){
        $data = $req->getParsedBody();
        $this->authService->register($data['email'], $data['password'], $data['name']);
        $res->getBody()->write(json_encode(['ok'=>true]));
        return $res->withHeader('Content-Type', 'application/json');
    }

    public function login(Request $req, Response $res){
        $data = $req->getParsedBody();
        $result = $this->authService->login($data['email'], $data['password']);
        if (!$result) {
            $res->getBody()->write(json_encode(['error'=>'Invalid credentials']));
            return $res->withStatus(401)->withHeader('Content-Type','application/json');
        }

        $res->getBody()->write(json_encode($result));
        return $res->withHeader('Content-Type','application/json');
    }
}

