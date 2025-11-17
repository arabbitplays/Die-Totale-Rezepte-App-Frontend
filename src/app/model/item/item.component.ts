import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../Item";
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input()
  item: any = new Item("unasigned", 0, "", false);

  @Output("selected")
  selectedEvent = new EventEmitter<Item>();

  onClick() {
    this.selectedEvent.emit(this.item);
  }
}
