import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Campaign from "../../components/campaign";

export async function getStaticProps({ params }) {
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

export async function getStaticPaths() {
  return {
    paths: [{ params: { address: "" } }], // will be passed to getStaticProps as a parameter
    fallback: true, // See the "fallback" section below
  };
}

const CampaignDetails = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <Layout>
      <h1>Campaign Details: {address}</h1>
    </Layout>
  );
};

export default CampaignDetails;
