import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  title = 'angular-material-tab-router';  
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router:Router) {
    this.navLinks = [
      {
          label: 'Posted Items',
          link: './posted',
          index: 0
      }, {
          label: 'Sold Items',
          link: './sold',
          index: 1
      }, {
          label: 'Lent Items',
          link: './lent',
          index: 2
      }, {
        label: 'Purchased History',
        link: './purchasedHistory',
        index: 3
    },
  ];
   }

  ngOnInit(): void {
    this.updateIndex()
  }
updateIndex(){
  this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
});
}
}
