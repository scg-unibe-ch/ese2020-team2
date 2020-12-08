import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router:Router) {
    this.navLinks = [
      {
        label: 'Sell',
        link: './sell',
        index: 0
    }, {
        label: 'Lend',
        link: './lend',
        index: 1
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
