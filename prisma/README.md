# Prisma

Documentation on Prisma schema management can be found here: https://pris.ly/d/prisma-schema

## Development

To update your local database file, use `npx prisma migrate dev`.

After making changes to the [`schema.prisma`](./schema.prisma) file, run the migration script:
`npx prisma migrate dev --name <migration_name>`.  
This would create a new migration file for the use of others, as well as update the local database file's `_prisma_migrations` table.

### SQLite database files

This project uses SQLite as its database provider.

To inspect the database files contents:

- Install the workspace's recommended `alexcvzz.vscode-sqlite` extension.
- Right-click the database file and select open database to inspect it.
- Use `SQLite Explorer` and select `show table`.
