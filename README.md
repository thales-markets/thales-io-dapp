# Thales Protocol

[![Discord](https://img.shields.io/discord/906484044915687464.svg?color=768AD4&label=discord&logo=https%3A%2F%2Fdiscordapp.com%2Fassets%2F8c9701b98ad4372b58f13fd9f65f966e.svg)](https://discord.com/invite/rB3AWKwACM)
[![Twitter Follow](https://img.shields.io/twitter/follow/Thales.svg?label=Thales&style=social)](https://twitter.com/thales_io)

## Tech stack

-   React
-   React Redux
-   React Query
-   react-i18next
-   styled-components
-   Material UI
-   Recharts

## Ethereum stack

-   `ethers.js` v5 - Ethereum wallet implementation.
-   `RainbowKit` and `wagmi` - for ethereum wallet connectivity.
-   [thales-data](https://github.com/thales-markets/thales-data) - for historical data (powered by [TheGraph](https://thegraph.com/))

## Development

### Install dependencies

```bash
npm i
```

### Run

```bash
npm run start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
