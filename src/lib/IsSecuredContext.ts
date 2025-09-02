const isSecuredContext = () => {
  const url = new URL(window.location.href);
  const protocol = url.protocol;
  const isLocalhost = url.hostname === 'localhost';
  return protocol === 'https:' || isLocalhost;
};

export { isSecuredContext };
