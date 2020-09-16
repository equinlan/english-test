import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestIntroComponent } from './test-intro/test-intro.component';
import { AboutComponent } from './about/about.component';
import { TesterComponent } from './tester/tester.component';
import { TestStarterComponent } from './test-starter/test-starter.component';
import { ProctorComponent } from './proctor/proctor.component';
import { TestSummaryComponent } from './test-summary/test-summary.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BucketComponent } from './bucket/bucket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestIntroComponent,
    AboutComponent,
    TesterComponent,
    TestStarterComponent,
    ProctorComponent,
    TestSummaryComponent,
    ChallengeComponent,
    AdminSigninComponent,
    InstructionsComponent,
    FeedbackComponent,
    BucketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
