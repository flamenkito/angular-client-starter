import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsComponent {
  @Input()
  docs: any[];
  @Output()
  select = new EventEmitter<string>();

  onSelect(doc: any) {
    this.select.emit(doc);
  }
}
