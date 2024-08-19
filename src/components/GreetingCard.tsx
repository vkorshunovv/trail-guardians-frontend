import "../styles/GreetingCard.css";
import { GreetingCardProps } from "../constants";

const GreetingCard = ({ setMapVisible }: GreetingCardProps) => {
  return (
    <div className="greeting-card">
      <button onClick={() => setMapVisible(true)}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          doloremque similique, ea unde repellendus, expedita quis iusto
          nesciunt nemo provident quia alias consequatur dolore, corporis quod
          placeat possimus illo enim!
        </p>
        <ul>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus cupiditate esse, enim quis recusandae, ullam ipsa
            obcaecati officia voluptates doloribus soluta, ipsam vel modi! Minus
            facere non repellat ducimus molestias.
          </li>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi atque
            quibusdam sit? Sunt quae velit sint, eum minima, fugit obcaecati
            aperiam illo saepe placeat quo ipsa rem dolores repellendus magnam!
          </li>
        </ul>
      </button>
      {/* <button onClick={() => setMapVisible(true)}>Flip & Go</button> */}
    </div>
  );
};

export default GreetingCard;
