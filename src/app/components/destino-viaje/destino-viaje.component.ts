import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { Observable } from 'rxjs';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @HostBinding('attr.class') class = 'col-md-4 mb-4';
  @Input() index: number;
  @Input() destino: DestinoViaje;
  @Output() onFavorite: EventEmitter<DestinoViaje>;
  @Output() onDelete: EventEmitter<DestinoViaje>;

  constructor(
    private api: DestinosApiClient
  ) {
    this.onFavorite = new EventEmitter();
    this.onDelete = new EventEmitter();
  }

  ngOnInit(): void { }

  setFavorite(): boolean {
    this.onFavorite.emit(this.destino);
    return false;
  }
  deleteDestino(): boolean {
    this.onDelete.emit(this.destino);
    return false;
  }
  isFavorito(): Observable<boolean> {
    return this.api.fetchFavorito().pipe(
      map(fav => fav == this.destino) // If fetched favorite is equal to this, then pipe true
    );
  }
  getFavoriteIconClasses():Observable<any> {
    return this.isFavorito().pipe(
      map(isFav => {
        return {
          'material-icons': true,
          'favorite-icon': isFav,
          'not-favorite-icon': !isFav
        }
      })
    );
  }
  increaseVotos() {
    this.api.increaseVotos(this.destino);
  }
  decreaseVotos() {
    this.api.decreaseVotos(this.destino);
  }
}
