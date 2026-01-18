import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";

// Initialize Alpine
window.Alpine = Alpine;

// Add a simple store for demo purposes
// Define interface for the store to satisfy TypeScript
interface DemoStore {
    darkMode: boolean;
    toggle: () => void;
}

Alpine.store('demo', {
    darkMode: false,
    toggle() {
        this.darkMode = !this.darkMode;
        console.log('Dark mode toggled:', this.darkMode);
    }
} as DemoStore);

Alpine.start();

// Export a test function to verify TypeScript compilation
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to the upgraded theme.`;
}

console.log(greet('Developer'));
