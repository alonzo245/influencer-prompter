# Teleprompter

A modern, feature-rich teleprompter application built with React and TypeScript. This application provides a clean, professional interface for displaying scripts with customizable settings and smooth scrolling functionality.

## Features

- **Text Display**

  - Adjustable font size
  - Customizable text color
  - Configurable horizontal padding
  - Support for both RTL and LTR text directions
  - Text alignment options (left, center, right)

- **Navigation**

  - Smooth scrolling with arrow keys
  - Customizable scroll step size
  - Touch-friendly interface

- **Display Options**

  - Fullscreen mode
  - Hidden cursor in fullscreen
  - Red line indicator in fullscreen mode
  - Hidden scrollbar for clean look
  - Text selection prevention

- **Persistence**
  - Saves text direction preference
  - Saves text alignment preference
  - Settings persist across sessions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd teleprompter
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

### Controls

- **Arrow Keys**: Scroll up/down through the script
- **Text Alignment**: Use the alignment buttons to position text (left, center, right)
- **Direction Toggle**: Switch between RTL and LTR text direction
- **Fullscreen**: Toggle fullscreen mode for presentation

### Features

- **Smooth Scrolling**: The teleprompter provides smooth scrolling animation for a professional experience
- **Customizable Settings**: Adjust font size, text color, and padding to your preferences
- **Responsive Design**: Works well on both desktop and mobile devices
- **Clean Interface**: Minimal controls that hide when not needed

## Development

### Project Structure

```
src/
  ├── components/
  │   └── Teleprompter.tsx    # Main teleprompter component
  ├── App.tsx                 # Application entry point
  └── index.tsx              # Root component
```

### Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
