import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { constants, utils } from "ethers";
import { ethers } from "hardhat";
import {
  UniswapV2Deployer,
  IUniswapV2Factory,
  IUniswapV2Pair__factory,
  IUniswapV2Router02,
} from "../src";
import { Token, Token__factory } from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

function eth(n: number) {
  return utils.parseEther(n.toString());
}

describe("swap", () => {
  let signer: SignerWithAddress;
  let token0: Token;
  let token1: Token;
  let factory: IUniswapV2Factory;
  let router: IUniswapV2Router02;

  beforeEach(async () => {
    [signer] = await ethers.getSigners();

    ({ factory, router } = await UniswapV2Deployer.deploy(signer));

    const tokenFactory = (await ethers.getContractFactory(
      "Token",
      signer
    )) as Token__factory;

    token0 = await tokenFactory.deploy(eth(1_000));
    token1 = await tokenFactory.deploy(eth(1_000));
    await token0.deployed();
    await token1.deployed();
  });

  it("works", async () => {
    await token0.approve(router.address, eth(100));
    await token1.approve(router.address, eth(100));

    await router.addLiquidity(
      token0.address,
      token1.address,
      eth(10),
      eth(10),
      0,
      0,
      signer.address,
      constants.MaxUint256
    );

    const pair = IUniswapV2Pair__factory.connect(
      await factory.getPair(token0.address, token1.address),
      signer
    );

    expect((await pair.balanceOf(signer.address)).toString()).equal(
      "9999999999999999000"
    );

    await router.swapExactTokensForTokens(
      eth(1),
      0,
      [token0.address, token1.address],
      signer.address,
      constants.MaxUint256
    );

    expect(await (await token0.balanceOf(signer.address)).toString()).to.equal(
      "989000000000000000000"
    );
    expect(await (await token1.balanceOf(signer.address)).toString()).to.equal(
      "990906610893880149131"
    );
  });
});
