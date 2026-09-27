class Student{
    constructor(private id:string,private name:string,private faculy:string){}
    getStudentInfo():string{
        return `รหัส ${this.id} ชื่อ ${this.name} คณะ ${this.faculy}`;
    }
}
class Teacher{
    constructor(private name:string,private major:string){}
    getTeacherInfo(): string{
        return `ชื่อ ${this.name} สาขา ${this.major}`;
    }
    teach(student: Student):void{
        console.log(`${this.getTeacherInfo()} สอน ${student.getStudentInfo()}`);
    }
}
class University{
    private name: string;
    students: Student[];
    teachers: Teacher[];
    constructor(name: string,students: Student[],teachers: Teacher[]){
        this.name=name;
        this.students= students;
        this.teachers= teachers;
    }
    showUnivInfo():void{
        console.log(this.name);
        console.log("ข้อมูลมหาวิทยาลัย ประกอดด้วย");
        console.log("อาจารย์: ");
        this.teachers.forEach(t =>{
            console.log(t.getTeacherInfo());
        })
        console.log("นักศึกษา: ");
        this.students.forEach(s =>{
            console.log(s.getStudentInfo());
        })
    }
}
const student1 = new Student("684245010","ธีรดนย์","วิทยาศาสตร์และเทคโนโลยี");
const student2 = new Student("684245004","จิรัฐ","วิทยาศาสตร์และเทคโนโลยี");
const student3 = new Student("684245003","อภิชาติ","ครุศาสตร์");
const teacher1 = new Teacher("ดวงใจ","ครุศาสตร์");
const teacher2 = new Teacher("อภิสิทธิ์","ปฐมวัย");
const univ1= new University("npru",[student1,student2,student3],[teacher1,teacher2]);
univ1.showUnivInfo();
teacher1.teach(student1);
teacher2.teach(student2);
teacher2.teach(student3);