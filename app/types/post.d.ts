
type ThreadCategory = "Thread" | "QNA";

type User = {
  id: string;
  userName: string;
  password: string;
  isModerator: boolean;
  
};

type Thread = {
  id: number;
  title: string;
  category: ThreadCategory;
  creationDate: string;
  description: string;
  creator: User;
  comments: ThreadComment[];
  locked: boolean;
};

type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: number;
};

type ThreadComment = {
  id: number;
  thread: number;
  content: string;
  creator: User;
  parentCommentId?: number | null; // Add this line to support replies
  creationDate: string;
  
};



