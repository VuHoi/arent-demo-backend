# Deni Backend

# Prerequisites

To build and run this app you will need a few things:

1. **Install [Node.js](https://nodejs.org/en/) version `16.13.0 LTS`**
   > Or you can use [nvm](https://github.com/nvm-sh/nvm) to quickly install and use different versions of node via the command line

```shell
$ nvm install lts/gallium
$ nvm use lts/gallium

# Check version
$ node -v
v16.13.0
```

2. **Install [Yarn](https://yarnpkg.com/)**

```shell
# Check version
$ yarn -v
1.22.15
```

# Local Development

- **Install dependencies**

```shell
$ yarn
# Or
$ yarn install
```

- **Set the environment variables**

```shell
# Create local env
$ cp env.example .env

```

- **Start server**

```shell
$ yarn dev
```

Happy coding! 🥂

# Database structure

| User        | Type   |
| ----------- | ------ |
| username    | String |
| password    | String |
| avatar      | String |
| email       | String |
| dateOfBirth | String |
| createdAt   | Date   |
| updatedAt   | Date   |

| Record     | Type                |
| ---------- | ------------------- |
| weight     | Number              |
| body       | Number              |
| status     | `enabled`/`disable` |
| created_by | `User`              |
| updated_by | `User`              |
| createdAt  | Date                |
| updatedAt  | Date                |

| Menu       | Type   |
| ---------- | ------ |
| name       | String |
| title      | String |
| order      | Number |
| icon       | String |
| level      | Number |
| created_by | `User` |
| updated_by | `User` |
| createdAt  | Date   |
| updatedAt  | Date   |

| Exercise   | Type   |
| ---------- | ------ |
| title      | String |
| duration   | Number |
| kcal       | Number |
| created_by | `User` |
| updated_by | `User` |
| createdAt  | Date   |
| updatedAt  | Date   |

| Diary       | Type   |
| ----------- | ------ |
| title       | String |
| description | String |
| created_by  | `User` |
| updated_by  | `User` |
| createdAt   | Date   |
| updatedAt   | Date   |

| Column        | Type                      |
| ------------- | ------------------------- |
| title         | String                    |
| image         | String                    |
| is_recommened | Boolean                   |
| type          | `diet`/`beauty`/`healthy` |
| type          | `diet`/`beauty`/`healthy` |
| tags          | `Array<String>`           |
| created_by    | `User`                    |
| updated_by    | `User`                    |
| createdAt     | Date                      |
| updatedAt     | Date                      |
