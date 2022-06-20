// Camel Case convention to declare classes
abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];   // Attribute of the class, but it's not part of the constructor's argument
  // protected    To be accessible from extended classes

  // constructor
  // 1) Reserved keyword. It works either JS (>= ES6) or TS
  // 2) Ways to declare a constructor
  // 2.1] Declaring the variables and passing to the constructor
  // private readonly id: string;
  // private name: string;
  // constructor(id: string,  name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(Department.fiscalYear);
  // }
  // 2.2] Adding the access modifier in front of the parameter to declare the parameter
    constructor(protected readonly id: string, public name: string) {
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // argument added to avoid errors in case you copy / reuse the function describe() outside this call
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';    // it throws an error, because it's readOnly
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// extends    Keyword to express inheritance
class ITDepartment extends Department {
  admins: string[];

  // if no additional property was added --> constructor wouldn't be necessary
  constructor(id: string, admins: string[]) {
    // this.admins = admins;    // it throws an error. Parent constructor must be called previously
    super(id, 'IT');  // Call to the parent constructor
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
    // this   points to the concrete ITDepartment instance created
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  // override the method  === Just 1! addEmployee method
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

// Object which it's an instance of a class
const it = new ITDepartment('d1', ['Max']);
const itObject = { describe: it.describe}; // Simple object, not ITDepartment one
const itObjectWithId = { id: 'A', describe: it.describe}; // Simple object, not ITDepartment one, but adding id

it.addEmployee('Max');
it.addEmployee('Manu');

// it.employees[2] = 'Anna';

it.describe();
itObject.describe();        // id   undefined, because it's a simple object
itObjectWithId.describe();  // id   it returns a value, because an object with id attribute has been added
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

debugger;
accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
