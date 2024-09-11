import { Divide } from "lucide-react";

type ThreadCategory = "Thread" | "QNA";



type User = {
  userName: string;
  password: string;
  
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
  parentCommentId?: number; // Add this line to support replies
  
};


