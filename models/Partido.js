import PartidoDAO from '../dao/PartidoDAO.js';

export default class Partido {
    #id;
    #nome;
    #sigla;
    #numeroRegistro;

    constructor(id = 0, nome, sigla, numeroRegistro) {
        this.#id = id;
        this.#nome = nome;
        this.#sigla = sigla;
        this.#numeroRegistro = numeroRegistro;
    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }
    
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get sigla() {
        return this.#sigla;
    }

    set sigla(novaSigla) {
        this.#sigla = novaSigla;
    }

    get numeroRegistro() {
        return this.#numeroRegistro;
    }

    set numeroRegistro(novoNumeroRegistro) {
        this.#numeroRegistro = novoNumeroRegistro;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            sigla: this.#sigla,
            numeroRegistro: this.#numeroRegistro
        };
    }

    async incluir() {
        const partidoDAO = new PartidoDAO();
        return await partidoDAO.incluir(this);
    }

    async alterar() {
        const partidoDAO = new PartidoDAO();
        return await partidoDAO.alterar(this);
    }

    async excluir(id) {
        const partidoDAO = new PartidoDAO();
        return await partidoDAO.excluir(id);
    }

    async listar(id) {
        const partidoDAO = new PartidoDAO();
        return await partidoDAO.listar(id);
    }
}