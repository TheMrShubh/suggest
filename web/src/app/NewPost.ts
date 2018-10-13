export class NewPost {
  title: String;
  body: String;
  date: String;
  uid: String;
  key: String;
  likes: number;

  constructor() {
    this.title = null;
    this.body = null;
    this.date = null;
    this.uid = null;
    this.key = null;
    this.likes = 0;
  }
}
