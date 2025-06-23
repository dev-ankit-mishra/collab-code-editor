import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentCard() {
  // Simulate the last update being 2 minutes ago
  const [lastUpdated] = useState(new Date(Date.now() - 2 * 60 * 1000));
  const [timeLabel, setTimeLabel] = useState("");

  // Recalculate the label every 30s or so (optional)
  useEffect(() => {
    const updateLabel = () => {
      setTimeLabel(formatDistanceToNow(lastUpdated, { addSuffix: true }));
    };

    updateLabel(); // initial run
    const interval = setInterval(updateLabel, 30000); // every 30s

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="w-68 h-40 bg-gray-700/30 border border-white/10 shadow-md hover:scale-102 hover:shadow-xl transition-all cursor-pointer duration-300 p-5 rounded-md">
      <div className="flex items-center justify-between">
        <span className="text-lg">Project name</span>
        <Ellipsis size={16} className="cursor-pointer" />
      </div>

      <p className="text-sm text-gray-300">{timeLabel}</p>

      <p className="text-sm text-gray-300 mt-12">Created by you</p>
    </div>
  );
}
