export default interface IUser {
  uid?: string;
  email: string;
  displayName: string;
  nickname: string;
  bio: string;
  photoURL: string;
  favorites: [];
  myTopics: [];
}
