import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Skica } from '../models/skica';
import { SkicaService } from '../services/skica.service';
import { RadnikService } from '../services/radnik.service';
import { Radnik } from '../models/radnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skica-agencija',
  templateUrl: './skica-agencija.component.html',
  styleUrls: ['./skica-agencija.component.css'],
})
export class SkicaAgencijaComponent implements OnInit {
  constructor(
    private skicaServis: SkicaService,
    private radnikServis: RadnikService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.kontekst = this.platno.nativeElement.getContext('2d');
    this.skicaServis
      .dohvatiSkicu(sessionStorage.getItem('idSkica'))
      .subscribe((skica: Skica) => {
        this.skica = skica;
        this.radnikServis
          .dohvatiDostupneRadnike(sessionStorage.getItem('korisnik'))
          .subscribe((radnici: Radnik[]) => {
            this.radniciSlobodni = radnici;
            this.radnikServis
              .dohvatiRadnikeNaPoslu(sessionStorage.getItem('idPosao'))
              .subscribe((radnici: Radnik[]) => {
                this.radniciPosao = radnici;
                let dovoljnoRadnika =
                  this.radniciPosao.length + this.radniciSlobodni.length >=
                  this.skica.koordinate.length;

                for (let i = 0; i < skica.koordinate.length; i++) {
                  this.prostorije.push({
                    x: skica.koordinate[i].x,
                    y: skica.koordinate[i].y,
                    sirina: skica.dimenzije[i].sirina,
                    visina: skica.dimenzije[i].visina,
                    boja: dovoljnoRadnika ? skica.boje[i] : 'yellow',
                  });
                  this.vrata.push({
                    x: skica.koordinateVrata[i].x,
                    y: skica.koordinateVrata[i].y,
                  });
                }
                this.skiciraj();
              });
          });
      });
  }

  skiciraj() {
    this.kontekst.clearRect(
      0,
      0,
      this.platno.nativeElement.width,
      this.platno.nativeElement.height
    );

    this.prostorije.forEach((prostorija, indeks) => {
      if (indeks !== this.izabranaProstorija) {
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
      }
    });

    if (this.izabranaProstorija !== null) {
      const izabrana = this.prostorije[this.izabranaProstorija];
      this.kontekst.strokeStyle = 'black';
      this.kontekst.lineWidth = 5;
      this.kontekst.strokeRect(
        izabrana.x,
        izabrana.y,
        izabrana.sirina,
        izabrana.visina
      );
      this.kontekst.fillStyle = izabrana.boja;
      this.kontekst.fillRect(
        izabrana.x + this.kontekst.lineWidth / 2,
        izabrana.y + this.kontekst.lineWidth / 2,
        izabrana.sirina - this.kontekst.lineWidth,
        izabrana.visina - this.kontekst.lineWidth
      );
    }

    this.vrata.forEach((vrata, indeks) => {
      this.kontekst.fillStyle = 'brown';
      this.kontekst.fillRect(vrata.x, vrata.y, 10, 20);
    });
  }

  izaberiProstoriju(dogadjaj: MouseEvent) {
    const prostorija = this.platno.nativeElement.getBoundingClientRect();
    this.pomerajX = dogadjaj.clientX - prostorija.left;
    this.pomerajY = dogadjaj.clientY - prostorija.top;

    // Provera da li je klik unutar neke prostorije
    for (let i = 0; i < this.prostorije.length; i++) {
      const prostorija = this.prostorije[i];
      if (
        this.pomerajX >= prostorija.x &&
        this.pomerajX <= prostorija.x + prostorija.sirina &&
        this.pomerajY >= prostorija.y &&
        this.pomerajY <= prostorija.y + prostorija.visina
      ) {
        console.log('Kliknuto je unutar prostorije ' + i);
        this.izabranaProstorija = i;
        break;
      }
    }
    this.skiciraj();
  }

  dodajRadnika(radnik: Radnik) {
    this.radnikServis
      .azurirajPosaoRadnika(radnik._id, sessionStorage.getItem('idPosao'))
      .subscribe((radnik: Radnik) => {
        window.location.reload();
      });
  }

  napredak() {
    let trenutnaBoja = this.prostorije[this.izabranaProstorija].boja;
    this.prostorije[this.izabranaProstorija].boja =
      trenutnaBoja == 'white' ? 'red' : 'green';
    let noveBoje = [];

    let zavrsenoProstorija = 0;
    this.prostorije.forEach((prostorija, indeks) => {
      noveBoje.push(prostorija.boja);
      if (prostorija.boja == 'green') {
        zavrsenoProstorija++;
      }
    });

    this.skicaServis
      .promeniBoju(this.skica._id, noveBoje)
      .subscribe((skica: Skica) => {
        if (zavrsenoProstorija == this.prostorije.length) {
          this.radniciPosao.forEach((radnik) => {
            this.radnikServis
              .azurirajPosaoRadnika(radnik._id, null)
              .subscribe((res) => {
                window.location.reload();
              });
          });
        } else {
          window.location.reload();
        }
      });
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  @ViewChild('canvas', { static: true })
  platno: ElementRef<HTMLCanvasElement>;
  kontekst: CanvasRenderingContext2D;

  skica: Skica = new Skica();
  prostorije: any[] = [];
  vrata: any[] = [];
  izabranaProstorija: number = null;
  pomerajX: number;
  pomerajY: number;

  radniciSlobodni: Radnik[] = [];
  radniciPosao: Radnik[] = [];
}
