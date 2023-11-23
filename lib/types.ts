export type ColumnBoard = {
  id:string;
  name: string;
  blogId:string;
  position:number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}


export type Task = {
  id:string;
  title: string;
  description:string;
  columnId:string;
  position:number;
  updatedAt: Date;
}