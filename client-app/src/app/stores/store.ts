import { createContext, useContext } from "react";
import { CommonStore } from "./commonStore";
import ModalStore from "./modalStore";
import PlaidStore from "./plaidStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  plaidStore: PlaidStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  plaidStore: new PlaidStore()
};

export const StoreContext = createContext(store); 

export function useStore() {
  return useContext(StoreContext);
}
