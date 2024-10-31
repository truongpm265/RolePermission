export interface Permission {
    name: string;
  }
  
  export interface AppFunction {
    id: number;
    name: string;
    permissions: Permission[];
  }
  
  export interface UserDetails {
    username: string;
    roles: string[];  // Danh sách các vai trò của người dùng
    functions: AppFunction[];  // Danh sách các chức năng của người dùng
  }
  