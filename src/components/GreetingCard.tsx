import "../styles/GreetingCard.css";
import { GreetingCardProps } from "../constants";

const GreetingCard = ({ setMapVisible }: GreetingCardProps) => {
  return (
    <div className="greeting-card">
      <section onClick={() => setMapVisible(true)}>
        <h2>
          Welcome to TrailGuardians!
        </h2>
        <p>
          TrailGuardians is your community platform for organizing and
          participating in trail clean-up efforts. Here's how to get started:
        </p>
        <ul>
          <li>
            <p>
              Notice a spot that needs attention?<span className="report-span">Report</span> it by providing a
              description, photo, and location.
            </p>
          </li>
          <li>
            <p>
              Browse upcoming events, sign up, and join fellow community members,
              or just<span className="event-span">Create</span> your own!
            </p>
          </li>
        </ul>
        <p>Click to see the map and explore the areas that need your help!</p>
      </section>
    </div>
  );
};

export default GreetingCard;
