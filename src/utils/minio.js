import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "3kfQRc1jAPOmJm0VHYsv",
  secretKey: "NjzziYWmVI9pQqyj9wrsygrTZCrKwQ5JTuSqyHoO",
});

export function getImageUrl(objectUrl) {
  return new Promise((resolve, reject) => {
    minioClient.presignedUrl("GET", "streetart", objectUrl, 24 * 60 * 60, (err, url) => {
      if (err) {
        console.error(err);
        reject(err); // Reject the promise if there is an error
        return;
      }
      resolve(url); // Resolve the promise with the URL
    });
  });
}
