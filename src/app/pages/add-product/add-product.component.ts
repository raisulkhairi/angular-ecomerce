import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/products/product.service';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, MatDialogModule,MatInputModule,FormsModule, MatFormFieldModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }


  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  closeDialog(returnValue: any) {
    this.dialogRef.close(returnValue);
  }

  onSubmit() {
    console.log(this.form.value);
    this.productService.addProduct(this.form.value).subscribe({
      next: resp => {
        this.dialogRef.close();
      }
    })
  }

}
