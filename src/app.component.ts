import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ProgressBar } from '@syncfusion/ej2-progressbar';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [ProgressBarAllModule],
})
export class AppComponent {
  public type3: string = 'Linear';
  public height3: string = '1px';
  public min3: number = 0;
  public max3: number = 10;
  public value3: number = 3;
  public segmentCount3: number = 5;
  public segmentColor: string[] = [
    '#F97066',
    '#F38744',
    '#FEC84B',
    '#ACDC79',
    '#17B26A',
  ];

  @ViewChild('linear3') public linear3: ProgressBar;

  public load(args: ILoadedEventArgs): void {
    args.progressBar.segmentColor = this.segmentColor;

    // Calculate the width of each segment
    const segmentWidth = 100 / this.segmentCount3;

    // Create segments filled with their corresponding colors
    const progressBarElement = document.getElementById('linear3');
    if (progressBarElement) {
      this.segmentColor.forEach((color, index) => {
        const segment = document.createElement('div');
        segment.style.position = 'absolute';
        segment.style.top = '0';
        segment.style.left = `${index * segmentWidth}%`;
        segment.style.width = `${segmentWidth}%`;
        segment.style.height = '100%';
        segment.style.backgroundColor = color;
        progressBarElement.appendChild(segment);
      });

      // Place the dot at the correct position
      const totalSegments = this.segmentCount3;
      const segmentLength = (this.max3 - this.min3) / totalSegments;
      const segmentIndex = Math.floor(this.value3 / segmentLength);
      const segmentFraction = (this.value3 % segmentLength) / segmentLength;
      const dotPosition =
        ((segmentIndex + segmentFraction) / totalSegments) * 100;

      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.top = '50%';
      dot.style.left = `calc(${dotPosition}% - 2px)`; // Adjust the dot's position slightly
      dot.style.transform = 'translate(-50%, -50%)';
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.backgroundColor = this.segmentColor[segmentIndex]; // Set the dot's color to match the segment
      dot.style.borderRadius = '50%';
      dot.style.border = '4px solid white'; // Add a white border
      progressBarElement.appendChild(dot);
    }
  }
}
