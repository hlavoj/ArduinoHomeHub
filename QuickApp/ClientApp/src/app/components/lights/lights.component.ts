import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { LightsEndpointService } from '../../services/http/lights-endpoint.service'
import { Light } from '../../models/light.model';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { Utilities } from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {
  columns: any[] = [];
  rows: Light[] = [];
  rowsCache: Light[] = [];
  loadingIndicator: boolean;
  //reorderable = true;

  editedLight: Light = new Light ();
  sourceLight: Light;
  editingLightName: { name: string };

  @ViewChild('colorTemplate', { static: true })
  colorTemplate: TemplateRef<any>;

  @ViewChild('turnOnTemplate', { static: true })
  turnOnTemplate: TemplateRef<any>;

  @ViewChild('indexTemplate', { static: true })
  indexTemplate: TemplateRef<any>;

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;

  @ViewChild('f', { static: false })
  public form;

  
  @Input()
  isViewOnly: boolean;

  constructor(
    private alertService: AlertService, private translationService: AppTranslationService,
    private lightsService: LightsEndpointService,
  ) { }

  ngOnInit() {

    //const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'id', name: 'Id' },
      { prop: 'turnOn', name: 'Turn On', cellTemplate: this.turnOnTemplate },
      { prop: 'intensity', name: 'Intensity' },
      { prop: 'color', name: 'Color', cellTemplate: this.colorTemplate },
      { name: '', width: 240, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
    ];

    this.loadData();
  }


  loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.lightsService.getLights().subscribe(lights => this.proccessLights(lights), error => this.onDataLoadFailed(error))
  }

  proccessLights(lights: Light[]): void {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    lights.forEach((light, index, users) => {
      (light as any).index = index + 1;
    });

    this.rowsCache = [...lights];

    this.rows = lights;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.id, r.intensity, r.turnOn, r.color));
  }

  onEditorModalHidden() {
    this.editingLightName = null;
  }

  newUser() {
    this.editorModal.show();

    //this.formResetToggle = false;

    setTimeout(() => {
      //this.formResetToggle = true;

      this.editedLight = new Light;
      this.editorModal.show();
    });
  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  save() {
    console.info('save new light', this.editedLight);
  }

  turnOnLite(row) {
    console.info('turn on light', row);
  }

  edit(row) {
    console.info('edit light', row);
  }

  delete(row) {
    console.info('delete light', row);
  }

  detail(row) {
    console.info('detail light', row);
  }

}
