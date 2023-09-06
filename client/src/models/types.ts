export type Task = {
    id: string;
    title: string;
    date: string;
    description: string;
  };
  
  export type TasksData = {
    tasks: Task[];
  };
  
  export type TaskDetail = {
    task:Task[]
  }