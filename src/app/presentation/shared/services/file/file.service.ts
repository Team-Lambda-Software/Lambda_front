import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64Model } from '../../interfaces/base64.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  async getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);

        video.onloadedmetadata = () => {
            const duration = video.duration;
            resolve(duration);
        };

        video.onerror = (error) => {
            reject(error);
        };
    });
}

  public async convertFileToBase64(event: any): Promise<Base64Model> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve({
            model: base64String,
          });
        };
        reader.onerror = (error) => {
          reject({
            model: null,
          });
        };
      } catch (error) {
        reject({
          model: null,
        });
      }
    });
  }

  constructor(private sanitizer:DomSanitizer) { }

}
