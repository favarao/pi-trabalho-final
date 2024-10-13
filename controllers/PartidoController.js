import Partido from '../models/Partido.js';

class PartidoController{
    
    async getPartidos(req, res){
        if(req.method == 'GET'){
            const partido = new Partido();
            partido.listar().then((partidos) => {
                res.status(200).json(partidos);
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao buscar os partidos' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async getPartido(req, res){
        const { id } = req.params;
        if(req.method == 'GET' && id != null){
            const partido = new Partido();
            partido.listar(id).then((partido) => {
                if(partido.length == 0)
                    res.status(404).json({ status: false, message: 'Partido não encontrado' });
                else
                    res.status(200).json(partido[0]);                        
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao buscar o partido' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async insertPartido(req, res){
        if(req.method == 'POST' && req.is('application/json')){
            const { nome, sigla, numeroRegistro } = req.body;

            if (!nome || !sigla || !numeroRegistro)
                return res.status(400).json({ status: false, message: 'Todos os campos são obrigatórios' });

            const partido = new Partido('', nome, sigla, numeroRegistro);
            partido.incluir().then(() => {
                res.status(201).json({ status: true, message: 'Partido adicionado com sucesso' });
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao adicionar o partido' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async updatePartido(req, res){
        if(req.method == 'PUT' && req.is('application/json')){
            const { id, nome, sigla, numeroRegistro } = req.body;
            if (!id || !nome || !sigla || !numeroRegistro)
                return res.status(400).json({ status: false, message: 'Todos os campos são obrigatórios' });

            const partido = new Partido(id, nome, sigla, numeroRegistro);
            partido.alterar().then(() => {
                res.status(200).json({ status: true, message: 'Partido alterado com sucesso' });
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao alterar o partido' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }

    async deletePartido(req, res){
        const { id } = req.params;
        if(req.method == 'DELETE' && id != null){
            const partido = new Partido(id);
            partido.excluir(id).then(() => {
                res.status(200).json({ status: true, message: 'Partido excluído com sucesso' });
            }).catch(erro => {
                res.status(500).json({ status: false, message: 'Erro ao excluir o partido' });
            });
        }
        else
            res.status(405).json({ status: false, message: 'Método não permitido' });
    }
}

export default new PartidoController();