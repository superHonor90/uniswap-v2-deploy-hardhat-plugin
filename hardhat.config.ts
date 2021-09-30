import { HardhatUserConfig } from "hardhat/types";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

import "./src";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      { version: "0.8.7", settings: {} },
      { version: "0.5.16", settings: {} },
      { version: "0.6.6", settings: {} },
    ],
  },
  networks: {},
};

export default config;
