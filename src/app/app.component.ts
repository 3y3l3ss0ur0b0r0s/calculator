import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'calculator';

  operators = ['-', '+', '*', '/'];
  
  displayText = "0";

  enter(event: Event){
    let target = event.target as HTMLInputElement;
    let value = target.getAttribute("value");
    // Check if value is numeric
    if (value && /^[0-9]$/.test(value)) {
      // Remove leading 0 if another number is pressed instead of an operator
      if (this.displayText === "0") {
        this.displayText = "";
      }
      this.displayText = this.displayText + value; 
    }
    // Check if operator is clicked (and last character in display is not also an operator)
    else if (value && this.operators.includes(value) && /^[\d]$/.test(this.displayText[this.displayText.length - 1])) {
      this.displayText = this.displayText + value; 
    }
  }

  reset() {
    this.displayText = "0";
  }

  calculate() {
    let result = 0;

    // Multiply
    let multNums = this.displayText.match(/(\d+)\*(\d+)/g);
    while (multNums && multNums.length) {
      for (let numPair of multNums) {
        let nums = numPair.split('*');
        let product = parseInt(nums[0]) * parseInt(nums[1]);
        this.displayText = this.displayText.replace(numPair, product.toString());
      }
      multNums = this.displayText.match(/(\d+)\*(\d+)/g);
    }

    // Divide
    let divNums = this.displayText.match(/(\d+)\/(\d+)/g);
    while (divNums && divNums.length) {
      for (let numPair of divNums) {
        let nums = numPair.split('/');
        let product = parseInt(nums[0]) / parseInt(nums[1]);
        this.displayText = this.displayText.replace(numPair, product.toString());
      }
      divNums = this.displayText.match(/(\d+)\/(\d+)/g);
    }

    // Add
    let addNums = this.displayText.match(/(\d+)\+(\d+)/g);
    while (addNums && addNums.length) {
      for (let numPair of addNums) {
        let nums = numPair.split('+');
        let product = parseInt(nums[0]) + parseInt(nums[1]);
        this.displayText = this.displayText.replace(numPair, product.toString());
      }
      addNums = this.displayText.match(/(\d+)\+(\d+)/g);
    }

    // Subtract
    let subNums = this.displayText.match(/(\d+)\-(\d+)/g);
    while (subNums && subNums.length) {
      for (let numPair of subNums) {
        let nums = numPair.split('-');
        let product = parseInt(nums[0]) - parseInt(nums[1]);
        this.displayText = this.displayText.replace(numPair, product.toString());
      }
      subNums = this.displayText.match(/(\d+)\-(\d+)/g);
    }
  }

  constructor() { }
  ngOnInit(): void { }
}
