import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-mis-mensajes-doc',
  templateUrl: './mis-mensajes-doc.component.html',
  styleUrls: ['./mis-mensajes-doc.component.scss']
})
export class MisMensajesDocComponent implements OnInit {
  // DIAS A MOSTRAR
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  months = [ { index: 1, name: 'Enero' }, { index: 2, name: 'Febrero' }, { index: 3, name: 'Marzo' }, { index: 4, name: 'Abril' }, { index: 5, name: 'Mayo' }, { index: 6, name: 'Junio' }, { index: 7, name: 'Julio' }, { index: 8, name: 'Agosto' }, { index: 9, name: 'Septiembre' }, { index: 10, name: 'Octubre' }, { index: 11, name: 'Noviembre' }, { index: 12, name: 'Diciembre' }];
  years = [2020, 2021, 2022,2023 ]
  // DISEÑOS
  cabecera : any = "px-1 font-medium uppercase text-xl rounded-sm  h-4  xl:h-12  flex items-center justify-center border-gray-600 text-gray-400 ";
  

  // FECHAS ELEGIDAS
  monthSelect: any[] = []; // Los dias del mes a mostrar
  dateSelect: any; // La fecha que se estra traendo los dias a mostrar
  dateValue: any; // La data seleccionada (el click)

  // CABECERAS SELECTORES
  /* anioElegido : any = 2023;
  mesElegido : any = 5; */

  anioElegido :  any = new Date().getFullYear();
  mesElegido : any = new Date().getMonth() + 1;

  
  constructor() { 
    this.getDaysFromDate(this.mesElegido,this.anioElegido)
  }

  ngOnInit(): void {
    /* console.log(this.anioElegido);
    console.log(this.mesElegido);
     */
   //this.getDaysFromDate(this.mesElegido,this.anioElegido)
  }

  getDaysFromDate(month : any, year : any) {
    console.log("fechas: " , month , year);
    
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag : any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.anioElegido = prevDate.format("YYYY") ;  this.mesElegido =Number( prevDate.format("MM") ); 
      console.log(this.mesElegido);
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.anioElegido = nextDate.format("YYYY") ;  this.mesElegido = Number(nextDate.format("MM")) ;
      console.log(this.mesElegido);
      
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day : any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


  }

  
}
