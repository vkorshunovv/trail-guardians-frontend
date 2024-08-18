import { useState, useEffect } from "react";
import { getImpactMetrics } from "../services/impactService";
import { MetricsData } from "../constants";
import "../styles/ImpactMetrics.css";

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
    <div className="impact-metrics">
      {/* <h1>Impact Summary</h1> */}
      <div>
        <p>Total Completed Events: </p>
        <span>{metrics.totalEvents}</span>
      </div>
      <div>
        <p>Total Trash Collected: </p>
        <span>{metrics.totalTrashCollected} kg</span>
      </div>
      <div>
        <p>Total Hours Volunteered:</p>
        <span>{metrics.totalHoursVolunteered} hrs</span>
      </div>
    </div>
  );
};
export default ImpactMetrics;
