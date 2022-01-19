import { useState } from "react";
import { Form, Input, Button, Message, Grid } from "semantic-ui-react";
import Layout from "../../../../components/layout";
import Campaign from "../../../../components/campaign";
import web3 from "../../../../components/web3";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const address = params.address;
  return {
    props: {
      address,
    },
  };
}

const RequestNew = ({ address }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const campaign = Campaign(address);
    setErrorMessage("");
    setSuccessMessage("");
    if (description && amount && recipient) {
      setIsLoading(true);
      try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
          .createRequest(description, web3.utils.toWei(amount), recipient)
          .send({
            from: accounts[0],
            gasLimit: 3000000,
          });
        setIsLoading(false);
        setSuccessMessage("A new request has been created.");
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <h3>Create a Request</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>Go Back</a>
            </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form
              onSubmit={handleSubmit}
              error={!!errorMessage}
              success={!!successMessage}
            >
              <Form.Field>
                <label>Description</label>
                <Input
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Amount in ether</label>
                <Input
                  label="Ether"
                  labelPosition="right"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Recipient</label>
                <Input
                  value={recipient}
                  onChange={(event) => {
                    setRecipient(event.target.value);
                  }}
                />
              </Form.Field>
              <Button loading={isLoading} type="submit" primary>
                Create!
              </Button>
              <Message
                error
                header="There is an error with your submission."
                content={errorMessage}
              />
              <Message
                success
                header="Your form submission was successful."
                content={successMessage}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default RequestNew;
