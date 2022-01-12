import Layout from "../../components/layout";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");

  const handleInput = (event) => {
    setMinimumContribution(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(minimumContribution);
  };

  return (
    <Layout>
      <h1>New Campaign.</h1>
      <Form onSubmit={handleSubmit}>
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
          Submit
        </Button>
      </Form>
    </Layout>
  );
};
export default CampaignNew;
