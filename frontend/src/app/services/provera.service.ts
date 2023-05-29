import { Injectable } from '@angular/core';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root',
})
export class ProveraService {
  constructor(private korisnikServis: KorisnikService) {}

  proveraKorisnickoIme(korisnickoIme: string) {
    if (korisnickoIme.length < 3 || korisnickoIme.length > 20) {
      return 'Korisnicko ime mora imati izmedju 3 i 20 karaktera';
    }

    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(korisnickoIme)) {
      return 'Korisnicko ime moze sadrzati samo slova i brojeve';
    }

    return 'ok';
  }

  proveraLozinka(lozinka: string) {
    if (lozinka.length < 7 || lozinka.length > 12) {
      return 'Lozinka mora imati izmedju 7 i 12 karaktera';
    }

    const prviKarakter = lozinka.charAt(0);
    if (!/[a-zA-Z]/.test(prviKarakter)) {
      return 'Lozinka mora pocinjati slovom';
    }

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&*_\-+=/|:;,.<>?]).*$/;
    if (!regex.test(lozinka)) {
      return 'Lozinka mora sadrzati bar jedno veliko slovo, jedan broj i jedan specijalni karakter';
    }

    return 'ok';
  }

  proveraTelefon(telefon: string) {
    const regex = /^\+\d{11,12}$/;
    if (!regex.test(telefon)) {
      return 'Telefon mora biti u formatu +381xxxxxxxxx';
    }

    return 'ok';
  }

  proveraMejl(mejl: string) {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (!regex.test(mejl)) {
      return 'Neispravno uneta mejl adresa';
    }

    return 'ok';
  }

  proveraIme(ime: string) {
    if (ime.length < 2 || ime.length > 20) {
      return 'Ime mora imati izmedju 2 i 20 karaktera';
    }

    const regex = /^[A-Z][a-zA-Z]+$/;

    if (!regex.test(ime)) {
      return 'Ime mora pocinjati velikim slovom i sme sadrzati samo slova';
    }

    return 'ok';
  }

  proveraPrezime(prezime: string) {
    if (prezime.length < 2 || prezime.length > 20) {
      return 'Prezime mora imati izmedju 2 i 20 karaktera';
    }

    const regex = /^[A-Z][a-zA-Z]+$/;

    if (!regex.test(prezime)) {
      return 'Prezime mora pocinjati velikim slovom i sme sadrzati samo slova';
    }

    return 'ok';
  }

  proveraNazivAgencije(naziv: string) {
    if (naziv.length < 3 || naziv.length > 30) {
      return 'Naziv agencije mora imati izmedju 3 i 30 karaktera';
    }

    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(naziv)) {
      return 'Naziv moze sadrzati samo slova i brojeve';
    }

    return 'ok';
  }

  proveraUlica(ulica: string) {
    if (ulica.length < 3 || ulica.length > 40) {
      return 'Naziv ulice mora imati izmedju 3 i 40 karaktera';
    }

    const regex = /^[A-Z][a-zA-Z\s]+ \d{1,4}[A-Z]{0,2}$/;
    if (!regex.test(ulica)) {
      return 'Neispravno unet naziv ulice';
    }

    return 'ok';
  }

  proveraGrad(grad: string) {
    if (grad.length < 2 || grad.length > 30) {
      return 'Naziv grada mora imati izmedju 2 i 30 karaktera';
    }

    const regex = /^[A-Z][a-zA-Z\s]+$/;
    if (!regex.test(grad)) {
      return 'Neispravno unet naziv grada';
    }

    return 'ok';
  }

  proveraDrzava(drzava: string) {
    if (drzava.length < 2 || drzava.length > 30) {
      return 'Naziv drzave mora imati izmedju 2 i 30 karaktera';
    }

    const regex = /^[A-Z][a-zA-Z\s]+$/;
    if (!regex.test(drzava)) {
      return 'Neispravno unet naziv drzave';
    }

    return 'ok';
  }

  proveraMaticniBroj(maticniBroj: string) {
    if (maticniBroj.length != 8) {
      return 'Maticni broj mora imati tacno 8 cifara';
    }

    const regex = /^\d{8}$/;
    if (!regex.test(maticniBroj)) {
      return 'Maticni broj moze sadrzati samo cifre';
    }

    return 'ok';
  }

  async proveraKlijent(klijent) {
    if (this.proveraKorisnickoIme(klijent.korisnickoIme) != 'ok') {
      return this.proveraKorisnickoIme(klijent.korisnickoIme);
    }
    if (
      (await this.korisnikServis.korisnikPostoji(klijent.korisnickoIme)) == true
    ) {
      return 'Korisnicko ime vec postoji';
    }
    if (this.proveraLozinka(klijent.lozinka) != 'ok') {
      return this.proveraLozinka(klijent.lozinka);
    }
    if (this.proveraTelefon(klijent.telefon) != 'ok') {
      return this.proveraTelefon(klijent.telefon);
    }
    if (this.proveraMejl(klijent.mejl) != 'ok') {
      return this.proveraMejl(klijent.mejl);
    }
    if (this.proveraIme(klijent.ime) != 'ok') {
      return this.proveraIme(klijent.ime);
    }
    if (this.proveraPrezime(klijent.prezime) != 'ok') {
      return this.proveraPrezime(klijent.prezime);
    }

    return 'ok';
  }

  async proveraAgencija(agencija) {
    if (this.proveraKorisnickoIme(agencija.korisnickoIme) != 'ok') {
      return this.proveraKorisnickoIme(agencija.korisnickoIme);
    }
    if (
      (await this.korisnikServis.korisnikPostoji(agencija.korisnickoIme)) ==
      true
    ) {
      return 'Korisnicko ime vec postoji';
    }
    if (this.proveraLozinka(agencija.lozinka) != 'ok') {
      return this.proveraLozinka(agencija.lozinka);
    }
    if (this.proveraTelefon(agencija.telefon) != 'ok') {
      return this.proveraTelefon(agencija.telefon);
    }
    if (this.proveraMejl(agencija.mejl) != 'ok') {
      return this.proveraMejl(agencija.mejl);
    }
    if (this.proveraNazivAgencije(agencija.naziv) != 'ok') {
      return this.proveraNazivAgencije(agencija.naziv);
    }
    if (this.proveraUlica(agencija.ulica) != 'ok') {
      return this.proveraUlica(agencija.ulica);
    }
    if (this.proveraGrad(agencija.grad) != 'ok') {
      return this.proveraGrad(agencija.grad);
    }
    if (this.proveraDrzava(agencija.drzava) != 'ok') {
      return this.proveraDrzava(agencija.drzava);
    }
    if (this.proveraMaticniBroj(agencija.maticniBroj) != 'ok') {
      return this.proveraMaticniBroj(agencija.maticniBroj);
    }

    return 'ok';
  }
}