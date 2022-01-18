import Layout from "../../../components/layout";
import Link from "next/link";
import { Button } from "semantic-ui-react";

export async function getServerSideProps({ params }) {
  const address = params.address;
  return {
    props: {
      address,
    },
  };
}

const RequestsDetails = ({ address }) => {
  return (
    <Layout>
      <h3>Requests List</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Create Request</Button>
      </Link>
    </Layout>
  );
};

export default RequestsDetails;
