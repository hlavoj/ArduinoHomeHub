// =============================
// Email: info@ebenmonney.com

// =============================

import { NgModule } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LightsComponent } from './components/lights/lights.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { Utilities } from './services/utilities';



export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        const possibleSeparators = /[?;#]/;
        const indexOfSeparator = url.search(possibleSeparators);
        let processedUrl: string;

        if (indexOfSeparator > -1) {
            const separator = url.charAt(indexOfSeparator);
            const urlParts = Utilities.splitInTwo(url, separator);
            urlParts.firstPart = urlParts.firstPart.toLowerCase();

            processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
        } else {
            processedUrl = url.toLowerCase();
        }

        return super.parse(processedUrl);
    }
}


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'temperatures', component: TemperatureComponent, canActivate: [AuthGuard], data: { title: 'Customers' } },
    { path: 'lights', component: LightsComponent, canActivate: [AuthGuard], data: { title: 'Products' } },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' } },
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        AuthService,
        AuthGuard,
        { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }]
})
export class AppRoutingModule { }
