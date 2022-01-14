import { useRouter } from "next/router";
import Layout from "../../components/layout";

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
