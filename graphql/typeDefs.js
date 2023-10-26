const typeDefs = `#graphql

  scalar Date

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
    sourceId: user
    targetId: user
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type userPost{
    sourceId: user
    targetId: user
    type: String
    createdAt: Date
    updatedAt: Date
  }

  type userChat{
    sourceId: user
    targetId: user
    type: String
    createdAt: Date
    updatedAt: Date
  }

  input loginCred{
    emailAddress: String
    password: String
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

  input userFriendData{
    sourceId: ID
    targetId: ID
    type: String
    status: String
    createdAt: Date
    updatedAt: Date
    notes: String
  }

  type Mutation{
    insertUser(userDetails:userData): user
    insertUserFriend(userFriendDetails:userFriendData): userFriend
  }
`;

export default typeDefs;