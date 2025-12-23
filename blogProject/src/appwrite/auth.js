import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.projectUrl)
      .setProject(config.appwriteprojectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userData = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userData) {
        return this.login(email, password);
      } else {
        return userData;
      }

      //   return true
    } catch (error) {
      console.log("authService :: createAccount :: error", error);
      return false;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("authService :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("authService :: getCurrentUser :: error", error);
      return false;
    }
  }

  async emailVerification() {
    try {
      //maybe make it like just await and then return true
      return await this.account.createVerification({
        url: "http://localhost:5173/verify",
      });
    } catch (error) {
      console.log("authService :: emailVerification :: error", error);
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("authService :: logOut :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
