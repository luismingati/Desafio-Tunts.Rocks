import axios from "axios";

interface Student {
  registration: string;
  name: string;
  absences: number;
  grades: number[];
  finalExamGrade?: number;
  status?: string;
}

function calculateStatus(student: Student, totalClassesSemester: number): string {
  const average = student.grades.reduce((acc, grade) => acc + grade, 0) / student.grades.length;
  const absencePercentage = (student.absences / totalClassesSemester) * 100;

  if (absencePercentage > 25) {
    return "Reprovado por Falta";
  } else if (average < 50) {
    return "Reprovado por Nota"; 
  } else if (average < 70) {
    return "Exame Final";
  } else {
    return "Aprovado";
  }
}

function calculateFinalExamGrade(average: number): number {
  return Math.ceil(100 - average);
}

export async function fetchRows(): Promise<{ totalClassesSemester: number, students: Student[] }> {
  const response = await axios.get('http://localhost:3000/sheetRows');
  const rows = response.data.values;

  const totalClassesSemester = parseInt(rows[1][0].split(': ')[1]);
  const students: Student[] = rows.slice(3).map((row: any, index: number) => {
    const student: Student = {
      registration: row[0],
      name: row[1],
      absences: parseInt(row[2]),
      grades: row.slice(3, 6).map((grade: string) => parseInt(grade)),
      status: '',
      finalExamGrade: undefined
    };

    student.status = calculateStatus(student, totalClassesSemester);
    if (student.status === 'Exame Final') {
      const average = student.grades.reduce((acc, grade) => acc + grade, 0) / student.grades.length;
      student.finalExamGrade = calculateFinalExamGrade(average);
    } else {
      student.finalExamGrade = 0;
    }
    return student;
  });

  return { totalClassesSemester, students };
}

export async function pushRows(students: Student[]) {
  for (const student of students) {
    const rowIndex = students.indexOf(student) + 4;
      await axios.post('http://localhost:3000/sheetRows', {
        range: `engenharia_de_software!G${rowIndex}`,
        values: [[student.status]]
      });

      await axios.post('http://localhost:3000/sheetRows', {
        range: `engenharia_de_software!H${rowIndex}`,
        values: [[student.finalExamGrade]]
      });
  }
}
