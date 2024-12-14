# Origami-API-NestJS

## Migrations
### Create new empty migration
```bash
npm run typeorm migration:create
```

### Generate new migration
```bash
npm run typeorm migration:generate -- ./libs/database/src/migrations/migrationName -d ./libs/database/src/orm.config.ts
```

### Run migrations
```bash
npm run typeorm migration:run
```

### Rollback migrations
```bash
npm run typeorm migration:rollback
```
