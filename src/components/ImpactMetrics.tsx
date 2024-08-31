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
  const [targetMetrics, setTargetMetrics] = useState<MetricsData | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getImpactMetrics();
      setTargetMetrics(data);
    };
    fetchMetrics();
  }, []);

  useEffect(() => {
    if (targetMetrics) {
      const intervalId = setInterval(() => {
        setMetrics((prevMetrics) => {
          const { totalEvents, totalTrashCollected, totalHoursVolunteered } =
            prevMetrics;

          const increment = 1;
          const newTotalEvents = Math.min(
            totalEvents + increment,
            targetMetrics.totalEvents
          );
          const newTrashCollected = Math.min(
            totalTrashCollected + increment,
            targetMetrics.totalTrashCollected
          );
          const newHoursVolunteered = Math.min(
            totalHoursVolunteered + increment,
            targetMetrics.totalHoursVolunteered
          );

          if (
            newTotalEvents >= targetMetrics.totalEvents &&
            newTrashCollected >= targetMetrics.totalTrashCollected &&
            newHoursVolunteered >= targetMetrics.totalHoursVolunteered
          ) {
            clearInterval(intervalId);
          }

          return {
            totalEvents: newTotalEvents,
            totalTrashCollected: newTrashCollected,
            totalHoursVolunteered: newHoursVolunteered,
          };
        });
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [targetMetrics]);

  return (
    <div className="impact-metrics">
      <div>
        <p>Already Events Created</p>
        <span>{metrics.totalEvents}</span>
      </div>
      <div>
        <p>Total Trash Collected </p>
        <span>{metrics.totalTrashCollected} kg</span>
      </div>
      <div>
        <p>Total Hours Volunteered </p>
        <span>{metrics.totalHoursVolunteered} hrs</span>
      </div>
    </div>
  );
};
export default ImpactMetrics;
