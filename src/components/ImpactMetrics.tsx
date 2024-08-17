import { useState, useEffect } from "react";
import { getImpactMetrics } from "../services/impactMetrics";
import { MetricsData } from "../constants";

const ImpactMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    totalEvents: 0,
    totalTrashCollected: 0,
    totalHoursVolunteered: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getImpactMetrics();
      setMetrics(data);
    };
    fetchMetrics();
  }, []);

  return (
    <div>
      <h1>Impact Summary</h1>
      <p>{`Total Events: ${metrics.totalEvents}`}</p>
      <p>{`Total Trash Collected: ${metrics.totalTrashCollected} kg`}</p>
      <p>{`Total Hours Volunteered: ${metrics.totalHoursVolunteered}`}</p>
    </div>
  );
};
export default ImpactMetrics;
