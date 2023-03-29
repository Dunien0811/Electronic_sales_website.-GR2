import { storage } from '../firebase';


export async function uploadImage(image) {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
      },
      (error) => {
        // error function ....
        reject(error)
      },
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          resolve(url);
        })
      });
  })
}

