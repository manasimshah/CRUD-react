import { createRoot } from 'react-dom/client' ;// createRoot - act as a entry point for rendering your React component into specific DOM element
import App from './App.jsx';
import "./index.css";

createRoot(document.getElementById('root')).render(
    <App />
)
