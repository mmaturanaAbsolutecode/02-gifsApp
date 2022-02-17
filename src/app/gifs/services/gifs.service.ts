import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'kAXyOmKAdKE0cUNej9j8RzQqZ0wJYsJS';
  private servicioUrl: string ='https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //TODO: cambiar pro el tipo correcto
  public resultados: any[] = [];

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


    // localStorage.getItem('historial');
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

  }


  get historial() {

    return [...this._historial];
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    // console.log(params.toString());



    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })

    //console.log(this._historial);

  }

}
