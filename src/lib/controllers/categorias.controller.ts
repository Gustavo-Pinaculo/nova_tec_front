import apiService from "$lib/api/api";

export class CategoriasController {
    async listarCategorias():Promise<[any,any]> {
        return await apiService.get('/order/category/')
    }
    async buscarCategoria(id:string):Promise<[any,any]> {
        return await apiService.get('/order/category/'+id)
    }
    async cadastrarCategoria(categoria:FormData){
        return await apiService.postFormData('/order/category/', categoria);
    }
    async editarCategoria(categoria:FormData, id:string){
        return await apiService.patchFormData('/order/category/'+id, categoria);
    }
    async deletarCategoria(id:string){
        return await apiService.delete('/order/category/'+id+'/');
    }   
}