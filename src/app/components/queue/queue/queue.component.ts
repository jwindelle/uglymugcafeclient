import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../../app/services/signal-r.service';
import { SignalViewModel } from '../../../../app/models/signal-view-model';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  signalList: SignalViewModel[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit()
  {
    this.signalRService.signalReceived.subscribe((signal:SignalViewModel)=>{
      this.signalList.push(signal);
    })
  }

}
