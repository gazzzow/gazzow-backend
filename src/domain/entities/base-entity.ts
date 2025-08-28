export interface IBaseUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  isVerified: boolean;
}
