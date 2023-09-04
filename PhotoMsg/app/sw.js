

//import google workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
//Allow new SW to take over
workbox.skipWaiting();
workbox.clientsClaim();