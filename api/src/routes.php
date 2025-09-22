<?php
use Slim\App;
use App\Controllers\AuthController;
use App\Controllers\OrderController;
use App\Middleware\JwtMiddleware;

return function(App $app){
    $app->post('/api/register', [AuthController::class, 'register']);
    $app->post('/api/login', [AuthController::class, 'login']);

    $app->group('/api', function($group){
        $group->get('/orders', [OrderController::class, 'list']);
        $group->post('/ordersbb', [OrderController::class, 'create']);
    })->add(new JwtMiddleware());
};
