import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  datos!: string;
  products: any = [];
  total: number = 0;
  formularioContacto = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    precio: new FormControl(''),
    cantidad: new FormControl(''),
    descripcion: new FormControl(''),
  })

  public enviar() {
    let existeProducto = false;
    for (let i = 0; i < this.products.length; i++) {
      if (this.formularioContacto.value.codigo == this.products[i].codigo) {
        existeProducto = true;
        alert('ya existe un articulo con dicho codigo');
      }
    }
    if (existeProducto == false) {
      this.products.push({
        codigo: this.formularioContacto.value.codigo,
        nombre: this.formularioContacto.value.nombre,
        precio: this.formularioContacto.value.precio,
        cantidad: this.formularioContacto.value.cantidad,
        descripcion: this.formularioContacto.value.descripcion
      });
    }
    this.calcularTotal();
  }
  public eliminar(codigo: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (codigo == this.products[i].codigo) {
        this.products.splice(i, 1);
      }
    }
    this.calcularTotal();
  }

  modificar() {
    let existe = false;
    for (let i = 0; i < this.products.length; i++) {
      if (this.formularioContacto.value.codigo == this.products[i].codigo) {
        this.products[i].nombre = this.formularioContacto.value.nombre
        this.products[i].precio = this.formularioContacto.value.precio
        this.products[i].cantidad = this.formularioContacto.value.cantidad
        this.products[i].descripcion = this.formularioContacto.value.descripcion
        existe = true;
        break;
      }
    }
    if (existe == false) {
      alert('No existe el código del articulo que desea modificar');
    }
    this.calcularTotal();
  }
  calcularTotal() {
    let subtotal = 0;
    for (let producto of this.products) {
      subtotal += parseInt(producto.precio) * parseInt(producto.cantidad);
    }
    this.total = subtotal * 1.19;
  }

}