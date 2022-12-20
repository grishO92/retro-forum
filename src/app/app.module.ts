import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { WrongPageComponent } from './components/wrong-page/wrong-page.component';
import { ApiService } from './shared/services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ProfileComponent,
    WrongPageComponent,
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideAuth(() => getAuth()),
  ],
})
export class AppModule {}
