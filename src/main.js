import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
  } from '@snap/camera-kit';

(async function(){
    var cameraKit = await bootstrapCameraKit({ apiTocken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA3MzMzMTAzLCJzdWIiOiJhZjhiMzcyNS0xZmQwLTQxMTUtYWY5Zi0wNTc0MGI2ZTAwY2N-U1RBR0lOR35jNTMxMzA5OC01NTdjLTQ1N2UtYjQ0Mi0zMmYxOGY1ZjM0YmEifQ.GhvD7ay5uIwOGg0yDltIw8_YNe-mA4O9Xh2GTrzbzc4' });

    const session = await cameraKit.createSession();
    document.getElementById('canvas').replaceWith(session.output.live);

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['c38cb81b-fa45-4f54-be32-d3b773552e30'])

    session.applyLens(lenses[0]);

    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    const source = createMediaStreamSource(mediaStream, {
        transform: Transform2D.MirrorX,
        cameraType: 'front'
    });

    await session.setSource(source);

    session.source.setRenderSize( window.innerWidth,  window.innerHeight);

    session.play();
})();