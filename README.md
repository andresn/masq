# masq-app

[![](https://img.shields.io/badge/project-Masq-7C4DFF.svg?style=flat-square)](https://github.com/QwantResearch/masq-app)
[![](https://api.travis-ci.org/QwantResearch/masq-app.svg)](https://travis-ci.org/QwantResearch/masq-app)
[![](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The Masq App based on electron.

# Overview
This project is based on [create-react-app](https://github.com/facebook/create-react-app).

## Quick start
Initialize submodule in `src/masq`
```
git submodule init && git submodule update
```

install libs dependencies
```
cd src/masq/store && npm i
cd ../socket && npm i
cd ../../.. # go back to the root
```

Start the app
```
npm install
npm run electron-dev
```

# Storybook
To see all components and their props, and develop them in isolation, you
can start the Storybook with:
```
npm run storybook
```
