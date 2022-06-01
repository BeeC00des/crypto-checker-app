import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {

  coinData : any;
  coinId !: string;
  days : number = 1;
  currency: string = "NGN";




  constructor( private api : ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(val =>{
      this.coinId= val['id'];
    })
    this.getcoinData();
  }

  getcoinData(){
    this.api.getCurrencyById(this.coinId)
    .subscribe(res=>{
      this.coinData = res;
      console.log(this.coinData);
    })
  }

}
