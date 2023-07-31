import { gql } from 'apollo-angular'

export const GET_ALL_TASKS = gql`
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
`