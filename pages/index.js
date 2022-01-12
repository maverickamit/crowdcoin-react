import factory from "../components/factory";
import { Card } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export async function getStaticProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}

const Home = ({ campaigns }) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    };
  });
  return (
    <div>
      <h3>Open Campaigns</h3>
      <Card.Group items={items}></Card.Group>
      <Button content="Create Campaign" icon="add circle" primary />
    </div>
  );
};

export default Home;
