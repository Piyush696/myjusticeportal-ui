import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, take } from "rxjs/operators";
import { Observable, EMPTY } from "rxjs";
import { Store } from "@ngrx/store";
import { RoleService } from 'app/services/role.service';
import { AddRole, AddRoleFailure, RoleAction, RoleTypes } from '../actions/role.actions';

@Injectable()
export class RoleEffects {

    constructor(private actions$: Actions, private store: Store<any>,
        private roleService: RoleService) {
    }

    // For Roles.

    @Effect()
    roles$: Observable<any> = this.actions$.pipe(
        ofType<RoleAction>(RoleTypes.LOAD_ROLE),
        mergeMap(() =>
            this.roleService.getAllRoles().pipe(
                map(data => new AddRole(data)),
                catchError(() => {
                    this.store.dispatch(new AddRoleFailure());
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
}