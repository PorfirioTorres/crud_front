import { Region } from './Region';
import { Department } from './Department';

export class Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    hireDate: string;
    email: string;
    region: Region;
    salary: number;
    commissionPCT: number;
    department: Department;
}
