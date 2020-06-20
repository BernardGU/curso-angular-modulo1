import { DestinoViaje } from './destino-viaje.model';
import { Observable } from 'rxjs';
import { CreaDestinoAction, SeleccionaFavoritoAction, BorraDestinoAction, IncrementaVotosAction, DecrementaVotosAction } from '../models/destino-viajes-state.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
    
    constructor(
        private store: Store<AppState>,
    ) { }

    fetchDestinos():Observable<DestinoViaje[]> {
        return this.store.select(state => state.destinos.items);
    }
    fetchDestinoById(id:string):Observable<DestinoViaje> {
        return this.store.select(state => state.destinos.items)
                   .pipe( map(items =>
                       items.filter( d => (d.descripcion.toString() == id))[0]
                   ));
    }
    fetchFavorito():Observable<DestinoViaje> {
        return this.store.select(state => state.destinos.favorito);
    }
    addDestino(d:DestinoViaje) {
        this.store.dispatch(new CreaDestinoAction(d));
    }
    deleteDestino(d: DestinoViaje) {
        this.store.dispatch(new BorraDestinoAction(d));
    }
    setFavorite(d: DestinoViaje) {
        this.store.dispatch(new SeleccionaFavoritoAction(d));
    }
    increaseVotos(d: DestinoViaje) {
        this.store.dispatch(new IncrementaVotosAction(d));
    }
    decreaseVotos(d: DestinoViaje) {
        this.store.dispatch(new DecrementaVotosAction(d));
    }
}