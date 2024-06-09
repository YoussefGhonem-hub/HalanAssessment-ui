// src/app/components/ticket/ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket',
  standalone: true,
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [TicketService],
  imports: [CommonModule, FormsModule],

})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [];
  pageNumber = 1;
  pageSize = 5;
  newTicket: Partial<Ticket> = {};
  governorates: string[] = ['Governorate1', 'Governorate2', 'Governorate3'];
  cities: string[] = ['City1', 'City2', 'City3'];
  districts: string[] = ['District1', 'District2', 'District3'];
  constructor(private ticketService: TicketService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.pageNumber, this.pageSize).subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  handleTicket(id: number): void {
    this.ticketService.handleTicket(id).subscribe(() => {
      this.loadTickets();
    });
  }

  getColor(ticket: Ticket): string {
    const minutesAgo = (new Date().getTime() - new Date(ticket.creationDateTime).getTime()) / 60000;
    if (minutesAgo >= 60) return 'red';
    if (minutesAgo >= 45) return 'blue';
    if (minutesAgo >= 30) return 'green';
    if (minutesAgo >= 15) return 'yellow';
    return 'white';
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => this.createTicket(),
      () => { }
    );
  }

  createTicket(): void {
    this.ticketService.createTicket(this.newTicket).subscribe(() => {
      this.loadTickets();
    });
  }
}
