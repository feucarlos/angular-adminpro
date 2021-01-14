import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string;
  tituloSubs$: Subscription;

  constructor(private router: Router) { 
    this.tituloSubs$ =  this.getTituloRuta().subscribe( ({ titulo }) => {
                        this.titulo = titulo;
                        document.title = 'Adminpro: ' + titulo;
                        });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getTituloRuta(){
    return  this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null),
      map((event: ActivationEnd ) => event.snapshot.data  )
    )
    // .subscribe( ({ titulo }) => {
    //   this.titulo = titulo;
    //   document.title = 'Adminpro: ' + titulo;
    // } )

  }


}
