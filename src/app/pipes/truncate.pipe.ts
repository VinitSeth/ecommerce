import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string,limit:number=10,flag:boolean=false): string {
    let subString:String;

    if(!value) return ""

    subString = value.substring(0,limit)

    if(flag)
      return subString.substring(0,Math.min(subString.length,subString.lastIndexOf(' ')))+' ...'
    
    return subString+' ...'
  }
}
