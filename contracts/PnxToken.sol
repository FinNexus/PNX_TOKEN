pragma solidity 0.5.16;
import './ERC20.sol';

contract PnxToken is ERC20{
    using SafeMath for uint;

    string private _name = "Phenix";
    string private _symbol = "PNX";

    uint8 private _decimals = 18;

    address private _initiator;
    address private _operator;

    /// FinNexus total tokens supply
    uint public MAX_TOTAL_TOKEN_AMOUNT = 176495407 ether;

    modifier maxWanTokenAmountNotReached (uint amount){
    	  assert(totalSupply().add(amount) <= MAX_TOTAL_TOKEN_AMOUNT);
    	  _;
    }

    constructor(address initiator,address operator)public{
        _initiator = initiator;
        _operator = operator;
        _mint(initiator,MAX_TOTAL_TOKEN_AMOUNT);
    }
    /**
     * @return the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function getInitiators() public view returns (address,address) {
        return (_initiator, _operator);
    }

  /**
     * EXTERNAL FUNCTION
     *
     * @dev change token name
     * @param name token name
     * @param symbol token symbol
     *
     */
    function changeTokenName(string memory name, string memory symbol)
        public
    {
        require(msg.sender==_operator,"sender is not operator");
        _name = name;
        _symbol = symbol;
    }

}