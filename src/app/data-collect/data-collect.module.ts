import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCollectComponent } from './data-collect.component';
import { DataCollectService } from './data-collect.service';
import { DataTableEditorComponent } from './components/data-table-editor/data-table-editor.component';
import { FormsModule } from '@angular/forms';
import { ApiSearchComponent } from './components/api-search/api-search.component';
import { ApiResultComponent } from './components/api-result/api-result.component';
import { ApiResultMappingComponent } from './components/api-result-mapping/api-result-mapping.component';
import { ApiResultTableComponent } from './components/api-result-table/api-result-table.component';
import { ApiService } from './services/api.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { StartViewComponent } from './components/start-view/start-view.component';
import { DataCollectHeaderComponent } from './components/data-collect-header/data-collect-header.component';
import { DataCollectFooterComponent } from './components/data-collect-footer/data-collect-footer.component';
import { HttpRequestStatusComponent } from './components/http-request-status/http-request-status.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    DataCollectComponent,
    DataTableEditorComponent,
    ApiSearchComponent,
    ApiResultComponent,
    ApiResultMappingComponent,
    ApiResultTableComponent,
    StartViewComponent,
    DataCollectHeaderComponent,
    DataCollectFooterComponent,
    HttpRequestStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  exports: [
    DataCollectComponent,
    MatRadioModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [
    DataCollectService,
    ApiService,
  ]
})
export class DataCollectModule {
}
