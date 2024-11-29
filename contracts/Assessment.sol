// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event ResetBalance(uint256 oldBalance, uint256 newBalance);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        // Ensure only the owner can withdraw
        require(msg.sender == owner, "You are not the owner");

        // Check if the balance is sufficient
        require(balance >= _withdrawAmount, "Insufficient balance");

        // Reduce the balance by the withdrawal amount
        balance -= _withdrawAmount;

        // Emit a Withdraw event
        emit Withdraw(_withdrawAmount);
    }

    function resetBalance() public {
        // Ensure only the owner can reset the balance
        require(msg.sender == owner, "You are not the owner");

        uint256 oldBalance = balance;
        balance = 1; // Reset balance to one

        // Emit ResetBalance event
        emit ResetBalance(oldBalance, balance);
    }
}
