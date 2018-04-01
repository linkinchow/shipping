pragma solidity ^0.4.17;

contract ShippingOrder {

  address public owner;

  struct orderInfo {
    string container_no;
    string commodity;
    string order_filename;
    string order_timestamp;

    string confirmation_filename;
    string confirmation_timestamp;

    string shipper_name;
    string invoice_no;
    string bank;
    string account_no;

    bool created;
    bool confirmed;
    bool submitted;
  }

  mapping(string => orderInfo) orders;
  mapping(address => string) roles;

  event orderIsCreated(string order_id);
  event orderIsNotCreated(string order_id);
  event orderIsConfirmed(string order_id);
  event orderIsNotConfirmed(string order_id);
  event orderIsSubmitted(string order_id);
  event accessDenied(string role);

  event createdOrder(string order_id);
  event confirmedOrder(string order_id);
  event submittedOrder(string order_id);
  event roleSet(string role);

  modifier orderNotCreated(string order_id) {
    if (orders[order_id].created == true) {
      orderIsCreated(order_id);
      return;
    }
    _;
  }

  modifier orderCreated(string order_id) {
    if (orders[order_id].created == false) {
      orderIsNotCreated(order_id);
      return;
    }
    _;
  }

  modifier orderNotConfirmed(string order_id) {
    if (orders[order_id].confirmed == true) {
      orderIsConfirmed(order_id);
      return;
    }
    _;
  }

  modifier orderConfirmed(string order_id) {
    if (orders[order_id].confirmed == false) {
      orderIsNotConfirmed(order_id);
      return;
    }
    _;
  }

  modifier orderNotSubmitted(string order_id) {
    if (orders[order_id].submitted == true) {
      orderIsSubmitted(order_id);
      return;
    }
    _;
  }

  modifier hasRole(string role) {
    if (keccak256(roles[msg.sender]) != keccak256(role)) {
      accessDenied(role);
      return;
    }
    _;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) {
      accessDenied('Admin');
      return;
    }
    _;
  }

  function ShippingOrder() public {
    owner = msg.sender;
  }

  function createOrder(string order_id, string container_no, string commodity, string order_filename, string order_timestamp) 
  hasRole('Forwarder')
  orderNotCreated(order_id)
  public {
    orders[order_id].container_no = container_no;
    orders[order_id].commodity = commodity;
    orders[order_id].order_filename = order_filename;
    orders[order_id].order_timestamp = order_timestamp;
    orders[order_id].created = true;
    createdOrder(order_id);
  }

  function confirmOrder(string order_id, string confirmation_filename, string confirmation_timestamp) 
  hasRole('Carrier')
  orderCreated(order_id)
  orderNotConfirmed(order_id)
  public {
    orders[order_id].confirmation_filename = confirmation_filename;
    orders[order_id].confirmation_timestamp = confirmation_timestamp;
    orders[order_id].confirmed = true;
    confirmedOrder(order_id);
  }

  function submitInstruction(string order_id, string shipper_name, string invoice_no, string bank, string account_no) 
  hasRole('Shipper')
  orderConfirmed(order_id)
  orderNotSubmitted(order_id)
  public {
    orders[order_id].shipper_name = shipper_name;
    orders[order_id].invoice_no = invoice_no;
    orders[order_id].bank = bank;
    orders[order_id].account_no = account_no;
    orders[order_id].submitted = true;
    submittedOrder(order_id);
  }

  function getOrder(string order_id) 
  hasRole('Carrier')
  orderCreated(order_id)
  public view returns (string, string, string, string) {
    return (orders[order_id].container_no,
            orders[order_id].commodity,
            orders[order_id].order_filename,
            orders[order_id].order_timestamp);
  }

  function getConfirmation(string order_id) 
  hasRole('Shipper')
  orderConfirmed(order_id)
  public view returns (string, string) {
    return (orders[order_id].confirmation_filename, 
            orders[order_id].confirmation_timestamp);
  }

  function setRole(address addr, string role) 
  onlyOwner()
  public {
    roles[addr] = role;
    roleSet(role);
  }

  function getRole(address addr) 
  onlyOwner()
  public view returns (string) {
    return roles[addr];
  }

  /*function compareStrings(string a, string b) internal pure returns (bool) {
    return keccak256(a) == keccak256(b);
  }*/
}
