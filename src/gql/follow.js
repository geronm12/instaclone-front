import {gql} from "@apollo/client";


export const IS_FOLLOW = gql`
query isFollow($username:String!){
    isFollow(username:$username)
  }
`;

export const FOLLOW = gql`
mutation follow($username: String!){
    follow(username:$username)
  }
`;


export const UNFOLLOW = gql`
mutation unFollow($username:String!){
    unFollow(username:$username)
  }

`;

export const GET_FOLLOWERS = gql`
query getFollowers($username:String!){
  getFollowers(username:$username){
    name
    username
    email
    avatar
  }
}`;


export const GET_FOLLOWING = gql`
query getFollowing($username:String!)
{
  getFollowing(username:$username){
    name
    username
    avatar
  }
}
`;

export const GET_NOT_FOLLOWEDS = gql`
query getNotFollowed{
  getNotFollowed{
    username
    name
    avatar
  }
}`;