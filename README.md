# 21 Days Habit Tracker

A motivational web application that helps users form habits following the 21-day theory, where performing an activity for 21 consecutive days turns it into a natural habit.

## 🎯 Overview

This application is designed for people looking to form new habits in a structured and motivational way, providing a visual tracking system and configurable rewards. The goal is to facilitate habit formation through intuitive daily tracking and a customizable motivation system.

## ✨ Features

### 🏠 Main Page

- **Day Counter**: Visual display of completed days in the current cycle (0-21)
- **Completion Button**: Large, prominent button to mark daily task as completed
- **Linear Calendar**: Visual progress representation with 21-day indicators
- **Habit Status**: Shows start date, consecutive days, and motivational messages
- **Language Selector**: Switch between Spanish and English

### ⚙️ Settings Page

- **Reward System**: Configure custom rewards for daily, weekly, and monthly achievements
- **Language Preferences**: Set preferred language with immediate application
- **Data Management**: Options for future export/import functionality

### 📚 Theory Page

- **Educational Content**: Detailed explanation of the 21-day theory
- **Scientific Benefits**: Information about habit formation and maintenance tips
- **Motivational Resources**: Structured content to support user journey

## 🌍 Internationalization

- **Supported Languages**: Spanish (default) and English
- **Dynamic Switching**: Instant language change without page reload
- **Persistent Settings**: Language preference saved in localStorage
- **Complete Translation**: All UI elements, messages, and content are translatable

## 🛠️ Technical Stack

- **Frontend**: React 18+ with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive and consistent design
- **Routing**: React Router DOM for navigation
- **Internationalization**: react-i18next for multi-language support
- **State Management**: Zustand for lightweight state management
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Storage**: Browser's localStorage for data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 21-days
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm check` - Type check without emitting files

## 📱 Usage

1. **Start Your Journey**: Open the app and you'll see a counter starting at 0
2. **Daily Completion**: Click the large completion button each day you complete your habit
3. **Track Progress**: Watch your linear calendar fill up as you progress through 21 days
4. **Customize Rewards**: Visit the Settings page to set up personal rewards for milestones
5. **Learn More**: Check the Theory page to understand the science behind habit formation
6. **Stay Motivated**: If you miss a day, the counter resets automatically to help you start fresh

## 🎨 Design Principles

- **Mobile-First**: Optimized for touch interaction on mobile devices
- **Clean Interface**: Minimalist design focused on the essential actions
- **Visual Feedback**: Clear progress indicators and celebratory animations
- **Accessibility**: Designed with accessibility best practices in mind
- **Performance**: Lightweight with minimal dependencies

## 🔧 Architecture

- **Component-Based**: Modular and reusable React components
- **Custom Hooks**: `useLocalStorage`, `useHabitTracker`, `useTheme` for state logic
- **Type Safety**: Full TypeScript implementation
- **Clean Code**: Following clean code principles with English comments
- **Native APIs**: Prioritizing browser native APIs over external libraries

## 🌟 Key Features

- **No Registration Required**: Start using immediately with local storage
- **Offline Capable**: Works without internet connection
- **Data Persistence**: Your progress is saved locally in your browser
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Instant Language Switching**: Change language without page reload
- **Visual Progress Tracking**: 21-day linear calendar visualization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
