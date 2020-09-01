import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadRole } from 'app/store/actions/role.actions';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'app/services/toaster.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit, OnDestroy {
    selectedUserId: number;
    selectedUserData: any;
    selectedRoleId: number;
    userDetailsForm: FormGroup;

    roleStoreSub: Subscription;
    roleList: any;

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
        private store: Store<any>, private userService: UserService, public dialog: MatDialog,
        private toasterService: ToasterService) {
        this.selectedUserId = this.activatedRoute.snapshot.params['userId'];
    }

    ngOnInit() {
        this.store.dispatch(new LoadRole());
        this.createControl();
        this.onGetUserDetails();
    }

    createControl() {
        this.userDetailsForm = this.fb.group({
            status: [''],
            isMFA: ['']
        });
    }

    onGetUserDetails() {
        this.userService.getSingleUserById(+this.selectedUserId).subscribe((res: any) => {
            this.selectedUserData = res.data;
            // console.log(this.selectedUserData);
        });
        this.onGetRoleList();
    }

    onGetRoleList() {
        this.roleStoreSub = this.store.select(s => s.role).subscribe(data => this.roleList = data);
    }

    openChangeRoleModal(modalName) {
        const dialogRef = this.dialog.open(modalName, {
            // width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.onChangeRole(result);
            }
        });
    }

    onCloseModal() {
        this.dialog.closeAll();
    }

    onChangeRole(roleId) {
        let data: any = {};
        data.userId = this.selectedUserId;
        data.roleId = roleId;
        this.userService.changeRole(data).subscribe((res: any) => {
            if (res.success) {
                this.toasterService.showSuccessToater('Role changed successfully.');
            } else {
                this.toasterService.showErrorToater('Role change unsuccessful.');
            }
            this.onGetUserDetails();
        });
    }

    onChangeStatus() {
        let data: any = {};
        data.userId = this.selectedUserId;
        data.status = this.userDetailsForm.get('status').value;
        this.userService.updateSingleUser(data).subscribe((res: any) => {
            if (res.success) {
                this.toasterService.showSuccessToater('Status changed successfully.');
            } else {
                this.toasterService.showErrorToater('Status change unsuccessful.');
            }
            this.onGetUserDetails();
        });
    }

    onChangeMfa() {
        let data: any = {};
        data.userId = this.selectedUserId;
        data.isMFA = this.userDetailsForm.get('isMFA').value;
        this.userService.updateSingleUser(data).subscribe((res: any) => {
            if (res.success) {
                this.toasterService.showSuccessToater('MFA changed successfully.');
            } else {
                this.toasterService.showErrorToater('MFA change unsuccessful.');
            }
            this.onGetUserDetails();
        });
    }

    ngOnDestroy(): void {
        this.roleStoreSub.unsubscribe();
    }
}