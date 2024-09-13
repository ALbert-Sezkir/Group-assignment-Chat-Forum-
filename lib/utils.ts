import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const forbiddenWords = ["fuck", "hoe", "bitch"]; // Lägg till fler opassande ord

const censorComment = (content: string): string => {
  let censoredContent = content;
  forbiddenWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    censoredContent = censoredContent.replace(regex, '****');
  });
  return censoredContent;
};

export default censorComment;