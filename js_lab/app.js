// 1
// const input = prompt("กรุณากรอกคะแนนสอบ: ");
// const score = Number(input);
// if (input > 100 || score < 0) {
//     console.log("ข้อมูลไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
// } else if (score >= 50) {
//     console.log("สอบผ่าน");
// } else {
//     console.log("สอบไม่ผ่าน")
// } 

// 2
// let scores = [45, 78, 82, 35, 90];
// let scoresNo82 = [45, 78];
// scores.push(65);
// scores.push(48);
// // scores.pop();
// scores.sort((a, b) => a - b);

// console.log("เช็ค array ที่มีเลข 82")
// console.log(scores.includes(82));
// console.log("เช็ค array ที่ไม่มีเลข 82");
// console.log(scoresNo82.includes(82));

// console.log("WHILE LOOP")
// let i = 0;
// while (i < scores.length) {
//     console.log(scores[i]);
//     i++;
// }

// console.log("FOR LOOP")
// for (let i = 0; i < scores.length; i++) {
//     console.log(scores[i]);
// }

// 3
// let students = [
//     { id: 1, name: "Somchai", score: 48 },
//     { id: 2, name: "Somsri", score: 75 },
//     { id: 3, name: "Sompong", score: 32 },
//     { id: 4, name: "Somnak", score: 85 }
// ];
// for each
// students.forEach(student => {
//     console.log(`ชื่อ: ${student.name} ได้คะแนน: ${student.score}`);
// });

// map()
// let doubleScore = students.map(student => {
//     return {
//         id: student.id,
//         name: student.name,
//         score: student.score * 2
//     };    
// });

// console.log(doubleScore);

// filter score > 50
// let passedStudents = students.filter(student => {
//     return student.score > 50;
// });

// console.log(passedStudents);

// find Somsri
// let findSomsri = students.find(student => {
//     return student.name === "Somsri";
// });

// console.log(findSomsri);

// functions ตัดเกรด
// function calculateGrade(score) {
//     if (score >= 80) {
//         return "A";
//     } else if (score >= 60) {
//         return "B";
//     } else {
//         return "F";
//     }
// }
// console.log('คะแนน 81');
// console.log(calculateGrade(81));
// console.log('คะแนน 79');
// console.log(calculateGrade(79));
// console.log('คะแนน 59');
// console.log(calculateGrade(59));

// //ประยุกต์กับ students
// let studentWithGrade = students.map(student => {
//     return {
//         id: student.id,
//         name: student.name,
//         score: student.score,
//         grade: calculateGrade(student.score)
//     };
// });

// console.log("เกรดของนักเรียน");
// console.log(studentWithGrade);

// mini game
let diceRoll = Math.floor(Math.random() * 6) + 1;

let userGuess = Number(prompt("กรุณาทายเลขลูกเต๋า (1-6): "));

if (userGuess === diceRoll) {
    alert(`ยินดีด้วย! คุณทายถูกต้อง เลขที่ออกคือ ${diceRoll}`);
} else {
    alert(`เสียใจด้วย! คุณทายผิด บอททอยลูกเต๋าได้เลข ${diceRoll}`);
}