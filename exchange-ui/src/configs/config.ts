export const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY || "";
export const web3StorageKey = process.env.REACT_APP_WEB3STORAGE_TOKEN || "";
export const liabilityAddress = process.env.REACT_APP_LIABILITY_ADDRESS || "";

export const clientTypes = {
  exchangeAdmin: "Exchange Admin",
  exchangeUser: "Exchange User",
  public: "Public",
  main: "Main",
};

export const routes = {
  main: "/",
  exchangeUser: "/exchange-user",
  exchangeAdmin: "/exchange-admin",
  progressTracker: "/exchange-proof-of-liability-progress-tracker",
};

export const tableBorderClass = "border-2 border-stone-900 p-1 px-2";
