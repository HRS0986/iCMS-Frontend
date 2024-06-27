export interface User{
  username: string;
  email: string;
  groups: string[];
  status: boolean;
}


export interface ViewUser{
  profileImage: string;
  username: string;
  email: string;
  phone_number: string;
  roles: string[];
}

export interface Role{
  group_name: string;
  number_of_users: number;
}
