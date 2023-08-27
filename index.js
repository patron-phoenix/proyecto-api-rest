const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 4000;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "apiusers",
    password: "ivan",
    port: "5432",
});


const packageJson = require('./package.json');
const apiVersion = packageJson.version;

// Modelo
class Model {
    async getAllUsers() {
        const { rows } = await pool.query("select * from userapi;");
        return rows;
    }

    async getUserId(id) {
        const { rows } = await pool.query("select * from userapi where id=$1;", [id]);
        return rows[0];
    }

    async addUser(ci, nombre, paterno, materno, fecha) {
        await pool.query(" insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)values($1,$2,$3,$4,$5);", [ci, nombre, paterno, materno, fecha]);

    }

    async updateUsers(id, ci, nombre, paterno, materno, fecha) {
        await pool.query("update userapi set cedula_identidad=$1, nombre=$2, primer_apellido=$3, segundo_apellido=$4, fecha_nacimiento=$5 where id=$6;", [ci, nombre, paterno, materno, fecha, id]);

    }

    async deleteUser(id) {
        await pool.query("delete from userapi where id = $1;", [id]);
    }
    async getAllUsersAges() {
        const { rows } = await pool.query("select *, extract(year from AGE(current_date, fecha_nacimiento)) AS edad from userapi;");
        return rows;
    }
    async getAllUsersProm() {
        const { rows } = await pool.query("select avg( extract(year from AGE(current_date, fecha_nacimiento))) AS promedio_edad from userapi;");
        return rows;
    }
};

// controlador
class Controller {
    constructor(model) {
        this.model = model;
    }

    async getAllUsers(req, res) {
        const data = await this.model.getAllUsers();
        res.send(data);
    }

    async getUserId(req, res) {
        const id = req.params.id;
        const data = await this.model.getUserId(id);
        res.send(data);
    }

    async addUsers(req, res) {
        const cedula_identidad = req.body.cedula_identidad;
        const nombre = req.body.nombre;
        const primer_apellido = req.body.primer_apellido;
        const segundo_apellido = req.body.segundo_apellido;
        const fecha_nacimiento = req.body.fecha_nacimiento;
        await this.model.addUsers(cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento);
        res.sendStatus(201);
    }

    async updateUsers(req, res) {
        const id = req.params.id;
        const cedula_identidad = req.body.cedula_identidad;
        const nombre = req.body.nombre;
        const primer_apellido = req.body.primer_apellido;
        const segundo_apellido = req.body.segundo_apellido;
        const fecha_nacimiento = req.body.fecha_nacimiento;
        await this.model.updateUsers(id, cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento);
        res.sendStatus(200);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        await this.model.deleteUser(id);
        res.sendStatus(204);
    }

    async getAllUsersAges(req, res) {
        const data = await this.model.getAllUsersAges();
        res.send(data);
    }
    async getAllUsersProm(req, res) {
        const data = await this.model.getAllUsersProm();
        res.send(data);
    }
    async getVersion(req,res){
        res.json({version:apiVersion});
    }
}

const model = new Model();
const controller = new Controller(model);

app.use(express.json());

// creación de rutas
app.get("/userapi", controller.getAllUsers.bind(controller));
app.get("/userapi/:id", controller.getUserId.bind(controller));
app.post("/userapi", controller.addUsers.bind(controller));
app.put("/userapi/:id", controller.updateUsers.bind(controller));
app.delete("/userapi/:id", controller.deleteUser.bind(controller));
app.get("/userapi-ages", controller.getAllUsersAges.bind(controller));
app.get("/userapi-promedio", controller.getAllUsersProm.bind(controller));
app.get("/estado", controller.getVersion.bind(controller));


app.listen(port, () => {
    console.log(`Servidor levantado en http://localhost:${port}`)
});