import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Settings, Plus } from 'lucide-react';

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: 'task1',
    label: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
  },
  {
    id: 'task2',
    label: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
  },
  {
    id: 'task3',
    label: 'Weekly closed sales won checking with sales team',
    completed: false,
    dueDate: '24 Sep, 2021',
  },
  {
    id: 'task4',
    label: 'Add notes that can be viewed from the individual view',
    completed: false,
    dueDate: '27 Sep, 2021',
  },
  {
    id: 'task5',
    label: 'Follow up with key prospects from last week',
    completed: true,
    dueDate: '10 Sep, 2021',
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const remainingTasksCount = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-medium">My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button size="sm" className="h-8 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-1" /> Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {remainingTasksCount} of {tasks.length} remaining
        </p>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center">
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mr-3 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={task.id}
                  className={cn(
                    'text-sm font-normal',
                    task.completed && 'line-through text-muted-foreground'
                  )}
                >
                  {task.label}
                </Label>
              </div>
              <span className={cn(
                'text-xs',
                task.completed ? 'text-muted-foreground' : 'text-foreground'
              )}>
                {task.dueDate}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
