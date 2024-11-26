# Starter Next/Hardhat Project

This Javascript and Solidity Program is a simple project for "Function-Frontend" that demonstrates changing our account balances in metamask. 


## Description
This program is a simple contract written in Javascript and Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract has 3 functions that will change the Ethereum value. Mainly the program will use the Deposite, Withdraw and Generate random number functions.

# How To Run The Code
1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

# Setting Up The Metamask
Follow the instructions in :
https://www.youtube.com/watch?v=e_4-Q77XJkw

Timestamp:
16:40-30:10

Install and set up your metamask account then when you run the program. After you connect your metamask now you can interact with the browser. First is to click the Generate the Random number button to see what value of your etherum that will be deposited in your account. The random number will range from 1 to 9. After you see the value then click deposit ETH button, a small window will pop-up to confirm the transaction then click confirm it will automatically add the value to your balance. If you want to withdraw from your account you will just click Withdraw ETH button then a small window will pop-up to confirm the transaction then click confirm it will automatically reduce the value to your balance. The withdraw value is set to 100 so everytime you hit the withdraw button it will automatically reduce your balance to 100. 



## Authors
@Dracogray24
