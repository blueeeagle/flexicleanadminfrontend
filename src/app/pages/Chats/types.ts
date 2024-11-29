export interface Message {
    id: number;
    text: string;
    sender: string;
    time: string;
    date: string;
  }
  
  export interface Chat {
    id: number;
    name: string;
    role: string;
    messages: Message[];
  }
  