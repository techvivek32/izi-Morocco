import dashboardStaticData from "../helper";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { useMemo } from "react";

const Dashboard = () => {
  const { games, questions, tagsChartData, activeUsers, recentActivity } =
    dashboardStaticData;

  const tagsChartConfig = {
    visitors: {
      label: "Questions",
    },
    Technology: {
      label: "Technology",
      color: "#0d3b66",
    },
    Music: {
      label: "Music",
      color: "#f4d35e",
    },
    Literature: {
      label: "Literature",
      color: "#f95738",
    },
    Art: {
      label: "Art",
      color: "#faf0ca",
    },
    Mathematics: {
      label: "Mathematics",
      color: "#ee964b",
    },
  };

  const totalQuestions = useMemo(() => {
    return tagsChartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="common-page">
      <h1 className="text-2xl font-bold">Platform Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 justify-between min-h-[15dvh]">
        {/* game section */}
        <div className="border border-warning/50 rounded-lg h-full p-4 bg-accent/5">
          <h3 className="font-semibold mb-2 text-xl">Total Games</h3>
          <div className="flex items-baseline">
            <span className="text-3xl text-accent font-semibold">
              {games.total}
            </span>
            <span className="font-medium text-green-500 ml-2">
              {games.trending}
            </span>
          </div>
          <div className="mt-2 text-sm">
            {games.breakdown.published} published • {games.breakdown.draft}{" "}
            draft
          </div>
        </div>
        {/* task section */}
        <div className="border border-warning/50 rounded-lg h-full p-4 bg-accent/5">
          <h3 className="font-semibold mb-2 text-xl">Total Questions</h3>
          <div className="flex items-baseline">
            <span className="font-semibold text-3xl text-accent">
              {questions.total}
            </span>
            <span className="font-medium text-green-500 ml-2">
              {questions.trending}
            </span>
          </div>
          <div className="mt-2 text-sm">
            Avg. {questions.averagePerGame} per game
          </div>
        </div>
        {/* active users */}
        <div className="border border-warning/50 rounded-lg h-full p-4 bg-accent/5">
          <h3 className="font-semibold mb-2 text-xl">Active Users</h3>
          <div className="flex items-baseline">
            <span className="font-semibold text-3xl text-orange-600">
              {activeUsers.total}
            </span>
            <span className="font-medium text-green-500 ml-2">
              {activeUsers.trending}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Retention: {activeUsers.retentionRate}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-between min-h-[50dvh]">
        <div className="border border-warning/50 rounded-lg h-full p-4 ">
          <h3 className="font-semibold mb-2 text-xl">Tags Distribution</h3>
          <div className="flex items-end">
            {/* main chart */}
            <ChartContainer
              config={tagsChartConfig}
              className="aspect-square max-h-[300px] min-h-[150px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={tagsChartData}
                  dataKey="visitors"
                  nameKey="tag"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalQuestions.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Questions
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            {/* Legend for top tags */}
            <div className="space-y-2 w-fit">
              <h4 className="font-medium text-sm">Top Tags</h4>
              {tagsChartData.slice(0, 5).map((item) => (
                <div key={item.tag} className="flex items-center text-xs gap-1">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span>{item.tag}</span>
                  </div>
                  <span className="font-medium">{item.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* recent activity */}
        <div className="border border-warning/50 rounded-lg h-full p-4">
          <h3 className="font-bold text-xl mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 border-b border-warning/50"
              >
                <div>
                  <span className="font-semibold">{activity.user}</span>
                  <span className="text-gray-600 ml-2">
                    {activity.action}{" "}
                    {activity.game || activity.achievement || activity.items}
                  </span>
                  {activity.points && (
                    <span className="font-medium text-green-600 ml-2">
                      +{activity.points} pts
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
