export class Resolver {
    public cameraIP: string;

    constructor(ip: string) { 
        this.cameraIP = ip;
    };

    resolve(action: string, ...args: any[]) {
        const base = `http://${this.cameraIP}`;
        const routes = {
            // Pan & Tilt
            'up':       (panspeed: number, tiltspeed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&up&${panspeed}&${tiltspeed}`,
            'down':     (panspeed: number, tiltspeed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&down&${panspeed}&${tiltspeed}`,
            'left':     (panspeed: number, tiltspeed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&left&${panspeed}&${tiltspeed}`,
            'right':    (panspeed: number, tiltspeed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&right&${panspeed}&${tiltspeed}`,
            'ptzstop':  ()     => `/cgi-bin/ptzctrl.cgi?ptzcmd&ptzstop`,

            // Zoom
            'zoomin':   (speed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&zoomin&${speed}`,
            'zoomout':  (speed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&zoomout&${speed}`,
            'zoomstop': ()     => `/cgi-bin/ptzctrl.cgi?ptzcmd&zoomstop`,

            // Focus
            'focusin':   (speed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&focusin&${speed}`,
            'focusout':  (speed: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&focusout&${speed}`,
            'focusstop': ()     => `/cgi-bin/ptzctrl.cgi?ptzcmd&focusstop`,

            // Focus Lock
            'lock':    () => `/cgi-bin/param.cgi?ptzcmd&lock_mfocus`,
            'unlock':  () => `/cgi-bin/param.cgi?ptzcmd&unlock_mfocus`,

            // Home
            'home':    () => `/cgi-bin/ptzctrl.cgi?ptzcmd&home`,

            // PT Reset
            'reset':   () => `/cgi-bin/param.cgi?pan_tiltdrive_reset`,

            // Preset
            'posset':  (num: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&posset&${num}`,
            'poscall': (num: number) => `/cgi-bin/ptzctrl.cgi?ptzcmd&poscall&${num}`,

            // Direct Position Recall
            'recall': (mode: number, panSpeed: number, tiltSpeed: number, panPos: number, tiltPos: number) =>
            `/cgi-bin/ptzctrl.cgi?ptzcmd&${mode}&${panSpeed}&${tiltSpeed}&${panPos}&${tiltPos}`,

            // Direct Zoom Recall
            'zoomto': (speed: number, position: number) =>
            `/cgi-bin/ptzctrl.cgi?ptzcmd&zoomto&${speed}&${position}`,

            // Image Adjustment
            'imgset': (mode: number, level: number) =>
            `/cgi-bin/param.cgi?post_image_value&${mode}&${level}`,

            // Image Flip/Mirror
            'imgori': (mode: number, state: number) =>
            `/cgi-bin/param.cgi?post_image_value&${mode}&${state}`,

            // Reset image settings
            'imgreset': () =>
            `/cgi-bin/param.cgi?get_image_default_conf`,

            // JPEG Snapshot
            'snapshot': () =>
            `/snapshot.jpg`,
            'setres': (size: number) =>
            `/cgi-bin/snapshot.cgi?post_snapshot_conf&resolution=${size}`,

            // Photo booth
            'photo': (delay: number) =>
            `/cgi-bin/booth.cgi?0&4&${delay}&photo&0`,
            'photo_dl': (num: number) =>
            `/photo${num}.jpg`,

            // Video booth
            'video': (delay: number, length: number) =>
            `/cgi-bin/booth.cgi?0&4&${delay}&video&${length}`,
            'video_dl': (num: number) =>
            `/video${num}.mp4`,

            // Info
            'get_video': () => `/cgi-bin/param.cgi?get_media_video`,
            'get_audio': () => `/cgi-bin/param.cgi?get_media_audio`,
            'get_net':   () => `/cgi-bin/param.cgi?get_network_conf`,
            'get_info':  () => `/cgi-bin/param.cgi?get_device_conf`,
            'get_sn':    () => `/cgi-bin/param.cgi?get_serial_number`
        };
        
        // Convert action to lowercase to make it case-insensitive
        const actionLower = action.toLowerCase();
        
        if (!(actionLower in routes)) {
            throw new Error(`Unknown action: ${action}`);
        }
        
        return base + routes[actionLower](...args); // URL is now in lowercase
    }
}
