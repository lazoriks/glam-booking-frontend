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

### 


