"use client";

import { LayoutGridIcon, ListIcon, CalendarDaysIcon, LoaderIcon, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "./columns";
import { DataCalendar } from "./data-calendar";
import { DataFilters } from "./data-filters";
import { DataKanban } from "./data-kanban";
import { DataTable } from "./data-table";

import { useGetTasks } from "../api/use-get-tasks";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useTaskFilters } from "../hooks/use-task-filters";
import { TaskStatus } from "../types";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

export const TaskViewSwitcher = ({
  hideProjectFilter,
}: TaskViewSwitcherProps) => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", { defaultValue: "kanban" });
  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const workspaceId = useWorkspaceId();
  const paramProjectId = useProjectId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramProjectId || projectId,
    assigneeId,
    status,
    dueDate,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({ json: { tasks } });
    },
    [bulkUpdate]
  );

  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 overflow-hidden rounded-lg border bg-white shadow-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-3 border-b px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="h-9 w-full justify-start bg-slate-100 p-1 lg:w-auto">
            <TabsTrigger className="h-7 gap-1.5 px-3 text-xs lg:w-auto" value="table">
              <ListIcon className="size-3.5" />
              リスト
            </TabsTrigger>
            <TabsTrigger className="h-7 gap-1.5 px-3 text-xs lg:w-auto" value="kanban">
              <LayoutGridIcon className="size-3.5" />
              ボード
            </TabsTrigger>
            <TabsTrigger className="h-7 gap-1.5 px-3 text-xs lg:w-auto" value="calendar">
              <CalendarDaysIcon className="size-3.5" />
              カレンダー
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size="sm" className="h-9 w-full lg:w-auto">
            <PlusIcon className="mr-1.5 size-4" />
            タスクを追加
          </Button>
        </div>

        <div className="border-b bg-slate-50/70 px-4 py-3">
          <DataFilters hideProjectFilter={hideProjectFilter} />
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-4">
          {isLoadingTasks ? (
            <div className="flex h-[240px] w-full flex-col items-center justify-center rounded-lg border border-dashed bg-slate-50">
              <LoaderIcon className="size-5 animate-spin text-cyan-600" />
              <p className="mt-2 text-xs text-slate-500">読み込み中...</p>
            </div>
          ) : (
            <>
              <TabsContent value="table" className="mt-0">
                <DataTable columns={columns} data={tasks?.documents ?? []} />
              </TabsContent>
              <TabsContent value="kanban" className="mt-0">
                <DataKanban
                  data={tasks?.documents ?? []}
                  onChange={onKanbanChange}
                />
              </TabsContent>
              <TabsContent value="calendar" className="mt-0 h-full pb-4">
                <DataCalendar data={tasks?.documents ?? []} />
              </TabsContent>
            </>
          )}
        </div>
      </div>
    </Tabs>
  );
};
