import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, FormArray, AbstractControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-destino-form',
  templateUrl: './destino-form.component.html',
  styleUrls: ['./destino-form.component.css']
})
export class DestinoFormComponent implements OnInit {
  
  @Output() onSave: EventEmitter<DestinoViaje>;
  
  searchResults: string[];
  fg: FormGroup;
  minLongitud = 4;

  constructor(
    private fb: FormBuilder
  ) {
    this.onSave = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['', Validators.required],
      servicios: fb.array([]),
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getListOfServices().forEach( () => this.serviciosFormArray.push(this.fb.control(false)));
    this.configTypeahead();
  }

  getListOfServices() {
    return DestinoViaje.listOfServices;
  }

  get serviciosFormArray() {
      return this.fg.get('servicios') as FormArray
  }

  guardar(): boolean {
    const nombre      = this.fg.controls['nombre'].value;
    const url         = this.fg.controls['url'].value;
    const descripcion = this.fg.controls['descripcion'].value;
    const selected    = this.serviciosFormArray.value;
    const servicios   = this.getListOfServices().filter((s, i) => selected[i]);
    this.onSave.emit(new DestinoViaje(nombre, url, descripcion, servicios));
    return false;
  }

  nombreValidator(control: FormControl): {[s: string]: boolean} {
    const l = control.value.toString().trim().length;
    if(l>0 && l<5)
      return {invalidNombre: true};
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s:string]: boolean} | null => {
      const l = control.value.toString().trim().length;
      if(l>0 && l<minLong)
        return {minLargo: true};
      return null;
    }
  }

  configTypeahead() {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');

    fromEvent(elemNombre, 'input').pipe(
      map((e:KeyboardEvent) => (e.target as HTMLInputElement).value),
      debounceTime(200),
      filter(text => {
        if(text.length >= 4)
          return true;
        // If less than 4 char long, erase results array
        this.searchResults = [];
        return false;
      }),
      distinctUntilChanged(),
      switchMap(() => ajax('/assets/datos.json'))
    ).subscribe( ajaxRes => {
      const val:string = this.fg.controls['nombre'].value.toLowerCase();
      const temp:string[] = (ajaxRes.response as string[])
                          .filter(elem => elem.toLowerCase().indexOf(val) != -1);
      this.searchResults = (temp.length > 0)? temp : ['No hay sugerencias'];
    });
  }

}
