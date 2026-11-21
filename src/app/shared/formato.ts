import { Pipe, PipeTransform } from '@angular/core';

/** 85000000 -> "85.000.000" (separador de miles colombiano, sin depender del locale del navegador) */
export const miles = (n: number): string =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/** 85000000 -> "$ 85.000.000" */
@Pipe({ name: 'cop' })
export class Cop implements PipeTransform {
  transform(valor: number): string {
    return `$ ${miles(valor)}`;
  }
}

/** 15000 -> "15.000 km" */
@Pipe({ name: 'km' })
export class Km implements PipeTransform {
  transform(valor: number): string {
    return `${miles(valor)} km`;
  }
}
