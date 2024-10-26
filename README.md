# Trendify E-Commerce Site 🛍️

Welcome to the Trendify repository! This project is an e-commerce platform where users can explore and purchase the latest trends in fashion, electronics, home essentials, and more. 🌟

## Table of Contents 📚

- [Features](#features-)
- [Technologies](#technologies-️)
- [Installation](#installation-️)
- [Usage](#usage-)
- [Scripts](#scripts-)
- [Contributing](#contributing-)
- [License](#license-)

## Features ✨

- User-friendly interface built with Next.js 💻
- Responsive design for mobile and desktop 📱
- Product catalog with filtering options 🛒
- Secure user authentication 🔒
- Shopping cart functionality 🛍️
- Order management system 📦

## Technologies 🛠️

### Client

- **Framework**: Next.js
- **Styling**: Tailwind CSS 🎨
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Data Fetching**: React Query
- **Icons**: Lucide React
- **Validation**: Zod

### Server

- **Framework**: Hono
- **Database**: MongoDB (via Mongoose) 🗄️
- **Environment Variables**: dotenv
- **Logging**: Pino 📜
- **TypeScript** for type safety 🔍

## Installation ⚙️

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-sandip/ecommerce.git
   cd ecommerce
   ```

2. Navigate to the client directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:

   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory and add your MongoDB connection string and any other necessary configurations.

## Usage 🚀

### Running the Development Environment

1. Start the server:

   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the client:

   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and go to `http://localhost:3000` to view the application. 🌐

### Building for Production

To build the application for production, run:

1. Build the server:

   ```bash
   cd server
   npm run build
   ```

2. Build the client:

   ```bash
   cd ../client
   npm run build
   ```

3. Start the production server:
   ```bash
   cd ../server
   npm start
   ```

## Scripts 📝

### Client Scripts

- `npm run dev`: Start development server. 🚧
- `npm run build`: Build for production. 📦
- `npm run start`: Start production server. 🚀
- `npm run lint`: Run linting checks. ✅

### Server Scripts

- `npm run dev`: Start development server with TypeScript. 🔄
- `npm run start`: Start production server. 🚀
- `npm run build`: Compile TypeScript files. 📜
- `npm run lint`: Run linting checks. ✅

## Contributing 🤝

We welcome contributions! If you'd like to contribute, please fork the repository and submit a pull request. Make sure to follow our coding standards and write tests for new features.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


