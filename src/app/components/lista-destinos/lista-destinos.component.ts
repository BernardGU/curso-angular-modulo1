import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos:{
    nombre:string,
    url:string
  }[];

  constructor() {
    this.destinos = [
      {nombre: 'Destino 1', url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkittybloger.files.wordpress.com%2F2012%2F05%2Fcute-kittens-20-great-pictures-12.jpg%3Fw%3D500%26h%3D335&f=1&nofb=1'}
    ];
  }

  ngOnInit(): void { }

  guardar(nombre:string, url:string): boolean {
    this.destinos.push({nombre: nombre, url: url});
    return false;
  }

}
