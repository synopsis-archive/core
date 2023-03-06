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
  credentials: string[] = ["WebUntis", "Eduvidual"];
  selectedItem: AccordionItem | null = null;
  constructor() {

  }

  ngOnInit(): void {
    this.accordionItems = []
  }

  click() {

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
      activeClasses: "text-gray-500",
      inactiveClasses: "text-gray-500",
      onOpen: (_) => {
      },
      onClose: (_) => {
      },
      onToggle: (_) => {
      },
    }

    this.accordion = new Accordion(this.accordionItems, this.options)
    this.accordion.open(`accordion-${(this.credentials)[1]}-header`)
  }

  clicked(credential: string) {
    let clickedItem = this.accordion.getItem(`accordion-${credential}-heading`)
    if(clickedItem?.active){
      this.selectedItem = null
      this.accordion.close(`accordion-${credential}-heading`)
    }else if(clickedItem != null){
      this.selectedItem = clickedItem
      this.accordion.open(`accordion-${credential}-heading`)
    }
  }
}
