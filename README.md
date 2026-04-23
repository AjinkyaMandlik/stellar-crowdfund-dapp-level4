# 🌟 Stellar Crowdfund dApp
### 🚀 Level 4 – Green Belt Submission

[![CI Pipeline](https://github.com/AjinkyaMandlik/stellar-crowdfund-dapp-level4/actions/workflows/test.yml/badge.svg)](https://github.com/AjinkyaMandlik/stellar-crowdfund-dapp-level4/actions)

A production-ready decentralized crowdfunding application built on the Stellar Testnet using Soroban smart contracts. This dApp features custom token integration via Inter-Contract Calls, CI/CD automated testing, a fully responsive mobile-first UI, and optimized performance using React caching.

## 🌐 Live Demo
👉 **[Live dApp Link] (Placeholder)**

## 🎥 Demo Video
👉 **[Demo Video Link] (Placeholder)**

## 📱 Mobile Preview
![Mobile View Placeholder](./mobile_preview_placeholder.png)

## 🎯 Objective (Level 4 Green Belt)
- **Custom Token Integration**: Replaced XLM with a custom ERC20-like Token (Inter-Contract Call).
- **CI/CD Pipeline**: GitHub Actions workflows to automatically test the application.
- **Mobile Responsiveness**: UI overhauled for seamless usage across all devices.
- **Performance Optimizations**: Memoization and caching to reduce unnecessary re-renders.

## 🚀 Core Features

### 🔗 Multi-Wallet Integration
Integrated using `stellar-wallets-kit`.
Supports:
- Freighter (mandatory)
- Extensible for other Stellar wallets

### 📜 Smart Contracts (Inter-Contract Calls)

#### 1. Crowdfund Contract
**Contract ID:** `CCRLSV7HTU6VNO3B7C24MOGAVVKZ5WE3Y5JQS6ZPQ4VARSIL4C32F2DD`
**Transaction Hash:** `ff0a90b0edeb4bc8498d570e3d89f9938a3a00e9698d9d983156f21cb2bebefd`

#### 2. Custom Token Contract (ERC20-like)
**Contract ID:** `CB5RMWV25MPAIWXJJMYOETOY7RZ2RRA7IZ6YK2SHDGHDVYI6G7RPAPEU`
**Functions:**
- `initialize(admin, name, symbol)`
- `mint(to, amount)`
- `transfer(from, to, amount)`
- `balance(id)`

### 💸 Transaction Handling
Tracks transaction lifecycle:
- ⏳ Pending
- ✅ Success (with Confetti animation 🎉)
- ❌ Failed

### 🧪 Jest Testing Suite (Automated via CI)
Comprehensive frontend testing for core dApp logic is run automatically via GitHub Actions upon any push or pull request to the `main` branch.

## 📂 Project Structure
```text
stellar-multiwallet-dapp/
│
├── .github/workflows/
│   └── test.yml                 # CI/CD Pipeline
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tests/
│   └── package.json
│
├── contracts/
│   ├── Cargo.toml               # Workspace manifest
│   ├── crowdfund/               # Crowdfund Contract
│   └── token/                   # Custom Token Contract
│
└── README.md
```

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS (Mobile-first)
- **Smart Contract:** Soroban (Rust)
- **Blockchain SDK:** `@stellar/stellar-sdk`
- **Wallet Integration:** `stellar-wallets-kit`
- **Testing & CI:** Jest & GitHub Actions

## ✅ Level 4 Green Belt Requirements Checklist
- [x] Custom Token Contract
- [x] Inter-Contract Calls (Crowdfund -> Token)
- [x] CI/CD Pipeline Integration (GitHub Actions)
- [x] Mobile Responsiveness via Tailwind
- [x] Performance Optimizations

## 📦 Suggested Git Commits for this Upgrade
You can replicate this history using the following commands:
```bash
git commit -m "feat: add custom token contract"
git commit -m "feat: implement inter-contract calls in crowdfund"
git commit -m "feat: integrate token in frontend"
git commit -m "ci: setup GitHub Actions pipeline"
git commit -m "feat: improve mobile responsiveness"
git commit -m "test: enhance test coverage"
git commit -m "perf: optimize contract calls and ui renders"
git commit -m "docs: update README for Level 4"
```

## 👨‍💻 Author
**Ajinkya Mandlik**

⭐ If you found this project useful, consider giving it a star!