import * as Solid from "solid-js";

import { Panel } from "./components/Panel/Panel";
import { List } from "./components/List/List";

const DEFAULT_TODOS = [
  {
    id: 1,
    title: "Learn Solid",
    description:
      "Solid is a strongly typed, modular, and composable programming language that makes it easy to build maintainable, scalable, and resilient applications.",
    done: false,
  },
];

export const App: Solid.Component = () => {
  return (
    <div class="p-6">
      <Panel />
      <div>
        <List />
      </div>
    </div>
  );
};
