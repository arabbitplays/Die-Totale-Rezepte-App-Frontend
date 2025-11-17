import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-filtered-selector',
  templateUrl: './filtered-selector.component.html',
  styleUrls: ['./filtered-selector.component.css']
})
export class FilteredSelectorComponent implements OnInit {
  formControl = new FormControl('');
  @Input()
  value: string = "";
  @Input()
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  @Output("valueChanged")
  changeEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.formControl.setValue(this.value);
    this.formControl.valueChanges.subscribe(value => this.handleChange(value))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private handleChange(value: string | null) {
    if (!value)
      return;
    this.changeEvent.emit(this.formControl.value || "");
  }
}
