import conectar from '../config/Conexao.js';
import Partido from '../models/Partido.js';
export default class PartidoDAO {
    
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS partido (
                id int(11) NOT NULL AUTO_INCREMENT,
                nome varchar(255) NOT NULL,
                sigla varchar(10) NOT NULL,
                numeroRegistro int(11) NOT NULL,
                PRIMARY KEY (id)
            );`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
        } catch (erro) {
            console.log('O banco de dados não pode ser iniciado!', erro);
        }
    }

    async incluir(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `INSERT INTO partido(nome, sigla, numeroRegistro) VALUES (?, ?, ?);`;
            const parametros = [partido.nome, partido.sigla, partido.numeroRegistro];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
            return true;
        }
        return false;
    }

    async alterar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `UPDATE partido SET nome = ?, sigla = ?, numeroRegistro = ? WHERE id = ?;`;
            const parametros = [partido.nome, partido.sigla, partido.numeroRegistro, partido.id];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
            return true;
        }
        return false;
    }

    async excluir(id) {
        if (id) {
            const conexao = await conectar();
            const sql = `DELETE FROM partido WHERE id = ?;`;
            await conexao.execute(sql, [id]);
            await global.poolConexoes.releaseConnection(conexao);
            return true;
        }
        return false;
    }

    async listar(id = null) {
        let sql;
        let parametros = [];
    
        if (id) {
            sql = 'SELECT * FROM partido WHERE id = ?';
            parametros = [id];
        } else {
            sql = 'SELECT * FROM partido';
        }
    
        const conexao = await conectar();
    
        try {
            const [rows] = await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
            const partidos = rows.map(row => new Partido(row.id, row.nome, row.sigla, row.numeroRegistro));
            return partidos;
        } catch (erro) {
            console.error('Erro ao consultar partidos:', erro);
            throw erro;
        }
    }
}