# Cricket Stadium Booking System

This project is a web application for booking seats in a cricket stadium. It consists of a client-side application built with React and a server-side application using Node.js and Express.

## Features

- User authentication with login and sign-in functionality.
- Home page that serves as the landing page after successful authentication.
- Booking page that allows users to view and book stadium seats.
- A responsive navigation bar for easy navigation between pages.
- Visualization of stadium seating arrangements.

## Project Structure

```
cricket-stadium-booking
├── src
│   ├── client
│   │   ├── index.tsx
│   │   ├── pages
│   │   │   ├── Login.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── Home.tsx
│   │   │   └── Booking.tsx
│   │   ├── components
│   │   │   ├── Navbar.tsx
│   │   │   ├── StadiumList.tsx
│   │   │   ├── SeatMap.tsx
│   │   │   └── BookingForm.tsx
│   │   └── types
│   │       └── index.ts
│   └── server
│       ├── index.ts
│       ├── controllers
│       │   └── authController.ts
│       ├── routes
│       │   └── auth.ts
│       ├── models
│       │   └── booking.ts
│       └── services
│           └── bookingService.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- TypeScript

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd cricket-stadium-booking
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   npm run start:server
   ```

2. Start the client:
   ```
   npm run start:client
   ```

### Usage

- Navigate to `http://localhost:3000` to access the application.
- Use the login page to authenticate or sign in to create a new account.
- After logging in, you can view available stadiums and book seats.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.