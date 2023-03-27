import {AfterViewInit, Component, OnInit} from "@angular/core";
import type {AccordionInterface, AccordionItem, AccordionOptions} from "flowbite";
import {Accordion} from "flowbite";
import {MainframeService} from "../../../../auth/src/app/mainframe.service";
import {CredService} from "../../../../auth/src/app/core/cred.service";

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
  credentials: string[] = ["WebUntis", "Eduvidual"]
  selectedItem: AccordionItem | null = null
  //emailValid: boolean | null = false
  username: string = ""
  password?: string
  changeAnswer: string = ""

  constructor(private credService: CredService,
              private mainframe: MainframeService) {
  }

  ngOnInit(): void {
    this.accordionItems = []
  }

  async click() {
    console.log("click") //FUNKTIONIERT NED SO WIRKLE :(
    //Login wiad aufgruafn oba es wird nixe gschickt?
    //Siehe: ExecuteLogin -> wiad nixe do (bei Loginscreen oba scho)
    //I BI TRAURIG
    if (this.isValid()) {
      const pwEncrypted = await this.credService.encryptPassword(this.password!);
      this.mainframe.login(this.username!, pwEncrypted, false)
        .then(error => {
          console.log(error)
          this.changeAnswer = error
        })
    }
    if(this.changeAnswer.length == 0) this.changeAnswer = "!Error! Leider konnten wir Sie nicht anmelden. Versuchen Sie es bitte erneut!"
  }

  private isValid(): boolean{
    return  this.username != undefined && this.username?.length > 0 && this.password != undefined && this.password?.length > 0
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
