// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public contractBalance;

    // Event declarations
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event ResetBalance(uint256 oldBalance, uint256 newBalance);
    event AccountAddress(address owner);
    event AccountVerification(address indexed AccountVerify, bool isValid);
    event TransactionLogs(address indexed from, address indexed to, uint256 amount);

    enum TransactionType { Deposit, Withdrawal }

    struct Transaction {
        uint256 amount;
        TransactionType transactionType;
        uint256 timestamp;
    }

    mapping(address => uint256) private balances;
    mapping(address => Transaction[]) private transactionHistory;

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        contractBalance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return contractBalance;
    }

    function deposit(uint256 _amount) public payable {
        uint256 _previousBalance = contractBalance;
        require(_amount > 0, "Deposit amount must be greater than 0");

        contractBalance += _amount;
        balances[msg.sender] += _amount;

        // Record the transaction
        transactionHistory[msg.sender].push(Transaction(_amount, TransactionType.Deposit, block.timestamp));

        emit Deposit(msg.sender, _amount);
        emit TransactionLogs(address(0), msg.sender, _amount);  // Log the deposit
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(balances[msg.sender] >= _withdrawAmount, "Insufficient balance");
        require(contractBalance >= _withdrawAmount, "Contract has insufficient balance");

        contractBalance -= _withdrawAmount;
        balances[msg.sender] -= _withdrawAmount;

        // Record the transaction
        transactionHistory[msg.sender].push(Transaction(_withdrawAmount, TransactionType.Withdrawal, block.timestamp));

        emit Withdraw(msg.sender, _withdrawAmount);
        emit TransactionLogs(msg.sender, address(0), _withdrawAmount);  // Log the withdrawal
    }

    function resetBalance() public {
        // Ensure only the owner can reset the balance
        require(msg.sender == owner, "You are not the owner");

        uint256 oldBalance = contractBalance;
        contractBalance = 1; // Reset contract balance to 1

        // Emit ResetBalance event
        emit ResetBalance(oldBalance, contractBalance);
    }

    function accountAddress() public {
        emit AccountAddress(owner);
    }

    function accountVerified(address AccountVerify) public returns (bool) {
        bool isValid = AccountVerify != address(0);
        emit AccountVerification(AccountVerify, isValid);
        return isValid;
    }

    function getUserBalance(address user) public view returns (uint256) {
        return balances[user];
    }

    function getTransactionLogs(address user) public view returns (Transaction[] memory) {
        return transactionHistory[user];
    }
}
