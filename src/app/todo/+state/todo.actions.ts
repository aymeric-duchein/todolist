import { TodoInterface } from '../todo.interface';

/**
 * Liste des actions pour la gestion des tâches
 */
export namespace TodoActions {

  /**
   * Ajoute des tâches au state
   */
  export class GetAll {
    static readonly type = '[Todo] Get All';
  }


  /**
   * Ajoute des tâches au state
   */
  export class GetAllSuccess {
    static readonly type = '[Todo] Get All Success';

    constructor(public todoList: TodoInterface.Todo[]) {
    }
  }

  /**
   * Demande l'ajout d'une tâche
   */
  export class Add {
    static readonly type = '[Todo] Add Todo';

    constructor(public name: string) {
    }
  }

  /**
   * Ajoute une tâche
   */
  export class AddSuccess {
    static readonly type = '[Todo] Add Todo Success';

    constructor(public todo: TodoInterface.Todo) {
    }
  }

  /**
   * Demande le changement d'état d'une tâche
   */
  export class ChangeStatus {
    static readonly type = '[Todo] Change Status';

    constructor(public id: string) {
    }
  }

  /**
   * Change l'état d'une tâche
   */
  export class ChangeStatusSuccess {
    static readonly type = '[Todo] Change Status Success';

    constructor(public todo: TodoInterface.Todo) {
    }
  }

  /**
   * Filtre les tâches
   */
  export class Filter {
    static readonly type = '[Todo] Filter';

    constructor(public filter: TodoInterface.Filter) {
    }
  }

  export class ThrowException {
    static readonly type = '[Todo] Throw Exception';

    constructor(public description: string, cause: any) {
    }
  }


}
