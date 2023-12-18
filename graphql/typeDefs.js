const typeDefs = `#graphql

  scalar Date
  scalar Upload

  type user {
    firstName: String
    lastName: String
    contactNumber: String
    emailAddress: String
    password: String
    registeredAt: Date
    lastLogin: Date
    introduction: String
    profile: String
    token:String
  }

  type userFriend{
    sourceId: ID
    targetId: ID
    type: String
    status: String
    createdAt: Date
    updatedAt: Date
    notes: String
  }

  type userFollower{
    sourceId: ID
    targetId: ID
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type userPost{
    sourceId: ID
    post: String
    createdAt: Date
    updatedAt: Date
  }

  type userChat{
    sourceId: ID
    targetId: ID
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type Query{
    getUserByEmail(userCred:loginCred): user
    getAllUser: [user]
  }

  input userData{
    firstName: String
    lastName: String
    contactNumber: String
    emailAddress: String
    password: String
    introduction: String
    profile: String
  }

  input loginCred{
    emailAddress: String
    password: String
  }

  input userFriendData{
    sourceId: ID
    targetId: ID
    type: String
    status: String
    createdAt: Date
    updatedAt: Date
    notes: String
  }

  input userPostData{
    sourceId: ID
    post: String
    createdAt: Date
    updatedAt: Date
  }

  type Mutation{
    loginUserByEmail(userCred:loginCred): user 

    insertUser(userDetails:userData): user

    imageUpload(file: Upload!):String!

    insertUserFriend(userFriendDetails:userFriendData): userFriend

    insertUserPost(userPostDetails:userPostData): userPost
  }
`;

export default typeDefs;