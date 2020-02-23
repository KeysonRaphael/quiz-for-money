import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = 'http://157.245.38.22/wincaptcha/';
  // private API_URL = 'http://127.0.0.1:5000/wincaptcha/';


  constructor(public http: HttpClient, private toast: ToastController, private storage: Storage) { }

  createAccount(email: string, password: string, name: String) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        senha: password,
        nome: name
      };
 
      this.http.post(this.API_URL + 'cadastrar', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        senha: password
      };
 
      this.http.post(this.API_URL + 'login', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  addGrana(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'addgrana', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getGrana(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'getgrana', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getVersion(version:string) {
    return new Promise((resolve, reject) => {
      var data = {
        version: version
      };
 
      this.http.post(this.API_URL + 'getversion', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getValor() {
    return new Promise((resolve, reject) => {
      var data = {};
      this.http.post(this.API_URL + 'getvalor', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getPerguntas(token:string, subject:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        subject: subject
      };
 
      this.http.post(this.API_URL + 'getperguntas', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async retirarDinheiro(token:string, value:string, date:string, forma:string, conta:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        value: value,
        date: date,
        forma: forma,
        conta: conta
      };
 
      this.http.post(this.API_URL + 'retirarDinheiro', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  public clearToken(){
    this.storage.clear()
  }

  public setAccessToken(accessToken: string) {
    this.clearToken()
    return this.storage.set('token', accessToken);
  }

  public getToken(){
    return this.storage.get('token').then((val) => {
      return val;  
    });
  }

}
