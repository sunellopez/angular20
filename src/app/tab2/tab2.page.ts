import { Component, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { LoadingController, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { ChartComponent, NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexStroke, ApexMarkers, ApexDataLabels, ApexPlotOptions, ApexTooltip, ApexGrid, ApexLegend} from 'ng-apexcharts';
import { ExpenseService } from '../service/expense/expense.service';
import { finalize } from 'rxjs';
import { Expense, Summary } from '@interfaces';
import { CurrencyPipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  colors: any[];
  labels: any[];
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  stroke: ApexStroke;
  markers: ApexMarkers;
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonModal, IonDatetimeButton, IonDatetime, IonButton, CurrencyPipe, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, NgApexchartsModule, ChartComponent],
  standalone: true
})
export class Tab2Page {
  @ViewChild("chart") chart!: ChartComponent;
  
  private expenseService = inject(ExpenseService);
  private loadingCtrl = inject(LoadingController);
  
  selectedYear = new Date().getFullYear();
  isLoadingSummary: WritableSignal<boolean> = signal(false);
  protected summary = signal<Summary>({
    total: 0,
    start: '',
    end: '',
    count: 0
  });
  protected highestExpenseThisWeek = signal<Expense>({
    id: 0,
    user_id: 0,
    description: '',
    amount: '',
    date: ''
  });
  public chartOptions: ChartOptions = {
    series: [
      {
        name: "",
        data: [],
        color: "#4d8dff"
      }
    ],
    chart: {
      type: "line",
      height: 100,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 0
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    title: {
      text: ""
    },
    xaxis: {
      categories: []
    },
    yaxis: {},
    tooltip: {
      theme: 'dark',
      x: {
        show:true
      },
       y: {
        formatter: function(value) {
          return Number(value).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          });
        },
        title: {
          formatter: function() {
            return ''; // no mostrar nombre de la serie
          }
        }
      }
    },
    colors: [],
    labels: [],
    grid: {},
    dataLabels: {},
    legend: {}
  };
  public monthlyExpenseChartOptions: ChartOptions = {
    series: [
      {
        name: 'Gasto Mensual',
        data: [] // Un valor por mes
      }
    ],
    chart: {
      type: 'area',
      height: 180,
      width: '100%',
      toolbar: {
        show: false,
      },
      stacked: false,
      sparkline: {
        enabled: true
      },
    },
    title: {
      text: ""
    },
    xaxis: {
      categories: [],
      labels: {
        show: true
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show:true
      },
      y: {
        formatter: function (value) {
          return value.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          });
        },
        title: {
          formatter: function() {
            return ''; // no mostrar nombre de la serie
          }
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    colors: ['#4d8dff'],
    grid: {
      borderColor: '#343F59',
      padding: {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    labels: [],
    stroke: {},
    markers: {}
  };

  constructor() {}

  ionViewWillEnter() {
    this.loadInitData();
  }

  loadInitData() {
    this.loadSummary();
    this.loadHighestExpenseThisWeek();
    this.loadMonthlyExpense(this.selectedYear);
  }

  async loadSummary() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.isLoadingSummary.set(true);

    this.expenseService.getWeeklySummary()
    .pipe(
      finalize(() => {
        this.isLoadingSummary.set(false);
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res: any) => {
        this.summary.set(res.data);
        this.chartOptions.series = [{
          data: res.data.daily
        }];
        this.chartOptions.xaxis = {
          categories: res.data.labels
        };
      },
      error(err: any) {
        console.log('Error:', err)
      },
    });
  }

  loadHighestExpenseThisWeek() {
    this.expenseService.getHighestExpenseThisWeek()
    .subscribe({
      next: (res: any) => {
        this.highestExpenseThisWeek.set(res.data);
      },
      error(err: any) {
        console.log('Error:', err)
      },
    });
  }

  async loadMonthlyExpense(e: any) {
    let yearSelected = e;

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.expenseService.getMonthlyExpense(yearSelected)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .subscribe({
      next: (res: any) => {
        this.monthlyExpenseChartOptions.series = [{
          data: res.data.monthlyExpenses
        }];
        
        this.monthlyExpenseChartOptions.xaxis = {
          categories: res.data.months
        };
      },
      error: (err: any) => {
        console.log('Error:', err)
      }
    })
  }
}