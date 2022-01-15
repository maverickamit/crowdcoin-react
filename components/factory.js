import web3 from "./web3";
import CampaignFactory from "../ethereum/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x6BA633c87C419aDF5520Ca245B280a4F6AaFa256"
);

export default instance;
