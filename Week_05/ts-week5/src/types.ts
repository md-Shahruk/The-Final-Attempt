export type Status = "todo"| "in-progress" |"done";
export interface Task {
  
  id:string,
  title:string,
  status:Status,
  createdAt: string,
}


export type Action = "created" |"updated" | "deleted";
export type TaskEvent = `task:${Action}`;


export type PartialTask = {
  [Key in keyof Task]?: Task[Key];
};