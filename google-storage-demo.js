const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'goittest';
const filePath = './tmp/c47b94b3-7a8a-497f-8416-24ea5199b97b.png';
const destFileName = 'c47b94b3-7a8a-497f-8416-24ea5199b97b.png';

// const downloadFilePath = 'c47b94b3-7a8a-497f-8416-24ea5199b97b.png';
// const downloadDestination = '/tmp/downloaded_image.png';

async function launchDemo() {
  // Uploading
  await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
};

    // Downloads the file
  // await storage.bucket(bucketName).file(downloadFilePath).download({
  //   destination: downloadDestination
  // });
      
  //   console.log(
  //     `gs://${bucketName}/${downloadFilePath} downloaded to ${downloadDestination}.`
  //   );
  // }

launchDemo()
    .catch(console.error);
