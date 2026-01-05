// src/data/dashboardData.js

export const dashboardStaticData = {
  // Card 1: No. of Games
  games: {
    total: 47,
    trending: "+12%", // compared to last month
    breakdown: {
      published: 42,
      draft: 5,
      upcoming: 3,
    },
  },

  // Card 2: No. of Questions
  questions: {
    total: 1285,
    trending: "+8%",
    breakdown: {
      easy: 520,
      medium: 450,
      hard: 315,
    },
    averagePerGame: 27.3,
  },

  // Card 3: Total No. of Tags with Top 10
  tagsChartData: [
    { tag: "Technology", visitors: 76, fill: "#0d3b66" },
    { tag: "Music", visitors: 65, fill: "#f4d35e" },
    { tag: "Literature", visitors: 54, fill: "#f95738" },
    { tag: "Art", visitors: 43, fill: "#faf0ca" },
    { tag: "Mathematics", visitors: 38, fill: "#ee964b" },
  ],

  // Card 4: Total No. of Active Users
  activeUsers: {
    total: 2347,
    trending: "+15%",
    breakdown: {
      daily: 847,
      weekly: 1250,
      monthly: 2347,
    },
    retentionRate: "68%",
  },

  // Additional metrics for charts/graphs
  activityMetrics: {
    dailyActiveUsers: [234, 287, 312, 298, 345, 389, 412, 398, 423, 447],
    gameCompletions: [124, 156, 143, 167, 189, 176, 198, 204, 192, 215],
    newRegistrations: [45, 52, 38, 67, 58, 49, 72, 61, 55, 68],
  },

  // Recent Activity Feed
  recentActivity: [
    {
      id: 1,
      user: "JohnDoe",
      action: "completed",
      game: "World Capitals Challenge",
      points: 850,
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      user: "QuizMaster",
      action: "created",
      game: "Marvel Cinematic Universe Trivia",
      timestamp: "2024-01-15T09:15:00Z",
    },
    {
      id: 3,
      user: "SarahChen",
      action: "achieved",
      achievement: "Perfect Score",
      game: "Science Fundamentals",
      timestamp: "2024-01-15T08:45:00Z",
    },
    {
      id: 4,
      user: "GameAdmin",
      action: "added",
      items: "15 new questions",
      category: "History",
      timestamp: "2024-01-14T16:20:00Z",
    },
  ],

  // Platform Statistics
  platformStats: {
    averageSessionDuration: "12.5 minutes",
    totalGamesPlayed: 15423,
    averageScore: 72.4,
    favoriteCategory: "Science",
  },
};

export default dashboardStaticData;
