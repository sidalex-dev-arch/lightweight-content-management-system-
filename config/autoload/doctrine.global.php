<?php

return [
    'doctrine' => [
        'connection' => [
            'orm_default' => [
                'driverClass' => \Doctrine\DBAL\Driver\PDO\MySQL\Driver::class,
                'params' => [
                    'host'     => '127.0.0.1',
                    'port'     => 3306,
                    'user'     => 'root',
                    'password' => 'MyDbPass2026!',
                    'dbname'   => 'foacm_cms',
                    'charset'  => 'utf8mb4',
                    'driverOptions' => [
                        \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
                    ],
                ],
            ],
        ],

        'configuration' => [
            'orm_default' => [
                'metadata_cache'    => 'array',
                'query_cache'       => 'array',
                'result_cache'      => 'array',
                'hydration_cache'   => 'array',
                'generate_proxies'  => true,
                'proxy_dir'         => 'data/DoctrineORMModule/Proxy',
                'proxy_namespace'   => 'DoctrineORMModule\Proxy',
            ],
        ],

        'entitymanager' => [
            'orm_default' => [
                'connection'    => 'orm_default',
                'configuration' => 'orm_default',
            ],
        ],

        'driver' => [
            'flex_admin_entities' => [
                'class' => \Doctrine\ORM\Mapping\Driver\AttributeDriver::class,
                'cache' => 'array',
                'paths' => [
                    __DIR__ . '/../../vendor/alexsidorkin/flex-admin-panel-module/src/Entity',
                ],
            ],

            'orm_default' => [
                'drivers' => [
                    'FlexAdminPanelModule\\Entity' => 'flex_admin_entities',
                ],
            ],
        ],

        'migrations_configuration' => [
            'orm_default' => [
                'migrations_paths' => [
                    'Application\\Migrations' => 'data/DoctrineORMModule/Migrations',
                ],
                'table_storage' => [
                    'table_name' => 'migrations_versions',
                ],
                'all_or_nothing' => true,
            ],
        ],
    ],
];