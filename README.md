# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 1. Install Node.js (which includes npm and npx)
Go to the official Node.js website:
👉 https://nodejs.org

Download the LTS version.
Install it using the installer (just follow the prompts).
This will also install npm and npx.

# 2. System PATH
If Node.js is installed but still not recognized:

Go to: Control Panel → System → Advanced system settings → Environment Variables

Under System Variables, find Path and make sure it includes something like:

C:\Program Files\nodejs\
If not, click Edit, then Add, and paste the path where Node.js is installed.

# 3. PowerShell 
 Win + S і :
PowerShell

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

npx create-react-app my-appointment-app

# Створіть директорію вручну:

mkdir my-appointment-app
cd my-appointment-app
npm init -y

# Встановіть залежності:

npm install react@18 react-dom@18 react-scripts

# Додайте scripts у package.json:

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}

# Створіть базові файли (public/index.html, src/index.js, src/App.js).

## Знизити версію React до 18

npm uninstall react react-dom
npm install react@18 react-dom@18

npm install react-datepicker axios react-table

npm install date-fns

# Geating free account in AWS and greating DataBase in RDS AWS
- aws.amazon.com
- Aurora and RDS
- Databases

## Connectivity & security

### Endpoint
appointmentdb.ch8kskc0cuv1.eu-north-1.rds.amazonaws.com

### Port
3306 

# Create database 
Зайди в AWS Management Console → знайди RDS.

Create database → вибери:

Standard Create

Engine options: MySQL (або Aurora MySQL-compatible)

Version: останню стабільну.

Templates: вибери Free tier.

Settings:

DB instance identifier: appointmentdb

Master username: admin

Master password: YourStrongPassword123

DB instance size: t3.micro (free tier)

Storage: 20 GiB (free tier).

Connectivity:

Створи новий VPC security group (або відкрий для свого IP порт 3306).

Постав Public access = Yes, щоб підключатись із локальної машини.

Далі — натискай Create database.
Створення займе ~5-10 хв.

# MySQL Workbench

## 1️⃣ Скачати MySQL Workbench
Перейди на офіційний сайт:
👉 https://dev.mysql.com/downloads/workbench/

Завантаж версію для своєї ОС (Windows / macOS / Linux).

Встанови як звичайну програму.

## 2️⃣ Підключитися до своєї БД на AWS
Відкрити Workbench.

Створити New Connection.

Вказати:

Hostname: твій Endpoint з RDS (типу mydb.c5dsf4fsldk.eu-west-1.rds.amazonaws.com)

Port: 3306

Username: admin (чи той, що ти вказав під час створення RDS)

Password: натиснути Store in Vault... та ввести пароль.

Натиснути Test Connection — перевірити чи працює.

# bug during connection
Security Group (Firewall) не дозволяє підключення

На AWS RDS треба в Security Groups додати правило inbound для порту 3306 (MySQL) для свого IP.

Йди в AWS Management Console → EC2 → Security Groups → знайди групу, що прив'язана до твого RDS → редагуй inbound rules:

Type: MYSQL/Aurora

Protocol: TCP

Port range: 3306

Source: твій IP (можна тимчасово 0.0.0.0/0 для перевірки, але це не безпечно).

# bug during install workbench
MySQL Workbench не може запуститися, бо бракує Visual C++ 2019 Redistributable Package, який є системною бібліотекою від Microsoft.

🔧 Як вирішити:
Перейди на офіційну сторінку Microsoft:
https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist

Завантаж "x64" або "x86" версію залежно від твоєї системи:

x64 — якщо у тебе 64-бітна Windows (переважно так і є)

x86 — для 32-бітної Windows

Встанови пакет

Перезапусти MySQL Workbench

# create tables

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

# Як заповнювати таблиці в MySQL
## 1️⃣ Через SQL-команди (INSERT INTO)
Це найпростіший і найпопулярніший спосіб.

INSERT INTO clients (mobile, name, email)
VALUES ('1234567890', 'Ivan Petrov', 'ivan@gmail.com');
Можна одразу кілька записів:

INSERT INTO clients (mobile, name, email)
VALUES 
 ('1234567890', 'Ivan Petrov', 'ivan@gmail.com'),
 ('0987654321', 'Maria Ivanova', 'maria@gmail.com');
 
## 2️⃣ Через MySQL Workbench
Відкрий таблицю (правий клік → Select Rows).

Там з’явиться табличка де можна вносити дані вручну.

Потім натисни на значок ⚡️ (Apply changes), щоб зберегти

# https://start.spring.io/.

Project: Maven

Language: Java

Spring Boot: 3.2.x (або остання стабільна)

Group: com.example

Artifact: appointments

Name: appointments

Package name: com.example.appointments

Packaging: Jar

Java: 17 (або 21 якщо твоя IDE і AWS це підтримують)

✅ Dependencies:
Spring Web

Spring Data JPA

MySQL Driver

Lombok

Spring Boot DevTools (опціонально, для live reload)

Завантаж ZIP, розпакуй, відкрий у VS Code або IntelliJ.
