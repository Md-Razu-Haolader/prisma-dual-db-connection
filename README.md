# Prisma ORM dual database connection (mongoDB, postgreSQL)

### Installation

```bash
yarn install
```

### To generate prisma database schema after any changes

```bash
yarn postinstall
```

### Details:

1. Connection strategy are written to src/utils/prisma.db.ts file

2. mongoDB and postgreSQL schema are written to src/database folder.

3. Example uses are written to src/repositories folder.
