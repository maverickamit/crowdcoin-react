import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Campaign from "../../components/campaign";
import { Button, Card, Grid } from "semantic-ui-react";
import ContributeForm from "../../components/contributeForm";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const campaign = Campaign(params.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      totalRequests: summary[2],
      contributorsCount: summary[3],
      manager: summary[4],
    }, // will be passed to the page component as props
  };
}

const CampaignDetails = ({
  minimumContribution,
  balance,
  totalRequests,
  contributorsCount,
  manager,
}) => {
  const router = useRouter();
  const { address } = router.query;

  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description: "The manager created this campaign and can create requests.",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum contribution (wei)",
      description:
        "You must contribute at least this much wei to be a contributor.",
    },
    {
      header: totalRequests,
      meta: "Number of requests",
      description:
        "A request tries to withdraw money from the campaign. Requests must be approved by the contributors.",
    },
    {
      header: contributorsCount,
      meta: "Number of contributors",
      description:
        "Number of people who contributed at least the minimum amount to the campaign.",
    },
    {
      header: balance,
      meta: "Campaign balance (wei)",
      description: "The balance is how much money the campaign has right now.",
    },
  ];

  return (
    <Layout>
      <h3>Campaign Details: {address}</h3>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items}></Card.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <Button primary>View Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default CampaignDetails;
