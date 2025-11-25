# Electron Stock App

A modern stock tracking application built with Electron, React, and TypeScript. This project provides a complete development environment and packaging setup for creating cross-platform desktop applications.

## 🚀 Features

- **Electron** - Cross-platform desktop application framework
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Electron Builder** - Package for Windows (.exe), macOS (.dmg), and Linux (AppImage)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Development

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd electron-stock-app

# Install dependencies
npm install
```

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

This will:
- Start the Vite development server
- Launch the Electron application
- Enable hot module replacement for React components

### Code Linting

Check for code style and potential issues:

```bash
npm run lint
```

## 📦 Building and Packaging

### Build for Production

Build the application and create distributable packages:

```bash
npm run build
```

This process:
1. Compiles TypeScript code
2. Builds the React application
3. Packages the Electron app for all platforms

### Output Files

Built applications are created in the `release/` directory:

- **Windows**: `release/{version}/Electron Stock App-Windows-{version}-Setup.exe`
- **macOS**: `release/{version}/Electron Stock App-Mac-{version}-Installer.dmg`
- **Linux**: `release/{version}/Electron Stock App-Linux-{version}.AppImage`

### Platform-Specific Builds

If you want to build for a specific platform:

```bash
# Windows only
npm run build -- --win

# macOS only
npm run build -- --mac

# Linux only
npm run build -- --linux
```

## 📁 Project Structure

```
electron-stock-app/
├── electron/                 # Electron main process files
│   ├── main.ts              # Main process entry point
│   ├── preload.ts           # Preload script
│   └── electron-env.d.ts    # Electron type definitions
├── src/                     # React renderer process
│   ├── App.tsx              # Main React component
│   ├── main.tsx             # React entry point
│   ├── assets/              # Static assets
│   └── *.css                # Stylesheets
├── public/                  # Public assets
├── dist/                    # Built React application
├── dist-electron/           # Built Electron main process
├── release/                 # Packaged applications
├── electron-builder.json5   # Electron Builder configuration
├── package.json             # Project configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

## ⚙️ Configuration

### Electron Builder

The packaging configuration is defined in `electron-builder.json5`:

- **App ID**: `com.electron.stock.app`
- **Product Name**: `Electron Stock App`
- **Output Directory**: `release/${version}`
- **Targets**: 
  - Windows: NSIS installer (.exe)
  - macOS: DMG installer (.dmg)
  - Linux: AppImage (.AppImage)

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build and package for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview built React app

## 🎯 Development Workflow

1. **Start Development**: Run `npm run dev` to start the development server
2. **Make Changes**: Edit React components in `src/` or Electron code in `electron/`
3. **Test**: The application automatically reloads on changes
4. **Lint**: Run `npm run lint` to check code quality
5. **Build**: Run `npm run build` to create distributable packages

## 🔧 Troubleshooting

### Development Issues

- If Electron doesn't start, ensure all dependencies are installed with `npm install`
- Check that your system meets the Node.js version requirements

### Build Issues

- Ensure you have sufficient disk space for the build process
- Some platforms may require additional dependencies for packaging
- Check the `release/` directory for build logs if packaging fails

### Platform-Specific Notes

- **Windows**: May require Windows SDK for certain features
- **macOS**: Requires a Mac for building macOS packages
- **Linux**: Most distributions should work out of the box

## 📚 Technologies Used

- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Electron Builder](https://www.electron.build/) - Application packaging

## 📄 License

This project is licensed under the MIT License.