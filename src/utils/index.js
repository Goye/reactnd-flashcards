import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATIONS_KEY = 'flashCards:notifications';
const NOTIFICATION_CONF = {
  title: "Don't give up",
  body: "Don't give up, test yourself!",
  hour: 9,
  minutes: 0,
  repeat: 'day'
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
};
  
export function createNotification() {
  return {
    title: NOTIFICATION_CONF.title,
    body: NOTIFICATION_CONF.body,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}
  
export async function setLocalNotification() {
  const data = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  const dataParsed = JSON.parse(data);
  const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status === 'granted') {
    Notifications.cancelAllScheduledNotificationsAsync();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(NOTIFICATION_CONF.hour);
    tomorrow.setMinutes(NOTIFICATION_CONF.minutes);

    Notifications.scheduleLocalNotificationAsync(
      createNotification(),
      {
        time: tomorrow,
        repeat: NOTIFICATION_CONF.repeat,
      }
    );

    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
  }
}