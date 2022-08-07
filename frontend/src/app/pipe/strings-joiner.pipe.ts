import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringsJoiner'
})
export class StringsJoinerPipe implements PipeTransform {

  transform(value: Array<{skill:string}>, joiner=', '): string {
    let arr:Array<string> = [];
    value.forEach(item => arr.push(item.skill))
    return arr.join(joiner);
  }
}
