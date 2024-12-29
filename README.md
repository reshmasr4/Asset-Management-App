# Asset Management App: Fullstack Application (TypeScript)
This is a **Fullstack Asset Management Application** written in **TypeScript**, consisting of:

- **Client**: A React-based frontend using Material UI, with Playwright for testing.
- **Server**: A Node.js/Express-based backend with Jest for testing.


## **Prerequisites**

Ensure the following are installed on your system:
- **Node.js**: v14 or higher
- **TypeScript**: Installed globally (`npm install -g typescript`)
- **Git**: For version control (if cloning from a repository)

## **Setup Instructions**

### 1. Clone the Repository

Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/asset-management-app.git
cd asset-management-app
```
### 2. Install Dependencies
Run the following command to install dependencies client
```bash
cd client
npm install
```
Run the following command to install dependencies server
```bash
cd server
npm install
```
### 3. Running the Application
To start the Backend:
```bash
cd server
npm run dev
```
To start the Frontend:
```bash
cd client
npm start
```
- The client (React frontend) will run on: http://localhost:3000
- The server (Express backend) will run on: http://localhost:5000

### 4. Testing
To run test for server (Jest):
```bash
cd server
npm test
```
To run test for client (Playwright):
```bash
cd client
npx playwright test
```
