const express = require('express');
const app = express();

app.use(express.json());

const students =[
    {id: 1, name: 'Paulo', age: 20, enroll: true},
    {id: 2, name: 'Alexis', age: 21, enroll: false},
];

app.get('/', (req, res) => {
    res.send('Node JS api prueba 2');
});

app.get('/api/students',(req, res) => {
    res.send(students);
});

app.get('/api/students/:id',(req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!students) return res.status(404).send('Estudiante no encontrado');

    const index = students.indexOf(students);
    students.splice(index,1);
    res.send(student);
});
app.put('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!students) return res.status(404).send('Estudiante no encontrado');

    student.name = req.body.name;
    student.age = parseInt(req.body.age);
    student.enroll = (req.body.enroll === 'true');
    res.send(student);
});
app.patch('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');

    // Actualizar solo los campos proporcionados en el cuerpo de la solicitud
    if (req.body.name !== undefined) student.name = req.body.name;
    if (req.body.age !== undefined) student.age = parseInt(req.body.age);
    if (req.body.enroll !== undefined) student.enroll = (req.body.enroll === 'true');

    res.send(student);
});


const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));

