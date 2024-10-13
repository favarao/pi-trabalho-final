import CandidatoDAO from '../dao/CandidatoDAO.js'

export default class Candidato {
    #id;
    #nome;
    #idPartido;
    #nomePartido
    #numeroCandidato;

    constructor(id = 0, nome, idPartido, numeroCandidato) {
        this.#id = id;
        this.#nome = nome;
        this.#idPartido = idPartido;
        this.#numeroCandidato = numeroCandidato;
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

    get idPartido() {
        return this.#idPartido;
    }

    set idPartido(novoIdPartido) {
        this.#idPartido = novoIdPartido;
    }

    get numeroCandidato() {
        return this.#numeroCandidato;
    }

    set numeroCandidato(novoNumeroCandidato) {
        this.#numeroCandidato = novoNumeroCandidato;
    }

    toJson(){
        return {
            id: this.#id,
            nome: this.#nome,
            idPartido: this.#idPartido,
            numeroCandidato: this.#numeroCandidato
        }
    }

    async incluir(){
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.incluir(this);
    }

    async alterar(){
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.alterar(this);
    }

    async excluir(id){
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.excluir(id);
    }

    async listar(id){
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.listar(id);
    }
}