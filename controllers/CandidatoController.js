import Candidato from '../models/Candidato.js';

class CandidatoController{

    async getCandidatos(req, res){
        if(req.method == 'GET'){
            const candidato = new Candidato();
            candidato.listar().then((candidatos) => {
                res.status(200).json(candidatos);
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao buscar os candidatos' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async getCandidato(req, res){
        const { id } = req.params;
        if(req.method == 'GET' && id != null){
            const candidato = new Candidato();
            candidato.listar(id).then((candidato) => {
                if(candidato.length == 0)
                    res.status(404).json({ status: false, message: 'Candidato não encontrado' });
                else
                    res.status(200).json(candidato[0]);                        
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao buscar o candidato' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async insertCandidato(req, res){
        if(req.method == 'POST' && req.is('application/json')){
            const { nome, idPartido, numeroCandidato } = req.body;

            if (!nome || !idPartido || !numeroCandidato)
                return res.status(400).json({ status: false, message: 'Todos os campos são obrigatórios' });

            const candidato = new Candidato('', nome, idPartido, numeroCandidato);
            candidato.incluir().then(() => {
                res.status(201).json({ status: true, message: 'Candidato adicionado com sucesso' });
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao adicionar o candidato' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async updateCandidato(req, res){
        if(req.method == 'PUT' && req.is('application/json')){
            const { id, nome, idPartido, numeroCandidato } = req.body;
            if (!id || !nome || !idPartido || !numeroCandidato)
                return res.status(400).json({ status: false, message: 'Todos os campos são obrigatórios' });

            const candidato = new Candidato(id, nome, idPartido, numeroCandidato);
            candidato.alterar().then(() => {
                res.status(200).json({ status: true, message: 'Candidato alterado com sucesso' });
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao alterar o candidato' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async deleteCandidato(req, res){
        const { id } = req.params;
        if(req.method == 'DELETE' && id != null){
            const candidato = new Candidato();
            candidato.excluir(id).then(() => {
                res.status(200).json({ status: true, message: 'Candidato excluído com sucesso' });
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao excluir o candidato' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }
}

export default new CandidatoController();