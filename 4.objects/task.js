function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
}
    const student1 = new Student ("Ирина", "женский", 19);
    const student2 = new Student ("Сергей", "мужской", 20);
    const student3 = new Student ("Ксения", "женский", 19);

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMarks = function (...marks) {
   if (!this.marks) {
        console.log(`Студент ${this.name} отчислен. Добавление оценок невозможно.`);
        return;
    }    
    this.marks.push(...marks);
}

Student.prototype.getAverage = function () {
    if (!this.marks || this.marks.length === 0) {
        return 0;
    }
    const sum = this.marks.reduce((total, mark) => total + mark, 0);
    return sum / this.marks.length;
  
}

Student.prototype.exclude = function (reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;    
    console.log(`Студент ${this.name} отчислен по причине: ${reason}`);
}
