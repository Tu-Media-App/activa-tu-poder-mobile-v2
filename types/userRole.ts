export type Role = UserRoleEnum.Admin | UserRoleEnum.Customer;

export enum UserRoleEnum {
    Admin = 'admin',
    Customer = 'customer',
}