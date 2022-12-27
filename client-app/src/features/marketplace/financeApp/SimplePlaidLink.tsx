// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function

import { observer } from "mobx-react-lite";
import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { useStore } from "../../../app/stores/store";

// in configuration to initialize Plaid Link
interface LinkProps {

}
export default observer(function SimplePlaidLink({}: LinkProps) {
  const { plaidStore } = useStore();
  const onSuccess = React.useCallback((public_token: any, metadata: any) => {
    // send public_token to server
    const response = fetch('http://localhost:5000/api/plaid/accesstoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ...
  }, []);
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: plaidStore.linkToken,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
});