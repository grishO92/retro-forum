export default interface IPost {
  authorId: string;
  title: string;
  comments: { userId: string; message: string }[];
  description: string;
  likes: [];
}
