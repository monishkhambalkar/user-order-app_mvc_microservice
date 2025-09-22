<?php 

require __DIR__ . '/../vendor/autoload.php';

use DI\Container;
use Slim\Factory\AppFactory;
use Dotenv\Dotenv;

$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$container->set('db', function(){
    $dsn = sprintf(
        "mysql:host=%s;dbname=%s;charset=utf8mb4",
        $_ENV['DB_HOST'],
        $_ENV['DB_NAME']
    );
    return new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
});

// // Add CORS middleware
// $app->add(function ($request, $handler) {
//     $response = $handler->handle($request);
//     return $response
//         ->withHeader('Access-Control-Allow-Origin', '*')
//         ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Cache-Control, Pragma')
//         ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//         ->withHeader('Access-Control-Allow-Credentials', 'true');
// });

// // Handle preflight OPTIONS requests
// $app->options('/{routes:.*}', function ($request, $response, $args) {
//     return $response
//         ->withHeader('Access-Control-Allow-Origin', '*')
//         ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Cache-Control, Pragma')
//         ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//         ->withHeader('Access-Control-Allow-Credentials', 'true');
// });


$app->add(function ($request, $handler) {
    if ($request->getMethod() === "OPTIONS") {
        $response = new \Slim\Psr7\Response();
        return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3400')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Origin, Authorization, Cache-Control, Pragma')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withStatus(200);
    }

    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3400')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Origin, Authorization, Cache-Control, Pragma')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Load routes
$routes = require __DIR__ . '/../src/routes.php';
$routes($app);

$app->run();