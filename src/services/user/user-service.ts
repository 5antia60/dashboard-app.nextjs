import type { User } from '@/src/app/lib/definitions';
import { SqlService } from "../sql/sql-service";

export class UserService {

  constructor() {
    this.sqlService = new SqlService();
  }

  private sqlService: SqlService;
  
  public async getUser(email: string): Promise<User | undefined> {
    try {
      const user = await this.sqlService.sql<User[]>`SELECT * FROM users WHERE email=${email}`;
      return user[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }

}