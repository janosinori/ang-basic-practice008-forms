import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
  animations: [
/*     
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ]),
 */    
    trigger('errorHidden', [
      state('error', style({
        opacity: 1,
//        backgroundColor: 'yellow'
      })),
      state('hidden', style({
        display: 'none',
      })),
      transition('hidden => *', [
        style({ display: 'block', opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition('* => hidden', [
        animate(100, style({ transform: 'translateY(100%)' }))
      ]),
    ]),
  ],
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => this.eventService.get(params.id) )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onUpdate(form: NgForm, event: Event): void {
    if (event.id){
    this.eventService.update(event).subscribe(
      ev => this.router.navigate([''])
    )
    }
    else{
      this.eventService.create(event).subscribe(
        ev => this.router.navigate([''])
      )
    }
  }

}
