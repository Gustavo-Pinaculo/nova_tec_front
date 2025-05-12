import apiService from "$lib/api/api";

export class DetalhesController {

    private readonly tipos:Record<string, string> = {
        'gola': '/order/collar/',
        'camisa': '/order/shirt/',
        'tecido': '/order/mesh/',
        'pintura': '/order/painting/',
    }

    async listarDetalhes(): Promise<[any, any][]> {
        const promises = [
            apiService.get('/order/mesh/?page=1'),
            apiService.get('/order/collar/?page=1'),
            apiService.get('/order/shirt/?page=1'),
            apiService.get('/order/painting/?page=1'),
        ];
        const results = await Promise.all(promises);
        return results.map(([resposta, erro]) => [resposta, erro]);
    }

    async registrarMaterial(data: FormData, tipo: string): Promise<[any, any]> {
        const tipoSelecionado = this.tipos[tipo];
        if(!tipoSelecionado) throw new Error('Tipo de material inválido');
        return await apiService.postFormData(tipoSelecionado, data);
    }

    async editarMaterial(id: string, data: FormData, tipo: string): Promise<[any, any]> {
        const tipoSelecionado = this.tipos[tipo];
        if(!tipoSelecionado) throw new Error('Tipo de material inválido');
        return await apiService.patchFormData(tipoSelecionado + id, data);
    }

    async deletarMaterial(id: string, tipo: string): Promise<[any, any]> {
        const tipoSelecionado = this.tipos[tipo];
        if(!tipoSelecionado) throw new Error('Tipo de material inválido');
        return await apiService.delete(tipoSelecionado + id + '/');
    }

}