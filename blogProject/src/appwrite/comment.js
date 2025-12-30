import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../config/config";

class CommentService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.projectUrl)
      .setProject(config.appwriteprojectId);
    this.database = new Databases(this.client);
  }

  async createComment({ postId, userId, content, userName }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentCollectionId,
        ID.unique(),
        {
          content,
          userId,
          postId,
          userName,
        }
      );
    } catch (error) {
      console.log("appwriteService :: createComment :: error", error);
      throw error;
    }
  }

  // async getComment(postId) {
  //   try {
  //     return await this.database.getDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteCommentCollectionId,
  //       postId
  //     );
  //   } catch (error) {
  //     console.log("appwriteService :: getComment :: error", error);
  //     throw error;
  //   }
  // }

  async getComments(postId) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCommentCollectionId,
        [Query.equal("postId", postId), Query.orderDesc("$createdAt")]
      );
    } catch (error) {
      console.log("appwriteService :: getComments :: error", error);
      throw error;
    }
  }

  async deleteComments(postId) {
    try {
      return await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentCollectionId,
        postId
      );
    } catch (error) {
      console.log("appwriteService :: deleteComments :: error", error);
      throw error;
    }
  }

  // async updateComments(postId) {
  //   try {
  //     return await this.database.updateDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteCommentCollectionId,
  //       postId,
  //       {
  //         content,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("appwriteService :: updateComments :: error", error);
  //     throw error;
  //   }
  // }

  //likes

  async toggleLikes({ postId, userId, type }) {
    try {
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteLikeCollectionId,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
      );

      if (res.documents.length > 0) {
        const doc = res.documents[0];

        if (doc.type === type) {
          this.database.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteLikeCollectionId,
            doc.$id
          );
          return;
        }

        return await this.database.updateDocument(
          config.appwriteDatabaseId,
          config.appwriteLikeCollectionId,
          doc.$id,
          {
            type,
          }
        );
      }

      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteLikeCollectionId,
        ID.unique(),
        {
          type,
          postId,
          userId,
        }
      );
    } catch (error) {
      console.log("appwriteService :: toggleLikes :: error", error);
      throw error;
    }
  }

  async likeCount({ postId, type }) {
    const res = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteLikeCollectionId,
      [Query.equal("postId", postId), Query.equal("type", type)]
    );
    return res.total;
  }
}

const commentService = new CommentService();
export default commentService;
