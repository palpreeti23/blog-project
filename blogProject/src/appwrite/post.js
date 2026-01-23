import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../config/config";

class AppwriteService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.projectUrl)
      .setProject(config.appwriteprojectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //database

  async createPost({ title, content, status, featuredImage, slug, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("appwriteService :: createPost :: error", error);
      throw error;
    }
  }

  async updatePostData(slug, { title, content, status, featuredImage }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("appwriteService :: updatePostData :: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwriteService :: grtPost :: error", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwriteService :: getPosts :: error", error);
      throw error;
    }
  }

  async deletePostData(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwriteService :: deletePostData :: error", error);
      throw error;
      return false;
    }
  }

  // async getUserPosts(userId) {
  //   return await this.database.listDocuments(
  //     config.appwriteDatabaseId,
  //     config.appwriteCollectionId,
  //     [Query.equal("authorId", userId)]
  //   );
  // }

  // storage

  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwriteService :: uploadFile :: error", error);
      throw error;
    }
  }

  async deletefile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwriteService :: deleteFile :: error", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(config.appwriteBucketId, fileId);
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
