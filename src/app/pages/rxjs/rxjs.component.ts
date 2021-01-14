import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe( 
    //   valor => console.log('Subs: ', valor ),
    //   (error)=> console.warn('Error', error),
    //   () => console.info('Obs terminado')
    // );

    this.intervalSubs =  this.retornaIntervalo().subscribe(console.log);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(500)
            .pipe(
              take(10),
              map( valor => valor + 1),
              filter( valor => ( valor % 2 === 0)? true: false)
            );
  }

  retornaObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>( observer => {
      const intervalo = setInterval( ()=> {
        i++;
        observer.next(i);
        if ( i === 5){
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2){
          observer.error('i es #2')
        }
      }, 1000 );
    })

  }

}
