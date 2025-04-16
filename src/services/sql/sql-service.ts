import postgres from "postgres";

export class SqlService {

  constructor() {
    this.sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
  }

  public sql: postgres.Sql;

}