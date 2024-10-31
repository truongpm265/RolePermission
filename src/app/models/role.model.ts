import { AppFunction } from './app-function.model';

export interface Role {
  name: string;
  description?: string;
  functions: AppFunction[];
}