import { Region } from './Region';
import { Employee } from './Employee';

export class Department {
    departmentId: number;
    name: string;
    region: Region;
    employees: Employee[];
}
