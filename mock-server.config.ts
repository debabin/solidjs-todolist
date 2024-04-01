import type { MockServerConfig } from "mock-config-server";

const mockServerConfig: MockServerConfig = {
  interceptors: {
    request: ({ setDelay }) => setDelay(500),
  },
  database: {
    data: {
      todos: [
        {
          id: 1,
          title: "Learn Solid",
          description:
            "Solid is a strongly typed, modular, and composable programming language that makes it easy to build maintainable, scalable, and resilient applications.",
          done: false,
        },
      ],
    },
  },
};

export default mockServerConfig;
