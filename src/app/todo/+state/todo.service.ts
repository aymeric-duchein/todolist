import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoInterface } from '../todo.interface';
import { HttpClient } from '@angular/common/http';

const serverUrl = 'http://localhost:3000';

/**
 * Service de gestion des tâches
 * Simule des appels http vers des api externes
 */
@Injectable()
export class TodoService {

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  /**
   * Retourne la listes complète des tâches
   */
  getAll(): Observable<TodoInterface.Todo[]> {
    return this.http.get<TodoInterface.Todo[]>(`${serverUrl}/todo`);
  }

  /**
   * Ajoute une nouvelle tâche
   * @param name nom de la tâche
   */
  add(name: string): Observable<TodoInterface.Todo> {
    return this.http.post<TodoInterface.Todo>(`${serverUrl}/todo`, {name, completed: false});
  }

  /**
   * Mets à jour une tâche
   * @param todoToBeUpdate tâche à mettre à jour
   */
  update(todoToBeUpdate: TodoInterface.Todo): Observable<TodoInterface.Todo> {
    return this.http.put<TodoInterface.Todo>(`${serverUrl}/todo/${ todoToBeUpdate.id }`, todoToBeUpdate);
  }
}
