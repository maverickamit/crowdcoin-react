import factory from "../components/factory";
import { Card } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import Layout from "../components/layout";
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
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        <Card.Group items={items}></Card.Group>
      </div>
    </Layout>
  );
};

export default Home;
