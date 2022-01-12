import Layout from "../../components/layout";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import factory from "../../components/factory";
import { Message } from "semantic-ui-react";

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    setMinimumContribution(event.target.value);
  };

  const handleSubmit = async (event) => {
    setErrorMessage("");
    if (minimumContribution) {
      try {
        event.preventDefault();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await factory.methods.createCampaign(minimumContribution).send({
          from: accounts[0],
        });
        setMinimumContribution("");
      } catch (err) {
        if (err.message.includes("invalid BigNumber string")) {
          setErrorMessage(
            "Only numbers without any decimal values are allowed."
          );
        } else {
          setErrorMessage(err.message);
        }
      }
    } else {
      setErrorMessage("Please enter a minimum value.");
    }
  };

  return (
    <Layout>
      <h1>Create a Campaign</h1>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution in Wei</label>
          <Input
            label="Wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={handleInput}
          />
        </Form.Field>
        <Button type="submit" primary>
          Create!
        </Button>
        <Message
          error
          header="There is an error with your submission."
          content={errorMessage}
        />
      </Form>
    </Layout>
  );
};
export default CampaignNew;
