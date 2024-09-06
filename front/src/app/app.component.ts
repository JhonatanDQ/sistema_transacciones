import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule,RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Pagina';


}
