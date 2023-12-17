const WalletList = artifacts.require("WalletList");

module.exports = function (deployer) {
  deployer.deploy(WalletList);
};
