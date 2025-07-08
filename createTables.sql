use db_group_service;

CREATE TABLE table_group_service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL
);

CREATE TABLE db_clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(255),
    surname VARCHAR(255),
    mobile VARCHAR(20) NOT NULL,
    email  VARCHAR(255)
);

CREATE TABLE db_service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name varchar(255) NOT NULL,
    group_service_id Int,
    price decimal(10,2),
    period int,
    qty_masters int,
    FOREIGN KEY (group_service_id) REFERENCES table_group_service(id)
);

CREATE TABLE db_masters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(255),
    surname varchar(255),
    mobile varchar(20),
    group_service_id int,
    email varchar(255),
    FOREIGN KEY (group_service_id) REFERENCES table_group_service(id)
);

CREATE TABLE db_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datatime DATETIME NOT NULL,
    service_id int,
    client_id int,
    FOREIGN KEY (service_id) REFERENCES db_service(id),
    FOREIGN KEY (client_id) REFERENCES db_clients(id)
);