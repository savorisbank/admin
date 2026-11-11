importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({apiKey:"AIzaSyDVFYbO6tJq7XH-KgJUtEqkYTyUO07GsgU",authDomain:"savoris-bank.firebaseapp.com",projectId:"savoris-bank",storageBucket:"savoris-bank.firebasestorage.app",messagingSenderId:"1060142383019",appId:"1:1060142383019:web:c07853d66a507098f2dcee"});
const messaging = firebase.messaging();

/* Notification reçue quand le site est fermé ou en arrière-plan */
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || "Savoris Bank", {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || undefined,
    data: { url: d.url || "./espace.html" }
  });
});

/* Clic sur la notification : ouvre ou ramène l'espace */
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || "./", self.registration.scope).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) { if (c.url.split("?")[0] === target.split("?")[0] && "focus" in c) return c.focus(); }
      return clients.openWindow(target);
    })
  );
});
