pragma solidity 0.5.16;
import './ERC20.sol';

contract PnxToken is ERC20{
    using SafeMath for uint;

    string private _name = "Phoenix Token";
    string private _symbol = "PHX";

    uint8 private _decimals = 18;

    /// FinNexus total tokens supply
    uint public MAX_TOTAL_TOKEN_AMOUNT = 176495407 ether;

    constructor(address initiator)public{
        _init(initiator,MAX_TOTAL_TOKEN_AMOUNT);
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

}