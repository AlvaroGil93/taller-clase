// estrutura basica para hacer pruebas unitarias en agular

/*
en el frontened no provamos servdores - ni bases de datos
aca testeamos que el usuario este obtenido la informacion que deberia 
Que la interfaz funcione
*/
//importar, configurar de pruebas en angulasr


import { TestBed } from '@angular/core/testing';
//importar el servicio o lo que va testiar
import { EjemploService } from './ejemplo.service';

//definir nuestro bloque de pruebas

describe('EjemploService', () => {

// declarar las variables que vatyamos a necesitar en nuestro pruebas
  let service: EjemploService;


// configuracion global ->  el beforeEach siempre lo config
//beforeEach sucede antes de cada caso de prueba

beforeEach(() => {

    //config el entorno de prueba

    TestBed.configureTestingModule({
   
      //todo lo que necesite ejecutar -> importaciones, servicios o componente,provedores,
   providers:[EjemploService]
   
    });

    service = TestBed.inject(EjemploService);

  });




  it('Deberia haberse creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia sumar dos numero correctamente', ()=>{
    const resultado = service.suma(4,5);
    expect(resultado).toBe(9);
  })
});
