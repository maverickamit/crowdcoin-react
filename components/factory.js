import web3 from "./web3";
import CampaignFactory from "../ethereum/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x827409E03632f522e063C7034cdb8b7bF82e3E57"
);

export default instance;
