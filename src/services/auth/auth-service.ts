import NextAuth, { AuthError, NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { SqlService } from "../sql/sql-service";
import { authConfig } from "@/auth.config";
import { UserService } from "../user/user-service";

export class AuthService {

  constructor() {
    this.sqlService = new SqlService();

    this.nextAuth = NextAuth({
      ...authConfig,
      providers: [Credentials({
        async authorize(credentials): Promise<any> {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
    
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const userService = new UserService();
            const user = await userService.getUser(email);
            
            if (!user)
              return null;
    
            const passwordsMatch = await bcrypt.compare(password, user.password);
     
            if (passwordsMatch)
              return user;
          }
     
          console.log('Invalid credentials');
          return null;
        },
      })]
    });
  }

  private sqlService: SqlService;

  private nextAuth: NextAuthResult;

  public async authenticate(
    prevState: string | undefined,
    formData: FormData,
  ): Promise<string | undefined> {
    try {
      await this.nextAuth.signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

}