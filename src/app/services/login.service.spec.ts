// Importaciones necesarias
import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Prueba para servicio login', () => {
  let _loginService: LoginService;
  let _httpMock: HttpTestingController;

  const urlTest = 'http://localhost:9000/iniciarSesion';
  const emailTest = 'jhon@gmail.com';
  const passwordTest = '123';
  const tokenTest = 'skrfbribvskjrw51';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    // Inyección de servicios
    _loginService = TestBed.inject(LoginService);
    _httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    _httpMock.verify(); // Asegura que no queden peticiones pendientes
  });

  // Caso de prueba 1: Iniciar sesión
  it('Debería hacer una petición POST para iniciar sesión', () => {
    const mockRespuesta = {
      mensaje: 'Inicio de sesión exitoso',
      token: tokenTest
    };

    _loginService.login(emailTest, passwordTest).subscribe(
      (res) => {
        expect(res).toEqual(mockRespuesta);
      }
    );

    const peticion = _httpMock.expectOne(urlTest);
    expect(peticion.request.method).toBe('POST');
    peticion.flush(mockRespuesta); // Simula la respuesta del servidor
  });

  // Caso de prueba 2: Obtener token del localStorage
  it('Debería obtener el token almacenado en el localStorage', () => {
    localStorage.setItem('token', tokenTest); // Simula un token almacenado
    expect(_loginService.getToken()).toBe(tokenTest);
  });

  // Caso de prueba 3: Verificar si el usuario está logueado
  it('Debería verificar si el usuario está logueado', () => {
    localStorage.setItem('token', tokenTest); // Simula un usuario logueado
    expect(_loginService.isLoggedIn()).toBeTrue(); // Debe devolver `true`
  });

  // Caso de prueba 4: Cerrar sesión
  it('Debería cerrar sesión', () => {
    _loginService.logout(); // Simula el cierre de sesión
    expect(localStorage.getItem('token')).toBeNull(); // El token debe eliminarse
  });
});
