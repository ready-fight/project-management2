import { CalendarDaysIcon, MoreHorizontalIcon } from "lucide-react";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { TaskActions } from "./task-actions";
import { TaskDate } from "./task-date";

import { Task } from "../types";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="group mb-2 rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-cyan-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="line-clamp-2 text-sm font-medium leading-5 text-slate-800">
          {task.name}
        </p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <button className="flex size-6 shrink-0 items-center justify-center rounded text-slate-400 opacity-70 transition hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100">
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">タスクメニュー</span>
          </button>
        </TaskActions>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-slate-500">
          <CalendarDaysIcon className="size-3.5 shrink-0 text-slate-400" />
          <TaskDate value={task.dueDate} className="truncate text-xs" />
        </div>
        <MemberAvatar
          name={task.assignee.name}
          className="size-6"
          fallbackClassName="text-[9px]"
        />
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          className="size-5"
          fallbackClassName="text-[8px]"
        />
        <span className="truncate">{task.project.name}</span>
      </div>
    </div>
  );
};
