import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

export async function skipTodayLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  return setLocalNotification();
}

function createNotification() {
  return {
    title: 'Time for studying!',
    body: "👋 don't forget to do a quiz or more today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

async function getNotificationPermission() {
  const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (permission.status === 'granted') {
    return true;
  }
  const askedPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return askedPermission.status === 'granted';
}

export async function setLocalNotification() {
  const storedData = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const data = JSON.parse(storedData);
  if (data !== null) {
    return;
  }

  const permitted = await getNotificationPermission();
  if (permitted) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);

    await Notifications.scheduleLocalNotificationAsync(createNotification(), {
      time: tomorrow,
      repeat: 'day',
    });
  }
  await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}
