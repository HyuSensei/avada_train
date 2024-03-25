function firebaseConfigToEnvFile(config) {
  const {apiKey, authDomain, projectId, storageBucket, appId, measurementId} = config;
  return `VITE_SHOPIFY_API_KEY=
    VITE_FIREBASE_API_KEY=${apiKey}
    VITE_FIREBASE_AUTH_DOMAIN=${authDomain}
    VITE_FIREBASE_PROJECT_ID=${projectId}
    VITE_FIREBASE_STORAGE_BUCKET=${storageBucket}
    VITE_FIREBASE_APP_ID=${appId}
    VITE_FIREBASE_MEASUREMENT_ID=${measurementId}
    `;
}

console.log(
  firebaseConfigToEnvFile({
    apiKey: "AIzaSyCnhBituD_cJFL4YUtIVDS0pxWlguZdwnY",
    authDomain: "notification-app-ddeee.firebaseapp.com",
    projectId: "notification-app-ddeee",
    storageBucket: "notification-app-ddeee.appspot.com",
    appId: "1:530227180562:web:784c08097dd93a20a614cb",
    measurementId: "G-92DYB23VN3"
  })
);
