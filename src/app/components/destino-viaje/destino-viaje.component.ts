import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @HostBinding('attr.class') class = 'col-md-4'; 
  @Input() nombre:string;
  @Input() url:string;

  constructor() { }

  ngOnInit(): void {
  }

}
