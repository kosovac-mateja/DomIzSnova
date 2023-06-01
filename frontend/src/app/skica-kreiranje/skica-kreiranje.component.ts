import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SkicaService } from '../services/skica.service';
import { ObjekatService } from '../services/objekat.service';
import { Dimenzije } from '../models/dimenzije';
import { Koordinata } from '../models/koordinata';
import { Router } from '@angular/router';
import { Skica } from '../models/skica';

@Component({
  selector: 'app-skica-kreiranje',
  templateUrl: './skica-kreiranje.component.html',
  styleUrls: ['./skica-kreiranje.component.css'],
})
export class SkicaKreiranjeComponent implements OnInit {
  constructor(
    private skicaServis: SkicaService,
    private objekatServis: ObjekatService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.tip = sessionStorage.getItem('dodavanjeObjektaTip');
    this.adresa = sessionStorage.getItem('dodavanjeObjektaAdresa');
    this.brProstorija = parseInt(
      sessionStorage.getItem('dodavanjeObjektaBrProstorija')
    );
    this.kvadratura = parseInt(
      sessionStorage.getItem('dodavanjeObjektaKvadratura')
    );
    this.vlasnik = sessionStorage.getItem('korisnik');

    this.kontekst = this.platno.nativeElement.getContext('2d');
  }

  dodajProstorije() {
    this.prostorije = [];
    for (let i = 0; i < this.brProstorija; i++) {
      this.prostorije.push({
        x: i == 0 ? 50 : 50 + this.sumaNiza(this.sirine, i),
        y: i == 0 ? 50 : 50 + this.sumaNiza(this.visine, i),
        sirina: this.sirine[i],
        visina: this.visine[i],
      });
    }

    this.skiciraj();
  }

  skiciraj() {
    this.kontekst.clearRect(
      0,
      0,
      this.platno.nativeElement.width,
      this.platno.nativeElement.height
    );

    this.prostorije.forEach((prostorija, indeks) => {
      this.kontekst.strokeRect(
        prostorija.x,
        prostorija.y,
        prostorija.sirina,
        prostorija.visina
      );
    });
  }

  pocetakPrevlacenja(dogadjaj: MouseEvent) {
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
        this.prevlacenje = true;
        this.izabranaProstorija = i;
        break;
      }
    }
  }

  prevuci(dogadjaj: MouseEvent) {
    if (this.prevlacenje) {
      const prostorija = this.platno.nativeElement.getBoundingClientRect();
      const trenutnoX = dogadjaj.clientX - prostorija.left;
      const trenutnoY = dogadjaj.clientY - prostorija.top;

      const razlikaX = trenutnoX - this.pomerajX;
      const razlikaY = trenutnoY - this.pomerajY;

      const izabranaProstorija = this.prostorije[this.izabranaProstorija];
      const novaPozicijaX = izabranaProstorija.x + razlikaX;
      const novaPozicijaY = izabranaProstorija.y + razlikaY;

      // Provera granica canvasa
      if (
        novaPozicijaX >= 0 &&
        novaPozicijaY >= 0 &&
        novaPozicijaX + izabranaProstorija.sirina <=
          this.platno.nativeElement.width &&
        novaPozicijaY + izabranaProstorija.visina <=
          this.platno.nativeElement.height
      ) {
        izabranaProstorija.x = novaPozicijaX;
        izabranaProstorija.y = novaPozicijaY;
      }

      this.pomerajX = trenutnoX;
      this.pomerajY = trenutnoY;

      //Provera da li se preklapa sa nekom drugom prostorijom
      const preklapanje = this.proveraPreklapanja(izabranaProstorija);
      if (preklapanje !== -1) {
        // Ako se preklapa sa nekom drugom prostorijom, vrati je na staru poziciju
        izabranaProstorija.x -= razlikaX;
        izabranaProstorija.y -= razlikaY;
      }

      this.skiciraj();
    }
  }

  krajPrevlacenja() {
    this.prevlacenje = false;
    this.izabranaProstorija = null;
  }

  proveraPreklapanja(prostorija: any): number {
    for (let i = 0; i < this.prostorije.length; i++) {
      if (i !== this.izabranaProstorija) {
        const ostaleProstorije = this.prostorije[i];
        if (
          prostorija.x < ostaleProstorije.x + ostaleProstorije.sirina &&
          prostorija.x + prostorija.sirina > ostaleProstorije.x &&
          prostorija.y < ostaleProstorije.y + ostaleProstorije.visina &&
          prostorija.y + prostorija.visina > ostaleProstorije.y
        ) {
          return i; // Ima kolizije sa i-tom prostorijom
        }
      }
    }
    return -1; //Nema kolizije
  }

  sumaNiza(niz: number[], n: number): number {
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum += niz[i];
    }

    return sum;
  }

  zavrsi() {
    let koord: Koordinata[] = [];
    let dim: Dimenzije[] = [];

    this.prostorije.forEach((prostorija, indeks) => {
      koord.push({
        x: prostorija.x,
        y: prostorija.y,
      });
      dim.push({
        sirina: prostorija.sirina,
        visina: prostorija.visina,
      });
    });

    this.skicaServis.ubaciSkicu(koord, dim).subscribe((skica: Skica) => {
      let id = skica._id;
      this.objekatServis
        .dodajObjekat(
          this.tip,
          this.adresa,
          this.brProstorija,
          this.kvadratura,
          id,
          this.vlasnik
        )
        .subscribe((objekatId) => {
          alert('Uspešno ste dodali objekat!');
          this.ruter.navigate(['/klijent/objekat']);
        });
    });
  }

  @ViewChild('canvas', { static: true })
  platno: ElementRef<HTMLCanvasElement>;
  kontekst: CanvasRenderingContext2D;

  prostorije: any[] = [];
  //vrata: any[] = [];
  prevlacenje: boolean = false;
  pomerajX: number;
  pomerajY: number;
  izabranaProstorija: number;

  tip: string;
  adresa: string;
  brProstorija: number;
  kvadratura: number;
  vlasnik: string;

  sirine: number[] = [];
  visine: number[] = [];
}
