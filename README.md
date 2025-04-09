# PGatEase

PGatEase is a comprehensive web application designed to streamline the management of Paying Guest (PG) accommodations. The platform serves both PG owners and residents, providing features for efficient management and enhanced living experience.

## Features

### For PG Owners
- Track and manage resident complaints
- Add and manage residents
- Monitor payments and dues
- View occupancy statistics

### For Residents
- Personalized dashboard
- Daily/weekly menu customization
- Laundry service management
- Integrated payment system
- Complaint submission and tracking

## Tech Stack

- Frontend: React.js with TypeScript
- UI Framework: Material-UI (MUI)
- State Management: Redux Toolkit
- Form Handling: Formik with Yup validation
- Routing: React Router
- HTTP Client: Axios

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pgatease.git
cd pgatease
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Redux store configuration
│   ├── theme/         # MUI theme customization
│   └── utils/         # Utility functions
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.