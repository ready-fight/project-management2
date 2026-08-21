import { TaskStatus } from "./types";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "未着手",
  [TaskStatus.TODO]: "対応予定",
  [TaskStatus.IN_PROGRESS]: "進行中",
  [TaskStatus.IN_REVIEW]: "確認中",
  [TaskStatus.DONE]: "完了",
};
