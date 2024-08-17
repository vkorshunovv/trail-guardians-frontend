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
      <h1>Impact Summary</h1>
      <p>
        Total Completed Events: <span>{metrics.totalEvents}</span>
      </p>
      <p>
        Total Trash Collected: <span>{metrics.totalTrashCollected}</span> kg
      </p>
      <p>
        Total Hours Volunteered: <span>{metrics.totalHoursVolunteered} </span>
        hrs
      </p>
    </div>
  );
};
export default ImpactMetrics;
