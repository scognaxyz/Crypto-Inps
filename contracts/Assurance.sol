// SPDX-License-Identifier: MIT

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "PriceConsumerV3.sol";

pragma solidity 0.8.16;

contract Factory {
    address public CreditAgricoleAddress;
    struct Contract {
        uint time;
        address owner;
    }
    Contract[] public contracts;
    mapping (address => bool) public partecipants;
    address [] public contractsDeployed;

    modifier onlyCA(){
        require(msg.sender == CreditAgricoleAddress);
        _;
    }

    modifier onlyCreditAgricole(){
        require(msg.sender == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        _;
    }

    modifier onlyNewAddress(){
        require(partecipants[msg.sender] == false);
        _;
    }

    constructor()  { //add onlyCreditAgricole
        CreditAgricoleAddress = msg.sender;
    }

    function createContract(uint time) public onlyNewAddress {   
        Contract memory newContract;
        newContract.time = time;
        newContract.owner = msg.sender; 
        contracts.push(newContract);
        partecipants[msg.sender] = true;
    }

    function getContractsDeployed() external view returns(address [] memory ) {
        return contractsDeployed;
    }


    function deployContract(string memory _name, string memory _uri, string memory _documentHash,address owner, uint time ,address payable fund, address securityAddress) public onlyCA {// Non effettuare diverse polizze sullo stesso address
        Contract memory contractOwner = contracts[0]; 
        uint256 i;

        for(i = 0; i < contracts.length; i++){
            Contract memory contratto = contracts[i];
            if(contratto.owner == owner && contratto.time == time){
                contractOwner = contratto;     
            }
        }
        
        address newIssuing = address (new UnfungibleToken(_name,_uri,_documentHash,contractOwner.time, contractOwner.owner,fund, securityAddress));

        contractsDeployed.push((newIssuing));
    }

    function deployContractForNewOwner (string memory _name, string memory _uri, string memory _documentHash, address newOwner, address owner, uint time ,address payable fund,address securityAddress) public onlyCA {// Non effettuare diverse polizze sullo stesso address
        Contract memory contractOwner = contracts[0]; 
        uint256 i;

        for(i = 0; i < contracts.length; i++){
            Contract memory contratto = contracts[i];
            if(contratto.owner == owner && contratto.time == time){
                contractOwner = contratto;     
            }
        }
        
        address newIssuing = address (new UnfungibleToken(_name,_uri,_documentHash,contractOwner.time, newOwner,fund, securityAddress));

        contractsDeployed.push((newIssuing));
    }

    function sendToFund(address fund) public payable onlyCA {
        (bool sent,) = address(fund).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}

contract UnfungibleToken is PriceConsumerV3{
    uint public time;//fare una struct con tutti i parametri
    address public owner;
    Fund public fund;
    uint public deployDate;
    Security public security;
    mapping (uint => uint) public deposits;
    uint public currentYear;

    struct Document {
        string docHash; // Hash of the document
        uint256 lastModified; // Timestamp at which document details was last modified
        string uri; // URI of the document that exist off-chain
    }

    mapping(string => Document) internal documents;
 
    mapping(string => uint256) internal docIndexes;

    string[] docNames;

    modifier timePassed(){
        require(time + deployDate <= block.timestamp);
        _;
    }

    modifier inTime(){
        require(time + deployDate > block.timestamp);
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyCA(){
        require( tx.origin == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        _;
    }

    constructor (string memory _name, string memory _uri, string memory _documentHash,uint _time,address _owner,address payable fundAddress, address securityAddress ) onlyCA  {
        time = _time;
        owner = _owner;
        fund = Fund(fundAddress);
        security = Security(securityAddress);
        deployDate = block.timestamp;
        setDocument(_name, _uri, _documentHash);
        currentYear = 1;
        deposits[currentYear]= 0;
    }

    function setDocument(string memory _name, string memory _uri, string memory _documentHash) internal  {//introdurre modifica del documento
        //require(_name != string(0), "Zero value is not allowed");
        //require(bytes(_uri).length > 0, "Should not be a empty uri");
        docNames.push(_name);
        docIndexes[_name] = docNames.length;
        documents[_name] = Document(_documentHash, block.timestamp, _uri);
        
    }

    function withdrawRevenue() onlyOwner public {//onlyOwner or ca, if statement per i rendimenti
        uint price_fund = 10;
        uint valueFundInUSD = (address(fund).balance * price_fund);//fratto decimals
        uint totalSupply = security.totalSupply();
        uint balanceSecurity = security.balanceOf(owner);
        uint valueSecurityOwnerInUSD = valueFundInUSD * balanceSecurity/ totalSupply;
        uint revenueInWei = valueSecurityOwnerInUSD*2/100;
        uint amount = balanceSecurity*2/100;
        fund.withdrawRevenue(amount,msg.sender,revenueInWei);
        currentYear = currentYear + 1;
        deposits[currentYear] = deposits[currentYear - 1];
    }

    function deposit() payable public onlyOwner inTime {
        fund.swapDeposit(msg.value,msg.sender);
        (bool sent,) = address(fund).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        uint price = 10;//uint (getLatestPrice())
        uint depositInDollar = (msg.value * price)/(10**17) ;
        deposits[currentYear] += depositInDollar;
    }

    function withdraw(uint256 amount)  public onlyOwner timePassed{
        fund.swapWithdraw(amount,msg.sender);
    }




}

contract Security is ERC20 {
    address public CreditAgricoleAddress;
    address public fundAddress;
    address public CA;
    uint256 public bob2;
    uint256 public balance;

    event Mint(address indexed from, address indexed to, uint256 value);
    event Burnt(address indexed from, address indexed to, uint256 value);
    

    modifier onlyFundAddress(){
        require( msg.sender == fundAddress);
        _;
    }

    modifier onlyCreditAgricole(){
        require(msg.sender == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        _;
    }

    constructor(string memory name_, string memory symbol_,address _fundAddress) ERC20 ( name_, symbol_ ) onlyCreditAgricole{
        CreditAgricoleAddress = msg.sender;
        fundAddress = _fundAddress;
        CA = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    }

    function mint(address account, uint256 percentage,uint256 netValue)  external  onlyFundAddress {
        uint256 totalSupply = totalSupply();
        if (totalSupply == 0 ) {
            _mint (CA, 1 );
            uint256 amount = netValue;
            _mint( account, amount);
        } else {
        uint256 amount = (percentage * totalSupply)/10**18;
        bob2 = amount;
        _mint( account, amount);}
        
    }

    function burn(address account, uint256 amount)  external onlyFundAddress {
        _burn(account,amount);
    }

    function transferFrom(address from, address to, uint256 amount) public onlyCreditAgricole override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;

    }

    function transfer(address to, uint256 amount) public onlyCreditAgricole override returns (bool){
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
        }
    
    
    function decreaseAllowance( address spender, uint256 subtractedValue) public override returns (bool) {
        address owner = msg.sender;
        spender = CA;
        uint256 currentAllowance = allowance(owner,CA);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, CA, currentAllowance - subtractedValue);
        }

        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public override returns (bool) {
        address owner = _msgSender();
        spender = CA;
        _approve(owner, CA, allowance(owner, CA) + addedValue);
        return true;
    }


}

contract Fund is PriceConsumerV3{
    using SafeMath for uint256;
    Factory public factory;
    Security public security;
    address public CA;
    uint256 public bob;
    uint256 public value;
    mapping (address => bool) public contractsDeployed;
    address public addressFee;

    modifier onlyCreditAgricole(){
        require(msg.sender == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        _;
    }

    constructor(address factoryAddress, address _addressFee) payable onlyCreditAgricole{

        factory = Factory(factoryAddress);
        addressFee = _addressFee;
        CA = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    }

    function interfaceSecurity(address securityAddress) public onlyCreditAgricole{
        security = Security(securityAddress);
    }

    receive() external payable {
        uint256 fee = msg.value.mul(3).div(100);
        feePayment(fee);
    }// reindirizzamento automatico ad un wallet di accumulo fee

    function feePayment(uint fee) internal {
        (bool sent,) = addressFee.call{value: fee}("");
        require(sent, "Failed to send Ether");
    }

    function swapWithdraw(uint256 amount, address issuingOwner)  external  {//%fee add price_fund specific and decimals
        require(contractsDeployed[msg.sender]);

        uint price =  10;
        uint price_fund = 10;
        uint valueFundInUSD = (address(this).balance * price_fund);//26decimals
        value = valueFundInUSD;
        uint totalSupply = security.totalSupply();
        uint valueSingleTokenInUSD = valueFundInUSD / totalSupply;
        
        security.burn(issuingOwner, amount);
        uint256 netValue = amount.mul(97).div(100);
        uint256 netValueInUSD = netValue * valueSingleTokenInUSD;
        uint256 netValueInWei = netValueInUSD * price;
        uint256 fee = amount.mul(3).div(100);
        uint256 feeInUSD = fee * valueSingleTokenInUSD;
        uint256 feeValueInWei = feeInUSD * price;
        (bool sent,) = tx.origin.call{value: netValueInWei}("");
        require(sent, "Failed to send Ether");
        feePayment(feeValueInWei);
        
    }

    function swapDeposit(uint256 amount, address issuingOwner)  external  {//%fee add price_fund specific and decimals

        address [] memory listContractsDeployed = factory.getContractsDeployed();
        uint256 i;// poco scalabile
        for(i=0; i < listContractsDeployed.length; i++) {
        contractsDeployed[listContractsDeployed[i]] = true;
        }

        require(contractsDeployed[msg.sender]);
        //aggiungere conversione altri token
        uint256 netValue = amount.mul(97).div(100);
        uint price = 10;//uint (getLatestPrice())
        uint price_fund = 10;
        uint256 netValueinUSD = (netValue * price);//26decimals
        uint256 ValueFundinUSD = (address(this).balance * price_fund);//26Decimals
        uint256 percentagein16Decimals = (netValueinUSD).mul(10**18).div(ValueFundinUSD);
        bob = percentagein16Decimals;
        security.mint(issuingOwner, percentagein16Decimals,netValue);
        
    }

    function withdrawRevenue(uint256 amount, address issuingOwner, uint256 revenue) external {
        require(contractsDeployed[msg.sender]);
        security.burn(issuingOwner, amount);
        (bool sent,) = CA.call{value: revenue}("");
        require(sent, "Failed to send Ether");
    }
}