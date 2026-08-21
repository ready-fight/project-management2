import { z } from "zod";

import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "必須項目です"),
  status: z.nativeEnum(TaskStatus, { required_error: "必須項目です" }),
  workspaceId: z.string().trim().min(1, "必須項目です"),
  projectId: z.string().trim().min(1, "必須項目です"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "必須項目です"),
  description: z.string().optional(),
});
