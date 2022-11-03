import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-iframes',
  templateUrl: './iframes.component.html',
  styleUrls: ['./iframes.component.scss'],
})
export class IframesComponent implements OnInit, AfterViewInit {

  baseUrl = environment.apiGestorDocumental;
  
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<IframesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 1800);
  }

  ngOnInit() {
    this.spinner.show();
    this.VerDocumento(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  VerDocumento(link: string) {

    var xhr = new XMLHttpRequest();
    xhr.open( 'GET',`${this.baseUrl}CodigoMedico/GetFileCodigoMedico?nombre=${link}`,true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {

        if (this.status === 200) { 
          // Create the Blob URL:
          var buffer = xhr.response;
          var blob = new Blob([buffer], {
            type: 'application/pdf',
          });
          var objectURL =  window.URL.createObjectURL(blob);    
          // Create an iframe to demonstrate it:
          var iframe = document.createElement('iframe');
          iframe.className = 'sample-iframe';
          iframe.src = objectURL;
          iframe.setAttribute('pluginspage','http://www.adobe.com/products/acrobat/readstep2.html');
          iframe.setAttribute("alt", "pdf");
          document.body.appendChild(iframe);
          var div = document.getElementById('DocumentoPdf');
          div?.appendChild(iframe);
        }
    };
    xhr.send();
  }
}
