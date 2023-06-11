import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Skica } from '../models/skica';
import { SkicaService } from '../services/skica.service';
import { PosaoService } from '../services/posao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skica-klijent',
  templateUrl: './skica-klijent.component.html',
  styleUrls: ['./skica-klijent.component.css'],
})
export class SkicaKlijentComponent implements OnInit {
  constructor(
    private skicaServis: SkicaService,
    private posaoServis: PosaoService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.kontekst = this.platno.nativeElement.getContext('2d');
    this.idPosao = sessionStorage.getItem('idPosao');
    this.posaoServis.zahtevPostoji(this.idPosao).subscribe((res) => {
      if (res['poruka'] == 'postoji') {
        this.otkazan = true;
      }
    });
    this.skicaServis
      .dohvatiSkicu(sessionStorage.getItem('idSkica'))
      .subscribe((skica: Skica) => {
        this.skica = skica;
        for (let i = 0; i < skica.koordinate.length; i++) {
          this.prostorije.push({
            x: skica.koordinate[i].x,
            y: skica.koordinate[i].y,
            sirina: skica.dimenzije[i].sirina,
            visina: skica.dimenzije[i].visina,
            boja: skica.boje[i],
          });
          this.vrata.push({
            x: skica.koordinateVrata[i].x,
            y: skica.koordinateVrata[i].y,
          });
          if (skica.boje[i] != 'green') this.sveZavrseno = false;
        }
        this.skiciraj();
      });
  }

  skiciraj() {
    this.kontekst.clearRect(
      0,
      0,
      this.platno.nativeElement.width,
      this.platno.nativeElement.height
    );

    this.prostorije.forEach((prostorija) => {
      this.kontekst.strokeStyle = 'black';
      this.kontekst.lineWidth = 2;
      this.kontekst.strokeRect(
        prostorija.x,
        prostorija.y,
        prostorija.sirina,
        prostorija.visina
      );
      this.kontekst.fillStyle = prostorija.boja;
      this.kontekst.fillRect(
        prostorija.x + this.kontekst.lineWidth / 2,
        prostorija.y + this.kontekst.lineWidth / 2,
        prostorija.sirina - this.kontekst.lineWidth,
        prostorija.visina - this.kontekst.lineWidth
      );
    });

    this.vrata.forEach((vrata, indeks) => {
      this.kontekst.fillStyle = 'brown';
      this.kontekst.fillRect(vrata.x, vrata.y, 10, 20);
    });
  }

  otkaziPosao() {
    this.posaoServis.otkaziPosao(this.idPosao, this.razlog).subscribe((res) => {
      alert('Zahtev za otkazivanja posla je poslat.');
    });
  }

  zavrsiPosao() {
    this.posaoServis
      .azurirajPodatak(this.idPosao, 'status', 'zavrsen')
      .subscribe((res) => {
        alert('Posao je uspesno zavrsen.');
        this.ruter.navigate(['/klijent/poslovi']);
      });
  }

  @ViewChild('canvas', { static: true })
  platno: ElementRef<HTMLCanvasElement>;
  kontekst: CanvasRenderingContext2D;

  skica: Skica = new Skica();
  prostorije: any[] = [];
  vrata: any[] = [];
  sveZavrseno: boolean = true;
  otkazan: boolean = false;
  idPosao: string = '';
  razlog = '';
}
