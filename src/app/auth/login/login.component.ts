import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;
  
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    // this.router.navigateByUrl('/');
    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        if (this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
      }, (err)=>{
        Swal.fire('Error', err.error.msg, 'error'); 
      });
    
  }

//   onSuccess(googleUser) {
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//     const id_token = googleUser.getAuthResponse().id_token;
//     // console.log(id_token);
//  }

//   onFailure(error) {
//     console.log(error);
//   }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });
    this.startApp();
  }

  startApp(){
    gapi.load('auth2', ()=> {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '626070206867-sqlp8fuq0dff5tn4hn6kuo0r3vri67u4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {
    // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          // document.getElementById('name').innerText = "Signed in: " +
          //     googleUser.getBasicProfile().getName();
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe();
          // TODO: redireccionar el dashboard
          
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
