
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {

  bannerData : any = [];
  // data : any = ['ade','kola', 'bidemi', 'tolu', 'bimpe'];
  // dataSource : any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  //displayedColumns: string[] = ['symbol', 'current:price', 'price_change_percentage_24h', 'market_cap'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( private api: ApiService, private router: Router) {
   
   }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData(){
     this.api.getTrendingCurrency('NGN')
     .subscribe(res =>{
        console.log(res);
        this.bannerData = res;
     })
  }

  getAllData(){
    this.api.getCurrencyData('NGN')
     .subscribe(res =>{
        console.log(res);
        // this.dataPort = res;

        this.dataSource = new MatTableDataSource(res);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails(row :any ){
    this.router.navigate(['coin-details', row.id])
  }
}

