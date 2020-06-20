export class DestinoViaje {
  public static listOfServices = [
    { name: 'Limpieza', icon:'cleaning_services' },
    { name: 'Cama'    , icon:'single_bed'     },
    { name: 'Wi-Fi'   , icon:'wifi'    },
  ];

  constructor(
    public nombre:string = "Destino", 
    public url:string = "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", 
    public descripcion:string = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, voluptatum! Dolor quo, perspiciatis voluptas totam", 
    public servicios:{name:string,icon:string}[] = DestinoViaje.listOfServices, 
    public votos:number = 0
  ) { }
  increaseVotos() { this.votos++; return this; };
  decreaseVotos() { if(this.votos>0) this.votos--; return this; };

  copy() {
    return new DestinoViaje(this.nombre, this.url, this.descripcion, this.servicios, this.votos);
  }
}