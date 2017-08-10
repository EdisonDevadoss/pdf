import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
     private file:File,
    private fileOpener: FileOpener) {

  }
  pdfmake(){
    let docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

     pdfMake.vfs = pdfFonts.pdfMake.vfs;
     
     pdfMake.createPdf(docDefinition).getBlob(buffer =>{
       this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
       .then(dirEntry =>{
         alert("File Save Succesfully" + dirEntry.toURL())
         this.file.getFile(dirEntry, 'myFile.pdf', {create: true})
        .then(fileEntry =>{
          fileEntry.createWriter(writer =>{
            writer.onwrite = () =>{
              this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
              .then(res => {
                console.log("success" +res)
              })
            }
          })
        })
       })
       
     })

    // doc.getBase64((data)=>{
    //   window.location.href = 'data:application/pdf;base64,' + data;
    //   console.log(data)
    // });

    //console.log('You pressed the button');

    console.log('pdfmake', pdfMake);
    console.log('vfs', pdfMake.vfs);
  }

}
