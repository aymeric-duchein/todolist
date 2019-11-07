import { HttpClient } from '@angular/common/http';

export namespace MockHttpClient {
  export const mock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn()
  };

  export const provide = {
    provide: HttpClient,
    useValue: mock
  };
}
