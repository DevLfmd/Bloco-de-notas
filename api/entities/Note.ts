export class Note {
  private subject: string;
  private text: string;
  
  public constructor(subject: string, text: string) {
    this.subject = subject;
    this.text = text;
  };
};