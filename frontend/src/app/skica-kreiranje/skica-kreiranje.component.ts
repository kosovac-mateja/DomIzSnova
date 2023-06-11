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
    this.dodavanjeProstorija = true;
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
  dodajVrata() {
    this.dodavanjeVrata = true;
    this.dodavanjeProstorija = false;
    this.vrata = [];
    for (let i = 0; i < this.brProstorija; i++) {
      this.vrata.push({
        x: this.prostorije[i].x + this.prostorije[i].sirina / 2,
        y: this.prostorije[i].y + this.prostorije[i].visina / 2,
        sirina: 10,
        visina: 20,
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
      this.kontekst.strokeStyle = 'black';
      this.kontekst.lineWidth = 2;
      this.kontekst.strokeRect(
        prostorija.x,
        prostorija.y,
        prostorija.sirina,
        prostorija.visina
      );
    });

    this.vrata.forEach((vrata, indeks) => {
      this.kontekst.fillStyle = 'brown';
      this.kontekst.fillRect(vrata.x, vrata.y, vrata.sirina, vrata.visina);
    });
  }

  pocetakPrevlacenja(dogadjaj: MouseEvent) {
    const prostorija = this.platno.nativeElement.getBoundingClientRect();
    this.pomerajX = dogadjaj.clientX - prostorija.left;
    this.pomerajY = dogadjaj.clientY - prostorija.top;

    if (this.dodavanjeProstorija) {
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
    } else if (this.dodavanjeVrata) {
      for (let i = 0; i < this.vrata.length; i++) {
        const vrata = this.vrata[i];
        if (
          this.pomerajX >= vrata.x &&
          this.pomerajX <= vrata.x + vrata.sirina &&
          this.pomerajY >= vrata.y &&
          this.pomerajY <= vrata.y + vrata.visina
        ) {
          this.prevlacenje = true;
          this.izabranaVrata = i;
          break;
        }
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

      if (this.dodavanjeProstorija) {
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
      } else if (this.dodajVrata) {
        const izabranaVrata = this.vrata[this.izabranaVrata];
        const novaPozicijaX = izabranaVrata.x + razlikaX;
        const novaPozicijaY = izabranaVrata.y + razlikaY;

        izabranaVrata.x = novaPozicijaX;
        izabranaVrata.y = novaPozicijaY;

        this.pomerajX = trenutnoX;
        this.pomerajY = trenutnoY;

        const preklapanje = this.proveraPreklapanja(izabranaVrata);
        if (preklapanje !== -1) {
          // Ako se preklapa sa nekom drugom prostorijom, vrati je na staru poziciju
          izabranaVrata.x -= razlikaX;
          izabranaVrata.y -= razlikaY;
        }
      }

      this.skiciraj();
    }
  }

  krajPrevlacenja() {
    this.prevlacenje = false;
    this.izabranaProstorija = null;
    //this.izabranaVrata = null;
  }

  proveraPreklapanja(prostorija: any): number {
    if (this.dodavanjeProstorija) {
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
    } else if (this.dodavanjeVrata) {
      for (let i = 0; i < this.prostorije.length; i++) {
        if (i == this.izabranaVrata) {
          const ostaleProstorije = this.prostorije[i];
          if (
            prostorija.x + prostorija.sirina >
              ostaleProstorije.x + ostaleProstorije.sirina ||
            prostorija.x < ostaleProstorije.x ||
            prostorija.y + prostorija.visina >
              ostaleProstorije.y + ostaleProstorije.visina ||
            prostorija.y < ostaleProstorije.y
          ) {
            return i; // Ima kolizije sa i-tom prostorijom
          }
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
    let boje: string[] = [];
    let koordinateVrata = [];

    this.prostorije.forEach((prostorija, indeks) => {
      koord.push({
        x: prostorija.x,
        y: prostorija.y,
      });
      dim.push({
        sirina: prostorija.sirina,
        visina: prostorija.visina,
      });
      boje.push('white');
      koordinateVrata.push({
        x: this.vrata[indeks].x,
        y: this.vrata[indeks].y,
      });
    });

    this.skicaServis
      .ubaciSkicu(koord, dim, boje, koordinateVrata)
      .subscribe((skica: Skica) => {
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

  prostorijeSeDodiruju() {
    if (!this.dodavanjeProstorija) return false;
    if (this.prostorije.length == 1) return true;

    for (let i = 0; i < this.prostorije.length; i++) {
      const trenutnaProstorija = this.prostorije[i];
      let dodirujuSe = false;

      for (let j = 0; j < this.prostorije.length; j++) {
        if (i !== j) {
          const drugaProstorija = this.prostorije[j];
          if (
            trenutnaProstorija.x - 1 <
              drugaProstorija.x + drugaProstorija.sirina &&
            trenutnaProstorija.x + trenutnaProstorija.sirina + 1 >
              drugaProstorija.x &&
            trenutnaProstorija.y - 1 <
              drugaProstorija.y + drugaProstorija.visina &&
            trenutnaProstorija.y + trenutnaProstorija.visina + 1 >
              drugaProstorija.y
          ) {
            dodirujuSe = true;
            break;
          }
        }
      }

      if (!dodirujuSe) {
        return false;
      }
    }

    return true;
  }

  vrataDodirujuProstorije() {
    if (!this.dodavanjeVrata) return false;

    for (let i = 0; i < this.vrata.length; i++) {
      const trenutnaVrata = this.vrata[i];
      let dodirujuSe = false;

      const trenutnaProstorija = this.prostorije[i];
      if (
        trenutnaVrata.x + trenutnaVrata.sirina + 1 >
          trenutnaProstorija.x + trenutnaProstorija.sirina ||
        trenutnaVrata.x - 1 < trenutnaProstorija.x ||
        trenutnaVrata.y + trenutnaVrata.visina + 1 >
          trenutnaProstorija.y + trenutnaProstorija.visina ||
        trenutnaVrata.y - 1 < trenutnaProstorija.y
      ) {
        dodirujuSe = true;
      }

      if (!dodirujuSe) {
        return false;
      }
    }

    return true;
  }

  @ViewChild('canvas', { static: true })
  platno: ElementRef<HTMLCanvasElement>;
  kontekst: CanvasRenderingContext2D;

  prostorije: any[] = [];
  vrata: any[] = [];
  prevlacenje: boolean = false;
  pomerajX: number;
  pomerajY: number;
  izabranaProstorija: number;
  izabranaVrata: number;

  tip: string;
  adresa: string;
  brProstorija: number;
  kvadratura: number;
  vlasnik: string;

  sirine: number[] = [100, 100, 100];
  visine: number[] = [100, 100, 100];

  dodavanjeProstorija: boolean = false;
  dodavanjeVrata: boolean = false;
}
