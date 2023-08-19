import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-selton-demo',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './selton-demo.component.html',
  styleUrls: ['./selton-demo.component.scss'],
  providers: [ListService],
})
export class SeltonDemoComponent {
  public contentLoaded: boolean = false;
  public products!: any[];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getProducts();
    }, 3000);
  }

  private getProducts() {
    this.listService.products().subscribe({
      next: (res: any) => {
        this.products = res.products;
        console.log('this.products', this.products);
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }
}
