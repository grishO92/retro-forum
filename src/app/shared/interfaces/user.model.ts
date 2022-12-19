export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  comments: { postId: string; message: string }[];
}
