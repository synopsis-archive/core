import {AfterViewInit, Component, OnInit} from "@angular/core";
import type {AccordionInterface, AccordionItem, AccordionOptions} from "flowbite";
import {Accordion} from "flowbite";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})

export class SettingsComponent implements OnInit, AfterViewInit {

  accordionItems: AccordionItem[] = null!
  options: AccordionOptions = null!
  accordion: AccordionInterface = null!

  checked: boolean = true
  credentials: string[] = ["WebUntis", "Edu"];

  constructor() {

  }

  ngOnInit(): void {
    this.accordionItems = []
    /*for (const credential of this.credentials) {
      this.accordionItems.push({
        id: `credentials-${credential}-header`,
        triggerEl: document.querySelector(`#credentials-${credential}-header`)!,
        targetEl: document.querySelector(`#credentials-${credential}-body`)!,
        active: true
      }, {
        id: `accordion-${credential}-heading`,
          triggerEl: document.querySelector(`#accordion-${credential}-heading`)!,
          targetEl: document.querySelector(`#accordion-${credential}-body`)!,
          active: true
      },)
    }*/
    /*this.accordionItems = [
      {
        id: 'credentials-webuntis-header',
        triggerEl: document.querySelector('#credentials-webuntis-header')!,
        targetEl: document.querySelector('#credentials-webuntis-body')!,
        active: true
      },
      {
        id: 'accordion-example-heading-2',
        triggerEl: document.querySelector('#accordion-example-heading-2')!,
        targetEl: document.querySelector('#accordion-example-body-2')!,
        active: false
      },
      {
        id: 'accordion-example-heading-3',
        triggerEl: document.querySelector('#accordion-example-heading-3')!,
        targetEl: document.querySelector('#accordion-example-body-3')!,
        active: false
      }
    ];*/
    /*this.options = {
      alwaysOpen: true,
      activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
      onOpen: (item) => {
        console.log('accordion item has been shown');
        console.log(item);
      },
      onClose: (item) => {
        console.log('accordion item has been hidden');
        console.log(item);
      },
      onToggle: (item) => {
        console.log('accordion item has been toggled');
        console.log(item);
      },
    }

    this.accordion = new Accordion(this.accordionItems, this.options)
    this.accordion.open(`credentials-${(this.accordionItems)[0]}-header`);*/
  }

  click() {
    console.log(this.checked)
  }

  ngAfterViewInit(): void {
    if (this.accordionItems.length > 1) return;
    for (const credential of this.credentials) {
      this.accordionItems.push({
        id: `accordion-${credential}-heading`,
        triggerEl: document.querySelector(`#accordion-${credential}-heading`)!,
        targetEl: document.querySelector(`#accordion-${credential}-body`)!,
        active: false
      },)
    }
    this.options = {
      alwaysOpen: false,
      activeClasses: 'text-gray-500',
      inactiveClasses: 'text-gray-500',
      onOpen: (item) => {
        console.log('accordion item has been shown');
        console.log(item);
      },
      onClose: (item) => {
        console.log('accordion item has been hidden');
        console.log(item);
      },
      onToggle: (item) => {
        console.log('accordion item has been toggled');
        console.log(item);
      },
    }

    this.accordion = new Accordion(this.accordionItems, this.options)
    this.accordion.open(`accordion-${(this.credentials)[1]}-header`)
  }

  clicked(credential: string) {
    if(this.accordion.getItem(`accordion-${credential}-heading`)?.active){
      this.accordion.close(`accordion-${credential}-heading`)
    }else{
      this.accordion.open(`accordion-${credential}-heading`)
    }
  }
}
