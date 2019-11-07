/**
 * Définit les structures des objets manipulés
 */
export namespace TodoInterface {

  export interface Todo {
    id: string;
    name: string;
    completed: boolean;
  }

  export enum Filter {
    ALL = 'ALL',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
}
