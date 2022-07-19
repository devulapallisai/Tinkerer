import { Link } from "gatsby";
import * as React from "react";
import Team from "../components/Team";

// markup
const IndexPage = () => {
  return (
    <div className="py-[5vw]">
      <h1 className="text-xl md:text-3xl font-extrabold">
        Tinkerers Lab IIT Hyderabad
      </h1>
      <p className="md:font-xl font-[14px] py-6">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        magnam officia animi voluptatum labore aperiam molestias, corporis
        voluptas expedita, quia quae alias praesentium est nostrum aspernatur
        saepe eius libero ratione, harum id vel. Nobis mollitia, quod ducimus
        vel aut vitae natus dolorum sit nihil molestiae odit eum eaque,
        pariatur, sed repellat cupiditate minima quo. Libero nulla magni
        voluptas tempore similique accusamus ipsum dolores fuga architecto.
        Delectus, veritatis ipsum. Id velit animi commodi, adipisci eum dolore
        error assumenda corporis pariatur sunt officiis voluptates et ipsa
        reiciendis incidunt amet architecto quisquam quod minima aut officia
        laborum. Officia in ad laudantium necessitatibus voluptates.
      </p>
      <br />
      <h1 className="text-xl md:text-3xl font-extrabold">Team</h1>
      <br />
      <Team />
    </div>
  );
};

export default IndexPage;
