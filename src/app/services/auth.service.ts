import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  TOKEN_KEY:string = 'authToken';

  constructor() {}

  /**
   * Store the authentication token
   * @param token - JWT token to be saved in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
     localStorage.setItem('userId',payload.userId);
    }

  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Remove the token from storage
   */
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getSub():string{
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    }
    return '';
    
  }
  getIsAdmin():boolean{
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub && payload.sub.includes('@admin.com');
    }
    return false;
  }

}
