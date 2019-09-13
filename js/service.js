const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
async function saveSubscription() {}
self.addEventListener('activate', async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array('BFiGfYgaJxomm6ERVisPZSKLatwgHm8o9nED9QfCjn7F6uzpNp04JKWNzmyJvZQDOt0pWJI0ZG3Zb7ZCw5oSfZc')
    const options = {
      applicationServerKey,
      userVisibleOnly: true
    }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(subscription.subscriptionId);
    const response = await fetch('https://api.drch.cf/subscribe', {
      method: 'post',
      body: JSON.stringify(subscription),
    });
    console.log(JSON.stringify(subscription))
  } catch (err) {}
})
self.addEventListener('push', function(event) {
  if (event.data) {
    showLocalNotification('Achtung!', event.data.text(), self.registration)
  }
});
self.onnotificationclick = function(a) {
  a.notification.close();
  self.clients.openWindow('https://drch.cf');
};
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
  }
  swRegistration.showNotification(title, options)
}
