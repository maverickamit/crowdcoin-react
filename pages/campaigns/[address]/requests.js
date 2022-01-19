import Layout from "../../../components/layout";
import Link from "next/link";
import { Table, Button } from "semantic-ui-react";
import Campaign from "../../../components/campaign";
import web3 from "../../../components/web3";

export async function getServerSideProps({ params }) {
  const address = params.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const requests = await Promise.all(
    new Array(parseInt(requestCount)).fill().map((elem, index) => {
      return campaign.methods.requests(index).call();
    })
  );
  const contributorsCount = await campaign.methods.contributorsCount().call();
  return {
    props: {
      address,
      requests: JSON.stringify(requests),
      contributorsCount,
    },
  };
}

const RequestsDetails = ({ address, requests, contributorsCount }) => {
  const { Header, Row, HeaderCell, Body, Cell } = Table;

  return (
    <Layout>
      <h3>Requests List</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Create Request</Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Value in Ether</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Complete</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
          </Row>
        </Header>
        <Body>
          {JSON.parse(requests).map(
            (
              { description, valueInWei, recipient, complete, approvalCount },
              index
            ) => {
              return (
                <Row key={index}>
                  <Cell>{description}</Cell>
                  <Cell>{web3.utils.fromWei(valueInWei, "ether")}</Cell>
                  <Cell>{recipient}</Cell>
                  <Cell>{complete ? "Yes" : "No"}</Cell>
                  <Cell>
                    {approvalCount}/{contributorsCount}
                  </Cell>
                </Row>
              );
            }
          )}
          <Row></Row>
        </Body>
      </Table>
    </Layout>
  );
};

export default RequestsDetails;
