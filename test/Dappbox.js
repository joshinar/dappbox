const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Dappbox', () => {
  async function loadContractFixture() {
    const Contract = await ethers.getContractFactory('Dappbox');
    const dappbox = await Contract.deploy('DappBox');
    await dappbox.deployed();
    const [deployer, otherAccount] = await ethers.getSigners();
    return { dappbox, deployer, otherAccount };
  }

  it('Sets the correct name', async () => {
    const { dappbox } = await loadFixture(loadContractFixture);
    const name = await dappbox.name();
    expect(name).to.equal('DappBox');
  });

  it('Should upload file', async () => {
    const { dappbox, deployer } = await loadFixture(loadContractFixture);
    await dappbox.uploadFile('123xty46', 300, 'png', 'sample1', 'description1');
    await dappbox.uploadFile(
      '0x0x0x0x',
      500,
      'jpeg',
      'sample2',
      'description2'
    );
    const userFiles = await dappbox.retriveUserFiles(deployer.address);
    expect(userFiles.length).to.equal(2);
  });
});
