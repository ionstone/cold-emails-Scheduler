# Frontend Documentation

This is the frontend application for the Cold Emails Scheduler. Built with React and Vite, it provides a modern and intuitive interface for managing email sequences.

## Features

- Drag-and-drop sequence builder
- Real-time sequence visualization
- Email template management
- User authentication
- Responsive design

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── context/       # React context providers
│   └── App.jsx        # Main application component
├── public/            # Static assets
└── index.html         # Entry HTML file
```

## Components

### Sequence Builder
- `SequenceBuilder.jsx`: Main component for creating and editing email sequences
- `Node.jsx`: Represents a single node in the sequence
- `Edge.jsx`: Represents connections between nodes

### Authentication
- `LoginForm.jsx`: User login form
- `RegisterForm.jsx`: User registration form

### Templates
- `TemplateList.jsx`: List of email templates
- `TemplateEditor.jsx`: Template creation and editing interface

## State Management

The application uses React Context for state management:
- `AuthContext`: Manages authentication state
- `SequenceContext`: Manages sequence data
- `TemplateContext`: Manages email templates

## API Integration

API calls are handled through the `services` directory:
- `authService.js`: Authentication-related API calls
- `sequenceService.js`: Sequence management API calls
- `templateService.js`: Template management API calls

## Styling

The application uses TailwindCSS for styling:
- Custom components are styled using Tailwind classes
- Responsive design is implemented using Tailwind's responsive modifiers
- Custom theme configuration in `tailwind.config.js`

## Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Code Quality

- ESLint is configured for code linting
- Prettier is used for code formatting
- React best practices are followed

## Dependencies

- react: UI library
- react-dom: React DOM rendering
- react-router-dom: Routing
- reactflow: Flow diagram library
- axios: HTTP client
- tailwindcss: CSS framework
- @tailwindcss/forms: Form styling
- react-icons: Icon library
- react-modal: Modal component

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting using React.lazy
- Image optimization
- Bundle size optimization
- Caching strategies

## Testing

Run tests using:
```bash
npm test
```

