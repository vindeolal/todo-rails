# Todo app server application


REST APIs or GraphQL queries can be used for the CRUD operations

All the REST APIs are available in `tasks_controller.rb` file.

GraphQL queries http://localhost:3000/graphiql

```
query getTasks {
    tasks {
      id,
      name,
      description,
      isDone,
      order,
      createdAt,
      updatedAt
    }
}

mutation createTask {
  createTask(
    input: {
      name: "First Graphql task", 
      description: "First one", 
      order: 1
    }) {
  	task {
      id,
      name,
      description,
      isDone,
      order
    }
  }
}

mutation updateTask {
  updateTask(
    input: {
      id: 5,
      name: "First Graphql task after update"
    }) {
  	task {
      id,
      name,
      description,
      isDone,
      order
    }
  }
}

mutation deleteTask {
  deleteTask(
    input: {
      id: 5,
    }) 
}
```