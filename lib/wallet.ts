export const shortenAddress = (address: string) => {
  if (String(address).length <= 10) {
    return address;
  }
  return `${String(address).slice(0, 6)}...${String(address).slice(-4)}`;
};

export const copyToClipboard: Function = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
