import * as Solid from "solid-js";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const TodosContext = Solid.createContext<
  [
    Solid.InitializedResource<Todo[]>,
    {
      addTodo: ({
        title,
        description,
      }: {
        title: string;
        description: string;
      }) => void;
      changeDone: (id: number) => void;
      removeTodo: (id: number) => void;
    }
  ]
>([
  (() => []) as any,
  { addTodo: () => {}, changeDone: () => {}, removeTodo: () => {} },
]);

const baseUrl = "http://localhost:31299";
const getTodos = async () =>
  (await (await fetch(`${baseUrl}/todos`)).json()) as Todo[];

const postTodos = async (fields: { title: string; description: string }) =>
  await (
    await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    })
  ).json();

const deleteTodos = async (id: number) => {
  await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const putTodos = async (todo: Partial<Todo>) => {
  await fetch(`${baseUrl}/todos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export function TodosProvider(props: any) {
  const [getTodosResponse, getTodosQuery] = Solid.createResource(getTodos, {
    initialValue: [],
  });

  const addTodo = async (fields: any) => {
    const newTodo = {
      ...fields,
      done: false,
    };

    getTodosQuery.mutate([
      ...getTodosResponse(),
      { ...newTodo, id: getTodosResponse().length + 1 },
    ]);

    await postTodos(fields);

    await getTodosQuery.refetch();
  };

  const removeTodo = async (id: number) => {
    const todos = getTodosResponse().filter((todo) => todo.id !== id);

    getTodosQuery.mutate(todos);

    await deleteTodos(id);

    await getTodosQuery.refetch();
  };

  const changeDone = async (id: number) => {
    const todos = getTodosResponse().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });

    getTodosQuery.mutate(todos);

    await putTodos({
      done: todos.find((todo) => todo.id === id)!.done,
    });

    await getTodosQuery.refetch();
  };

  Solid.createEffect(() => {
    console.log("STATE:", getTodosResponse.state);
    console.log("DATA:", getTodosResponse());
  });

  const value = [
    getTodosResponse,
    {
      addTodo,
      changeDone,
      removeTodo,
    },
  ];

  return (
    <TodosContext.Provider value={value}>
      {props.children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => Solid.useContext(TodosContext);
