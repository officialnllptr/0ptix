import VideoStream from 'node-rtsp-stream';

let started = false;

export async function handle({ event, resolve }) {
  if (!started) {
    new VideoStream({
      name: 'cam',
      streamUrl: 'rtsp://192.168.0.190/1',
      wsPort: 9999,
      ffmpegOptions: {
        '-stats': '',
        '-r': 25
      }
    });
    started = true;
    console.log("RTSP Stream started");
  }

  return resolve(event);
}