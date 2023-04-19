import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent 
{
  title = 'Practica311';
  encabezados = [];
  valores = [];
  datos = [];
  ValorActual = 0;
  url = "http://www.levelapi.somee.com/api/nivels";
  chart: any;
  timeLeft = 60;
  interval: any;
  startTimer() {
    this.interval = setInterval(() => {
      this.obtenerDatos();
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 500)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  constructor(private http: HttpClient) {
    this.startTimer();
  }
  ngOnInit(): void {
    this.createChart();
    console.log(this.chart.data.datasets);
  }
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.encabezados,
        datasets: [
          {
            label: "Histórico de datos del Sensor",
            data: this.valores,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  obtenerDatos() {
    this.http.get<any>(this.url).subscribe(data => {
      this.datos = data;
      this.encabezados = [];
      this.valores = [];

      for (let i = this.datos.length - 1; i >= 0; i--) {
        this.encabezados.push(this.datos[i]['id']);
        this.valores.push(this.datos[i]['nive']);
      }

      this.chart.data.labels = this.encabezados;
      this.chart.data.datasets[0].data = this.valores;
      this.chart.update();
    });
  }
}

