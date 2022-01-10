import web3 from "./web3";
import CampaignFactory from "../ethereum/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xC6DBca868ef3b61d6F6fD4F3D322c5f1c0B666f0"
);

export default instance;
