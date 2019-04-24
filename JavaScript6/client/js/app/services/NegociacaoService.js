class NegociacaoService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    async obterNegociacoesDaSemana() {
               
        try {
            const negociacoes = await this._http
                .get('negociacoes/semana');
            console.log(negociacoes);
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        }
        catch (erro) {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana');
        }  
    }
    
    async obterNegociacoesDaSemanaAnterior() {
               
        try {
            const negociacoes = await this._http
                .get('negociacoes/anterior');
            console.log(negociacoes);
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        }
        catch (erro) {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana anterior');
        }   
    }
    
    async obterNegociacoesDaSemanaRetrasada() {
               
        try {
            const negociacoes = await this._http
                .get('negociacoes/retrasada');
            console.log(negociacoes);
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        }
        catch (erro) {
            console.log(erro);
            throw new Error('Não foi possível obter as negociações da semana retrasada');
        }  
        
    }
    
    async obterNegociacoes() {
        
        try {
            const periodos = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]);
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));
            return negociacoes;
        }
        catch (erro) {
            throw new Error(erro);
        }
	} 
}