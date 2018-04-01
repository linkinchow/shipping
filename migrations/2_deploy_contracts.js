const ShippingOrder = artifacts.require("./ShippingOrder.sol");

module.exports = function(deployer) {
	deployer.deploy(ShippingOrder);
};
