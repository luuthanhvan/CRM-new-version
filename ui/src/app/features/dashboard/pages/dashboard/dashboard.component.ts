import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { ContactService } from '~features/contact/services/contact.service';
import { SalesOrderService } from '~features/sales-order/services/sales-order.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TranslateModule, MatCardModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) contactChart!: BaseChartDirective;
  @ViewChild(BaseChartDirective) salesOrderChart!: BaseChartDirective;
  contactService = inject(ContactService);
  salesOrderService = inject(SalesOrderService);

  // Pie chart for contact
  contactPieChartLabels: string[] = [
    'Existing Customer',
    'Partner',
    'Conference',
    'Website',
    'Word of mouth',
    'Other',
  ];
  contactPieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  contactPieChartDatasets = [
    {
      data: [0, 0, 0, 0, 0, 0],
    },
  ];

  // Pie chart for Sales order
  salesOrderPieChartLabels: string[] = [
    'Created',
    'Approved',
    'Delivered',
    'Canceled',
  ];
  salesOrderPieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  salesOrderPieChartDatasets = [
    {
      data: [0, 0, 0, 0, 0, 0],
    },
  ];

  ngOnInit(): void {
    this.loadContactChartData();
    this.loadSalesOrderChartData();
  }

  loadContactChartData() {
    this.contactService.countContacts('lead-source').subscribe((data) => {
      this.contactPieChartDatasets = [...this.contactPieChartDatasets];
      data.forEach((item: { [key: string]: any }) => {
        const index = this.contactPieChartLabels.indexOf(item['_id']);
        this.contactPieChartDatasets[0].data[index] = item['count'];
      });
      // Force chart update
      this.contactChart.update();
    });

    console.log(this.contactPieChartDatasets);
  }

  loadSalesOrderChartData() {
    this.salesOrderService.countSalesOrder('status').subscribe((data) => {
      this.salesOrderPieChartDatasets = [...this.salesOrderPieChartDatasets];
      data.forEach((item: { [key: string]: any }) => {
        const index = this.salesOrderPieChartLabels.indexOf(item['_id']);
        this.salesOrderPieChartDatasets[0].data[index] = item['count'];
      });
      // Force chart update
      this.salesOrderChart.update();
    });
  }
}
