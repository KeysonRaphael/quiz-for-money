import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { BinaryOperator } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = 'http://157.245.38.22/wincaptcha/';
  // private API_URL = 'http://127.0.0.1:5000/wincaptcha/';


  constructor(public http: HttpClient, private toast: ToastController, private storage: Storage) { }

  createAccount(email: string, password: string, name: String, mestre:string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        senha: password,
        nome: name,
        mestre: mestre,
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

  async cadastrarEndereco(token:string,cidade_id:string,bairro:string,rua:string,numero:string,cep:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        cidade_id: cidade_id,
        bairro: bairro,
        rua:rua,
        numero:numero,
        cep:cep
      };
 
      this.http.post(this.API_URL + 'endereco', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getPremiacao() {
    return new Promise((resolve, reject) => {
      var data = {
      };
 
      this.http.get(this.API_URL + 'premios', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getHistorico(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'pagamentos', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getAnuncio(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'anuncio', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async minAnuncio(token:string,id:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        anuncio:id
      };
 
      this.http.post(this.API_URL + 'anuncioVisualizado', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async cadastrarCelular(token:string,telefone:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        telefone:telefone
      };
 
      this.http.put(this.API_URL + 'telefone', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async cadastrarNascSexo(token:string,date:string,sexo:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        data:date,
        sexo:sexo
      };
 
      this.http.put(this.API_URL + 'nasc&sexo', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getPerfil(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'perfil', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getSeguidores(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'seguidores/total', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getPontuacao(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'pontuacao', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async esqueceuSenha(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: token
      };
 
      this.http.post(this.API_URL + 'atualizar/senha', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async comprarTicket(token:string, grupo:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        id:grupo
      };
 
      this.http.post(this.API_URL + 'comprar/ticket', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async buscarHistorico(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'historico/grupos', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getEstados() {
    return new Promise((resolve, reject) => {
 
      this.http.get(this.API_URL + 'estados')
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getCidades(estado) {
    return new Promise((resolve, reject) => {
 
      this.http.get(this.API_URL + 'estados/'+estado+'/cidades')
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getGrupos() {
    return new Promise((resolve, reject) => {
 
      this.http.get(this.API_URL + 'grupos')
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async addPontuacao(token:string, subject:string, status:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token,
        subject_id: subject,
        status: status,
      };
      this.http.put(this.API_URL + 'atualizar_pontuacao', data)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async getRank(token:string) {
    return new Promise((resolve, reject) => {
      var data = {
        token: token
      };
 
      this.http.post(this.API_URL + 'getrank', data)
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
    return this.storage.set('token', accessToken);
  }

  public getToken(){
    return this.storage.get('token').then((val) => {
      return val;  
    });
  }

  public setEmail(email: string) {
    return this.storage.set('email', email);
  }

  public getEmail(){
    return this.storage.get('email').then((val) => {
      return val;  
    });
  }

  public setSenha(senha: string) {
    return this.storage.set('senha', senha);
  }

  public getSenha(){
    return this.storage.get('senha').then((val) => {
      return val;  
    });
  }

}
