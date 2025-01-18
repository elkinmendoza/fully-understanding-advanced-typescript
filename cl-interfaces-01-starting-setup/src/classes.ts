abstract class Department{
//    public  id: string;
//    private  name: string;

static fiscalYear = 2020;
   protected employees:string[] = []; /* modifier (private public and protected) readonly */
    constructor(protected readonly id:string,public name: string) {
        // this.name = n;
        // this.id = n;
    }


    static createEmployee(name: string){
        return {name: name};

    }



     abstract describe(this : Department) : void;
    addEmployee(employee: string){
        this.employees.push(employee);
    }
    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}



// inherentence 
class ITDepartment extends Department{
    admins: string[];
    constructor(id:string,admins: string[]){
        super(id,'IT');
        this.admins = admins;
    }   
    describe(): void {
        console.log('IT Department - ID: ' + this.id);
    }



}  


class AccountingDepartment extends Department{
    private lastReport: string;
    private static instance: AccountingDepartment;

    static getInstance(){
    
        if(this.instance){
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2',[]);
        return this.instance;
    }

    get mostRecentReport(){ 
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    set mostRecentReport(value: string){
        if(!value){
            throw new Error('Please pass in a valid value');
        }
        this.addReport(value);
    }

     private constructor(id:string,private reports: string[]){
        super(id,'Accounting');
        this.lastReport = reports[0];

    }


    describe(): void {
        console.log('Accounting Department - ID: ' + this.id);
    }

    addEmployee(employee: string): void {
        if(employee === 'Max'){
            return;
        }
        this.employees.push(employee);
    }

    addReport(report: string) {
        this.reports.push(report);
        this.lastReport = report;
    }
    printReports(){
        console.log(this.reports);
    }

   
}


const employee1 = Department.createEmployee('Max');
console.log(employee1,Department.fiscalYear);

const it = new ITDepartment('id256232',['Elkin','Carlos']);
const Accounting = AccountingDepartment.getInstance();
const Accounting2 = AccountingDepartment.getInstance();

console.log(Accounting,Accounting2);
    

// Accounting.addReport('Something went wrong...');

// Accounting.mo stRecentReport = 'Year End Report';
// console.log(Accounting.mostRecentReport)
it.describe();
Accounting.describe()

// it.addEmployee('Max');
// it.addEmployee('Manu');
// it.printEmployeeInformation();
// it.describe();


// Accounting.addEmployee('Manuel');
// Accounting.printEmployeeInformation();





