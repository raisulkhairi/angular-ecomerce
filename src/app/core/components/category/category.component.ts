import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() data!: any[];

  @Output() valueSelected = new EventEmitter<string>();

  selected!: string;

  handleChip(event: any) {
    this.selected = event;
    this.valueSelected.emit(event)
  }

}
