
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {

  bannerData : any;
  dataSource !: MatTableDataSource<any>;

  displayedColumns !: ['symbol', 'current:price', 'price_change_percentage_24h', 'market_cap'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( private api: ApiService) {
   
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
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     })
  }

  getAllData(){
    this.api.getCurrencyData('NGN')
     .subscribe(res =>{
        console.log(res);
        // this.bannerData= res;
     })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

