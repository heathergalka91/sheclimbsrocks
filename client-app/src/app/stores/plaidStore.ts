import { create } from "domain";
import {makeAutoObservable, reaction, runInAction} from "mobx";
import agent from "../api/agent";

export default class PlaidStore {
  linkToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.createLinkToken();
  }

  createLinkToken = async () => {
      this.linkToken = (await agent.Plaid.linkToken()).link_token;
  }
}