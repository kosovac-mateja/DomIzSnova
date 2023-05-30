import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-skica-kreiranje',
  templateUrl: './skica-kreiranje.component.html',
  styleUrls: ['./skica-kreiranje.component.css'],
})
export class SkicaKreiranjeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.tip = localStorage.getItem('dodavanjeObjektaTip');
    this.adresa = localStorage.getItem('dodavanjeObjektaAdresa');
    this.brProstorija = parseInt(
      localStorage.getItem('dodavanjeObjektaBrProstorija')
    );
    this.kvadratura = parseInt(
      localStorage.getItem('dodavanjeObjektaKvadratura')
    );
    this.context = this.canvas.nativeElement.getContext('2d');

    this.rectangles = [
      { x: 50, y: 50, width: 100, height: 50 },
      { x: 150, y: 150, width: 100, height: 50 },
      { x: 250, y: 250, width: 100, height: 50 },
    ];

    // Draw the rectangles
    this.drawRectangles();
  }

  drawRectangles() {
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.rectangles.forEach((rectangle, index) => {
      this.context.strokeRect(
        rectangle.x,
        rectangle.y,
        rectangle.width,
        rectangle.height
      );
      // Draw a red border around the selected rectangle
      if (index === this.selectedRectangleIndex) {
        this.context.strokeRect(
          rectangle.x - 2,
          rectangle.y - 2,
          rectangle.width + 4,
          rectangle.height + 4
        );
      }
    });
  }

  startDragging(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    // Check if the click is inside any of the rectangles
    for (let i = 0; i < this.rectangles.length; i++) {
      const rectangle = this.rectangles[i];
      if (
        this.offsetX >= rectangle.x &&
        this.offsetX <= rectangle.x + rectangle.width &&
        this.offsetY >= rectangle.y &&
        this.offsetY <= rectangle.y + rectangle.height
      ) {
        this.isDragging = true;
        this.selectedRectangleIndex = i;
        break;
      }
    }
  }

  dragRectangle(event: MouseEvent) {
    if (this.isDragging) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      const deltaX = currentX - this.offsetX;
      const deltaY = currentY - this.offsetY;

      const selectedRectangle = this.rectangles[this.selectedRectangleIndex];
      selectedRectangle.x += deltaX;
      selectedRectangle.y += deltaY;

      this.offsetX = currentX;
      this.offsetY = currentY;

      // Check for collision with other rectangles
      const collidingIndex = this.checkCollision(selectedRectangle);
      if (collidingIndex !== -1) {
        // If collision occurs, revert the position of the selected rectangle
        selectedRectangle.x -= deltaX;
        selectedRectangle.y -= deltaY;
      }

      this.drawRectangles();
    }
  }

  stopDragging() {
    this.isDragging = false;
    this.selectedRectangleIndex = null;
  }

  checkCollision(rectangle: any): number {
    for (let i = 0; i < this.rectangles.length; i++) {
      if (i !== this.selectedRectangleIndex) {
        const otherRectangle = this.rectangles[i];
        if (
          rectangle.x < otherRectangle.x + otherRectangle.width &&
          rectangle.x + rectangle.width > otherRectangle.x &&
          rectangle.y < otherRectangle.y + otherRectangle.height &&
          rectangle.y + rectangle.height > otherRectangle.y
        ) {
          return i; // Collision occurred with the rectangle at index i
        }
      }
    }
    return -1; // No collision
  }

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  rectangles: any[] = [];
  isDragging: boolean = false;
  offsetX: number;
  offsetY: number;
  selectedRectangleIndex: number;

  tip: string;
  adresa: string;
  brProstorija: number;
  kvadratura: number;

  sirina1: number;
  visina1: number;

  sirina2: number;
  visina2: number;

  sirina3: number;
  visina3: number;
}
