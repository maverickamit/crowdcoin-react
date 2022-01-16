import { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "./campaign";
import web3 from "./web3";
import { useRouter } from "next/router";

export default ({ address }) => {
  const [contributionAmount, setContributionAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const campaign = Campaign(address);

  const handleInput = (event) => {
    setContributionAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    setErrorMessage("");
    setSuccessMessage("");
    if (contributionAmount) {
      try {
        event.preventDefault();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsLoading(true);
        await campaign.methods.contribute().send({
          value: web3.utils.toWei(contributionAmount),
          from: accounts[0],
          gasLimit: "150000",
        });
        setContributionAmount("");
        setSuccessMessage("You are now a contributor!");
        router.replace(`/campaigns/${address}`);
      } catch (err) {
        setErrorMessage(err.message);
      }
      setIsLoading(false);
    } else {
      setErrorMessage("Please enter a value.");
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      error={!!errorMessage}
      success={!!successMessage}
    >
      <Form.Field>
        <label>Amount to contribute in Ether</label>
        <Input
          label="Ether"
          labelPosition="right"
          value={contributionAmount}
          onChange={handleInput}
        />
      </Form.Field>
      <Button loading={isLoading} type="submit" primary>
        Contribute!
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
  );
};
