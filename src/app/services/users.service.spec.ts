import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Prueba para servicio Users', () => {
  let service: UsersService;
  let mockHttp: HttpTestingController;
  const urlTest = "http://localhost:9000/usuarios/";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UsersService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    mockHttp.verify(); // Verifica que no haya peticiones pendientes después de las pruebas
  });

  it('Debería hacer una petición GET para mostrar los usuarios', () => {
    const mockUsers = [
      { fullName: 'Pepito Perez', email: 'pepito@gmail.com', password: '123' },
      { fullName: 'Pepita Perez', email: 'pepita@gmail.com', password: '123' }
    ];

    const mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    };

    service.getUser().subscribe((res) => {
      expect(res).toEqual(mockResponse); // Validar la respuesta
    });

    const req = mockHttp.expectOne(urlTest);
    expect(req.request.method).toBe('GET'); // Validar que el método sea GET

    req.flush(mockResponse); // Simular la respuesta del servidor
  });
});
