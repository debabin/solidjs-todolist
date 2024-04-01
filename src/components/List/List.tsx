import * as Solid from "solid-js";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useTodos } from "~/context/todos";

import { TodoCardSkeleton } from "../CardSkeleton/CardSkeleton";

export const List = () => {
  const [todos, { changeDone, removeTodo }] = useTodos();

  return (
    <ul class="flex gap-2 flex-col mt-4">
      <Solid.Show
        when={todos.state === "ready" || todos().length > 0}
        fallback={Array.from({ length: 5 }).map(TodoCardSkeleton)}
      >
        <Solid.For each={todos()} fallback={<p>No todos</p>}>
          {(todo) => (
            <li>
              <Card>
                <CardHeader>
                  <CardTitle>{todo.title}</CardTitle>
                  <CardDescription>{todo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="flex gap-2">
                    <Checkbox
                      checked={todo.done}
                      onChange={() => changeDone(todo.id)}
                    />
                    <div class="grid gap-1.5 leading-none">
                      <Label for="terms1-input">
                        {todo.done ? "Done" : "Not done"}
                      </Label>
                    </div>
                  </div>

                  <div class="flex justify-end w-full">
                    <Button onClick={() => removeTodo(todo.id)}>remove</Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          )}
        </Solid.For>
      </Solid.Show>
    </ul>
  );
};
