export interface Article {
  id: string;
  title: string;
  content: string;
  number: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}