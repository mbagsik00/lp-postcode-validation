# Lawpath Postcode Validation
An online form which is designed to verify whether the given postcode, suburb, and state is a valid address.

### Built with
* [React](https://reactjs.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [ExpressJS](https://expressjs.com/)
* [Superagent](https://visionmedia.github.io/superagent/)

# Getting Started
Instruction on setting up and running the project locally.
### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation and usage
1. Clone the repo
   ```sh
   git clone https://github.com/mbagsik00/lp-postcode-validation.git
   ```
2. Install client and server NPM packages
   ```sh
   npm install && (cd server && npm install)
   ```
3. Run
   ```sh
   npm run start
   ```
4. Open
   ```
   http://localhost:3000
   ```

### Running the test
```
npm test
```

### TODO and Improvements
- Use docker
- Build using Webpack
- Add linting
- Unit test for client
- Headless automation browser test for client
- Unit and Integration test for server
- Split form inputs into separate components
- Use input hooks
