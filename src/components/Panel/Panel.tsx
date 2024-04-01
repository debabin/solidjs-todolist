import * as Solid from "solid-js";
import * as SolidStore from "solid-js/store";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TodosContext } from "~/context/todos";

const DEFAULT_VALUES = {
  title: "",
  description: "",
};

export const Panel = () => {
  const [_, { addTodo }] = Solid.useContext(TodosContext);
  const [fields, setFields] = SolidStore.createStore(DEFAULT_VALUES);

  const onChange = (e: any) => setFields(e.target.name, e.target.value);

  return (
    <div class="flex gap-2 flex-col">
      <div class="flex gap-2">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="title">title</Label>
          <Input
            name="title"
            onInput={onChange}
            type="title"
            id="title"
            placeholder="title"
          />
        </div>

        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="description">description</Label>
          <Input
            name="description"
            onInput={onChange}
            type="description"
            id="description"
            placeholder="description"
          />
        </div>
      </div>

      <Button
        onClick={() => {
          addTodo(fields);
          setFields(DEFAULT_VALUES);
        }}
      >
        add
      </Button>
    </div>
  );
};
