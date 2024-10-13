import conectar from "../config/Conexao.js";
import Candidato from "../models/Candidato.js";
export default class CandidatoDAO{
    
    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidato (
                id int(11) NOT NULL AUTO_INCREMENT,
                nome varchar(255) NOT NULL,
                idPartido int(11) NOT NULL,
                numeroCandidato int(11) NOT NULL,
                PRIMARY KEY (id)
            );`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
        } catch (erro) {
            console.log('O banco de dados não pode ser iniciado!', erro);
        }
    }

    async incluir(candidato){
        if (candidato instanceof Candidato){
            const conexao = await conectar();
            const sql = `INSERT INTO candidato(nome, idPartido, numeroCandidato) VALUES (?, ?, ?);`;
            const parametros = [candidato.nome, candidato.idPartido, candidato.numeroCandidato];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
            return true;
        }
        return false;
    }

    async alterar(candidato){
        if (candidato instanceof Candidato){
            const conexao = await conectar();
            const sql = `UPDATE candidato SET nome = ?, idPartido = ?, numeroCandidato = ? WHERE id = ?;`;
            const parametros = [candidato.nome, candidato.idPartido, candidato.numeroCandidato, candidato.id];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
            return true;
        }
        return false;
    }

    async excluir(id){
        if (id){
            const conexao = await conectar();
            const sql = `DELETE FROM candidato WHERE id = ?;`;
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
            sql = `
                SELECT candidato.*, partido.nome AS nomePartido, partido.sigla AS siglaPartido 
                FROM candidato 
                LEFT JOIN partido ON candidato.idPartido = partido.id 
                WHERE candidato.id = ?;
            `;
            parametros = [id];
        } else {
            sql = `
                SELECT candidato.*, partido.nome AS nomePartido, partido.sigla AS siglaPartido 
                FROM candidato 
                LEFT JOIN partido ON candidato.idPartido = partido.id;
            `;
        }
    
        const conexao = await conectar();
    
        try {
            const [rows] = await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
    
            // Mapeando resultados com nome do partido
            const candidatos = rows.map(row => ({
                id: row.id,
                nome: row.nome,
                idPartido: row.idPartido,
                numeroCandidato: row.numeroCandidato,
                nomePartido: row.nomePartido, // Inclui o nome do partido
                siglaPartido: row.siglaPartido // Inclui a sigla do partido
            }));
    
            return candidatos;
        } catch (erro) {
            console.log('Erro ao listar os candidatos:', erro);
            throw erro;
        }
    }
}