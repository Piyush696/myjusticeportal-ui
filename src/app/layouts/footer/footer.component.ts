import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.scss']
    
})

export class FooterComponent{
    test : Date = new Date();
    footerText:string;
    isButton:boolean;
    buttonLink:any;
constructor(private store: Store<any>) { }
  ngOnInit() {
    this.store.select(s => s.userInfo).subscribe(x => { 
        if(x.roles[0].roleId==1){
            this.isButton=true;
            this.footerText="Message My Lawyer";
            this.buttonLink="user/message-my-lawyer";
        }else if(x.roles[0].roleId==3){
            this.isButton=true;
            this.footerText="Message";
            this.buttonLink="lawyer/lawyer-chat";
        }else{
            this.isButton=false;
        }
     })
  }
}

