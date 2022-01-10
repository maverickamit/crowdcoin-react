import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  //We are in the browser and running metamusk
  web3 = new Web3(window.ethereum);
} else {
  //We are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/54e9e6e10adc4444a00d725a13dc345d"
  );
  web3 = new Web3(provider);
}
export default web3;
