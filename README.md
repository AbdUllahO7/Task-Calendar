# TaskMaster Pro

<div align="center">
  <img src="public/logo.png" alt="TaskMaster Pro Logo" width="120" height="120" style="border-radius: 10px;">
  <h3>Advanced Productivity and Task Management Platform</h3>
</div>

## Overview

TaskMaster Pro is a comprehensive productivity and task management application built with React, Next.js, and Tailwind CSS. It helps users organize tasks, track time, manage projects, and analyze productivity metrics in a modern, responsive interface.

## Features

- **Dashboard** - Customizable dashboard with widgets for productivity tracking, task summaries, and upcoming activities
- **Task Management** - Create, organize, and track tasks with priorities, categories, and due dates
- **Calendar View** - Schedule and view tasks in a clean calendar interface with day, week, and month views
- **Project Management** - Organize tasks into projects with progress tracking and team collaboration
- **Time Tracking** - Track time spent on tasks and projects for accurate productivity measurement
- **Analytics** - Visualize productivity data with charts and graphs showing trends and patterns
- **Team Collaboration** - Invite team members, assign tasks, and track team activity
- **Profile Management** - Personalized user profiles with statistics and activity history
- **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark Mode** - Toggle between light and dark themes for comfortable viewing

## Technologies

- **Frontend**: React, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Context API
- **Charts**: Recharts
- **Authentication**: Custom authentication system with JWT
- **Icons**: Lucide React
- **Forms**: React Hook Form

## Screenshots

<div align="center">
  <img src="public/screenshots/dashboard.png" alt="Dashboard" width="800">
  <p>Dashboard View</p>
</div>

<div align="center">
  <img src="public/screenshots/calendar.png" alt="Calendar" width="800">
  <p>Calendar View</p>
</div>

<div align="center">
  <img src="public/screenshots/analytics.png" alt="Analytics" width="800">
  <p>Analytics View</p>
</div>

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskmaster-pro.git
   cd taskmaster-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
taskmaster-pro/
├── app/                    # Next.js app directory
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Dashboard and main app routes
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Root page component
├── components/             # Reusable React components
│   ├── analytics/          # Analytics components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── profile/            # Profile components
│   ├── projects/           # Project management components
│   ├── settings/           # Settings components
│   ├── tasks/              # Task management components
│   ├── team/               # Team collaboration components
│   ├── time-tracking/      # Time tracking components
│   └── ui/                 # UI components (buttons, inputs, etc.)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and types
├── public/                 # Static assets
└── README.md               # Project documentation
```

## Future Enhancements

- Sync with Google Calendar and other external calendars
- Email notifications for task deadlines and reminders
- Integration with productivity tools like Slack and Microsoft Teams
- Mobile app with offline capability
- AI-powered task recommendations and productivity insights
- Advanced reporting and export capabilities

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the visualization components
- [Lucide React](https://lucide.dev/) for the icon set
- All contributors who have helped shape this project

---

<div align="center">
  <p>Made with ❤️ by Your Name</p>
</div>
